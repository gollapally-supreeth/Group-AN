import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const SUPABASE_URL = 'https://phfofzvcnhnwucxyjyts.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// Rate limits for free users (monthly)
const FREE_TIER_LIMITS = {
  gemini: 1,      // 1 roadmap generation per month
  youtube: 20     // 20 YouTube searches per month
};

async function checkUserSubscription(supabase: any, userId: string) {
  const { data: subscriber } = await supabase
    .from('subscribers')
    .select('subscribed, subscription_tier, subscription_end')
    .eq('user_id', userId)
    .single();

  if (!subscriber) {
    // Create free tier entry for new user
    await supabase
      .from('subscribers')
      .insert({
        user_id: userId,
        email: '',
        subscribed: false,
        subscription_tier: 'free'
      });
    return { tier: 'free', subscribed: false };
  }

  const isActive = subscriber.subscribed && 
    (!subscriber.subscription_end || new Date(subscriber.subscription_end) > new Date());

  return {
    tier: isActive ? subscriber.subscription_tier : 'free',
    subscribed: isActive
  };
}

async function checkRateLimit(supabase: any, userId: string, apiType: string, userTier: string) {
  if (userTier === 'pro') return true; // No limits for pro users

  // Get current month's first day
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthStart = firstDayOfMonth.toISOString().split('T')[0];
  
  const { data: usageData } = await supabase
    .from('api_usage_tracking')
    .select('request_count')
    .eq('user_id', userId)
    .eq('api_type', apiType)
    .gte('date', monthStart);

  const currentCount = usageData?.reduce((sum: number, item: any) => sum + item.request_count, 0) || 0;
  const limit = FREE_TIER_LIMITS[apiType as keyof typeof FREE_TIER_LIMITS] || 0;

  return currentCount < limit;
}

async function incrementUsage(supabase: any, userId: string, apiType: string, endpoint: string) {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: existing } = await supabase
    .from('api_usage_tracking')
    .select('id, request_count')
    .eq('user_id', userId)
    .eq('api_type', apiType)
    .eq('date', today)
    .single();

  if (existing) {
    await supabase
      .from('api_usage_tracking')
      .update({ 
        request_count: existing.request_count + 1,
        endpoint 
      })
      .eq('id', existing.id);
  } else {
    await supabase
      .from('api_usage_tracking')
      .insert({
        user_id: userId,
        api_type: apiType,
        endpoint,
        request_count: 1,
        date: today
      });
  }
}

async function getCachedRoadmap(supabase: any, skill: string, level: string, timeCommitment: string) {
  const cacheKey = `${skill.toLowerCase()}-${level}-${timeCommitment}`;
  
  const { data: cached } = await supabase
    .from('roadmap_cache')
    .select('cached_data, access_count')
    .eq('cache_key', cacheKey)
    .single();

  if (cached) {
    // Increment access count
    await supabase
      .from('roadmap_cache')
      .update({ access_count: cached.access_count + 1 })
      .eq('cache_key', cacheKey);
    
    console.log('✅ Returning cached roadmap for:', cacheKey);
    return cached.cached_data;
  }

  return null;
}

async function cacheRoadmap(supabase: any, skill: string, level: string, timeCommitment: string, data: any) {
  const cacheKey = `${skill.toLowerCase()}-${level}-${timeCommitment}`;
  
  try {
    await supabase
      .from('roadmap_cache')
      .insert({
        skill_name: skill,
        level,
        time_commitment: timeCommitment,
        cache_key: cacheKey,
        cached_data: data
      });
    console.log('✅ Cached roadmap for:', cacheKey);
  } catch (e) {
    console.log('Cache insert failed (might already exist):', e.message);
  }
}

async function getCachedYouTubeVideo(supabase: any, searchQuery: string, skill: string) {
  const { data: cached } = await supabase
    .from('youtube_cache')
    .select('video_data, access_count')
    .eq('search_query', searchQuery.toLowerCase())
    .eq('skill_name', skill.toLowerCase())
    .single();

  if (cached) {
    await supabase
      .from('youtube_cache')
      .update({ access_count: cached.access_count + 1 })
      .eq('search_query', searchQuery.toLowerCase())
      .eq('skill_name', skill.toLowerCase());
    
    console.log('✅ Returning cached YouTube video for:', searchQuery);
    return cached.video_data;
  }

  return null;
}

async function cacheYouTubeVideo(supabase: any, searchQuery: string, skill: string, videoData: any) {
  try {
    await supabase
      .from('youtube_cache')
      .insert({
        search_query: searchQuery.toLowerCase(),
        skill_name: skill.toLowerCase(),
        video_data: videoData
      });
    console.log('✅ Cached YouTube video for:', searchQuery);
  } catch (e) {
    console.log('YouTube cache insert failed:', e.message);
  }
}

async function getYouTubeData(supabase: any, searchQuery: string, skill: string, userId: string, userTier: string) {
  // First check cache
  const cached = await getCachedYouTubeVideo(supabase, searchQuery, skill);
  if (cached) return cached;

  // Check rate limit for API call
  if (!await checkRateLimit(supabase, userId, 'youtube', userTier)) {
    console.log('❌ YouTube API rate limit exceeded for user');
    return null;
  }

  if (!YOUTUBE_API_KEY) {
    console.log('❌ YouTube API key not found');
    return null;
  }

  // Increment usage before making API call
  await incrementUsage(supabase, userId, 'youtube', 'search');

  const queries = [
    `${skill} ${searchQuery} tutorial beginner`,
    `${skill} ${searchQuery} programming course`,
    `learn ${skill} ${searchQuery} step by step`
  ];
  
  for (const query of queries) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=3&safeSearch=strict&relevanceLanguage=en&order=relevance&videoDuration=medium&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;
      
      const res = await fetch(url);
      if (!res.ok) continue;
      
      const json = await res.json();
      if (json.items && json.items.length > 0) {
        const video = json.items[0];
        const result = {
          youtubeLink: `https://www.youtube.com/watch?v=${video.id.videoId}`,
          youtubeThumbnail: video.snippet.thumbnails?.medium?.url,
          youtubeTitle: video.snippet.title
        };
        
        // Cache the result
        await cacheYouTubeVideo(supabase, searchQuery, skill, result);
        return result;
      }
    } catch (e) {
      console.error('YouTube API error:', e);
      continue;
    }
  }
  
  return null;
}

async function generateGeminiRoadmap(supabase: any, prompt: string, userId: string, userTier: string) {
  // Check rate limit
  if (!await checkRateLimit(supabase, userId, 'gemini', userTier)) {
    throw new Error('Monthly roadmap generation limit reached. Upgrade to Pro for unlimited roadmaps!');
  }

  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  // Increment usage before API call
  await incrementUsage(supabase, userId, 'gemini', 'generateContent');

  console.log('🤖 Calling Gemini API...');
  const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 4000 }
    }),
  });

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text();
    throw new Error(`AI service error: ${geminiResponse.status}: ${errorText}`);
  }

  const geminiData = await geminiResponse.json();
  let generatedContent = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';
  generatedContent = generatedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  try {
    return JSON.parse(generatedContent);
  } catch (e) {
    throw new Error('Failed to parse AI response from Gemini');
  }
}

async function saveRoadmapToDB(supabase: any, userId: string, data: Record<string, any>) {
  const { skill, level, timeCommitment, learningStyle, goal, timeline, generated_data } = data;
  
  const { data: roadmap, error: insertError } = await supabase
    .from('roadmaps')
    .insert({
      user_id: userId,
      skill_name: skill,
      current_level: level,
      time_commitment: timeCommitment,
      learning_style: learningStyle,
      end_goal: goal,
      timeline: timeline?.toString() || '4',
      generated_data
    })
    .select()
    .single();

  if (insertError) {
    throw new Error(`Failed to save roadmap: ${insertError.message}`);
  }

  return roadmap;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!GEMINI_API_KEY || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing necessary secrets');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('No authorization header');
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error('Unauthorized');

    const requestBody = await req.json();
    const { skill, level, timeCommitment, learningStyle, goal, timeline } = requestBody;

    if (!skill || !level || !timeCommitment) {
      throw new Error('Missing required fields: skill, level, or timeCommitment');
    }

    // Check user subscription
    const subscription = await checkUserSubscription(supabase, user.id);
    console.log('User subscription:', subscription);

    const timelineWeeks = timeline ? parseInt(timeline.toString()) : 4;

    // Check cache first
    const cachedRoadmap = await getCachedRoadmap(supabase, skill, level, timeCommitment);
    if (cachedRoadmap) {
      console.log('✅ Using cached roadmap');
      
      // Still save user's roadmap with cached data
      const roadmap = await saveRoadmapToDB(supabase, user.id, {
        skill, level, timeCommitment, learningStyle, goal, timeline: timelineWeeks,
        generated_data: cachedRoadmap
      });

      return new Response(JSON.stringify({
        success: true,
        roadmapId: roadmap.id,
        roadmapData: cachedRoadmap,
        fromCache: true
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Create a detailed ${timelineWeeks}-week learning roadmap for "${skill}".\n\nRequirements:\n- Current Level: ${level}\n- Weekly Time Commitment: ${timeCommitment} hours\n- Learning Style: ${learningStyle || 'Mixed'}\n- End Goal: ${goal || 'General mastery'}\n- Timeline: ${timelineWeeks} weeks\n\nReturn ONLY a valid JSON object with this exact structure:\n{\n  "title": "${skill} Mastery Roadmap",\n  "duration": "${timelineWeeks} Weeks",\n  "totalHours": "${timeCommitment}",\n  "motivationalTip": "Stay consistent and practice daily!",\n  "summary": "This roadmap will guide you to master ${skill}",\n  "weeks": [\n    {\n      "week": 1,\n      "title": "Foundation & Setup",\n      "description": "Build fundamentals and setup",\n      "difficulty": "Beginner",\n      "estimatedHours": "${timeCommitment} hours",\n      "goals": ["Learn basics", "Setup environment", "First practice"],\n      "tasks": [\n        {\n          "id": "w1-t1",\n          "title": "Learn ${skill} fundamentals and core concepts",\n          "type": "video",\n          "duration": "2 hours",\n          "resource": "Official documentation"\n        },\n        {\n          "id": "w1-t2", \n          "title": "Setup ${skill} development environment and tools",\n          "type": "practice",\n          "duration": "1 hour",\n          "resource": "Setup guide"\n        }\n      ],\n      "checkpoint": "Complete basic setup and understand core concepts"\n    }\n  ]\n}\n\nFor every task, make the title very specific and searchable for YouTube tutorials. Make titles descriptive and suitable for YouTube search.\n\nMake the roadmap progressive, practical, and tailored to ${level} level. Include ${timelineWeeks} weeks total.`;

    console.log('🚀 Generating roadmap with Gemini...');
    const roadmapData = await generateGeminiRoadmap(supabase, prompt, user.id, subscription.tier);
    
    // Cache the generated roadmap
    await cacheRoadmap(supabase, skill, level, timeCommitment, roadmapData);

    // Enhanced YouTube integration with caching
    console.log('🎥 Starting YouTube video search with caching...');
    let videoCount = 0;
    
    if (YOUTUBE_API_KEY) {
      for (const week of roadmapData.weeks) {
        if (week.tasks && Array.isArray(week.tasks)) {
          for (const task of week.tasks) {
            if (task.title) {
              const ytResult = await getYouTubeData(supabase, task.title, skill, user.id, subscription.tier);
              if (ytResult) {
                task.youtubeLink = ytResult.youtubeLink;
                task.youtubeThumbnail = ytResult.youtubeThumbnail;
                task.youtubeTitle = ytResult.youtubeTitle;
                videoCount++;
              }
            }
          }
        }
      }
      console.log(`🎯 YouTube search completed. Found ${videoCount} videos with caching.`);
    }

    const roadmap = await saveRoadmapToDB(supabase, user.id, {
      skill, level, timeCommitment, learningStyle, goal, timeline: timelineWeeks,
      generated_data: roadmapData
    });

    return new Response(JSON.stringify({
      success: true,
      roadmapId: roadmap.id,
      roadmapData: roadmapData,
      subscription: subscription
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('💥 Error in generate-roadmap function:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Failed to generate roadmap',
      details: error.stack
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
