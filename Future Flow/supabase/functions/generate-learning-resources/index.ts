
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY')
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')

interface ResourceSearchResult {
  title: string;
  url: string;
  description: string;
  resourceType: 'reading' | 'video' | 'interactive' | 'audio' | 'visual';
  source: string;
  estimatedTime: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  qualityScore: number;
  isOfficial: boolean;
}

async function searchYouTubeResources(query: string): Promise<ResourceSearchResult[]> {
  if (!YOUTUBE_API_KEY) return [];

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=relevance&maxResults=2&key=${YOUTUBE_API_KEY}`
    );
    
    const data = await response.json();
    
    return data.items?.map((item: any) => ({
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      description: item.snippet.description,
      resourceType: 'video' as const,
      source: `YouTube - ${item.snippet.channelTitle}`,
      estimatedTime: 30,
      difficultyLevel: 'beginner' as const,
      tags: [query.toLowerCase().replace(/\s+/g, '-'), 'video', 'tutorial'],
      qualityScore: 4,
      isOfficial: item.snippet.channelTitle.toLowerCase().includes('official')
    })) || [];
  } catch (error) {
    console.error('YouTube API error:', error);
    return [];
  }
}

async function generateResourcesWithGemini(taskTitle: string, skillName: string, taskType: string): Promise<ResourceSearchResult[]> {
  if (!GEMINI_API_KEY) {
    console.log('❌ Gemini API key not found, skipping comprehensive resource generation');
    return [];
  }

  try {
    console.log('🤖 Calling Gemini API for focused resource generation...');
    
    const prompt = `Generate exactly 3-4 high-quality, diverse learning resources for: "${taskTitle}" in the context of ${skillName}.

CRITICAL: Provide ONLY real, working URLs. Focus on quality over quantity.

Resource types needed:
1. 1 PDF tutorial/guide (official docs, O'Reilly, Manning, university materials)
2. 1 GitHub repository with examples/awesome list
3. 1-2 high-quality articles/documentation

For each resource, provide:
- title: Clear, descriptive title
- url: REAL, working URL (verify these exist)
- description: 50-80 words explaining the resource
- resourceType: one of [reading, interactive]
- source: The platform/organization name
- estimatedTime: time in minutes (15-60)
- difficultyLevel: beginner, intermediate, or advanced
- tags: 3-4 relevant tags
- qualityScore: 4-5 (only high quality)
- isOfficial: true if from official docs/organization

Focus on these specific sources:
- Official documentation (React.dev, MDN, Python.org)
- PDF guides from reputable sources
- GitHub repositories with examples
- High-quality tech blogs and articles

Return ONLY valid JSON array with 3-4 resources:
[
  {
    "title": "Official React Documentation",
    "url": "https://react.dev/learn",
    "description": "Official React documentation covering components, hooks, and best practices with interactive examples.",
    "resourceType": "reading",
    "source": "React.dev",
    "estimatedTime": 45,
    "difficultyLevel": "beginner",
    "tags": ["react", "official", "documentation", "components"],
    "qualityScore": 5,
    "isOfficial": true
  }
]`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 2000,
        }
      })
    });

    if (!response.ok) {
      console.error('❌ Gemini API error:', response.status, await response.text());
      return [];
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      console.log('❌ No text response from Gemini');
      return [];
    }

    console.log('📝 Gemini raw response:', text.substring(0, 500) + '...');

    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.log('❌ No JSON found in Gemini response');
      return [];
    }

    try {
      const resources = JSON.parse(jsonMatch[0]);
      console.log(`✅ Gemini generated ${resources.length} resources`);
      
      return resources.map((resource: any) => ({
        title: resource.title || 'Untitled Resource',
        url: resource.url || '#',
        description: resource.description || 'No description available',
        resourceType: resource.resourceType || 'reading',
        source: resource.source || 'Unknown',
        estimatedTime: resource.estimatedTime || 30,
        difficultyLevel: resource.difficultyLevel || 'beginner',
        tags: resource.tags || [],
        qualityScore: resource.qualityScore || 4,
        isOfficial: resource.isOfficial || false
      }));
    } catch (parseError) {
      console.error('❌ Failed to parse Gemini JSON:', parseError);
      return [];
    }
  } catch (error) {
    console.error('❌ Gemini API error:', error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Use service role for database operations to bypass RLS
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { taskId, skillName, taskTitle, taskType, roadmapId } = await req.json()

    console.log('🎯 Generating focused resources for task:', taskId, 'skill:', skillName, 'roadmap:', roadmapId)
    console.log('📋 Task details:', { taskTitle, taskType })

    // Check if resources already exist for this task AND roadmap
    const { data: existingResources } = await supabaseClient
      .from('learning_resources')
      .select('id')
      .eq('task_id', taskId)
      .eq('roadmap_id', roadmapId)

    if (existingResources && existingResources.length > 0) {
      console.log('📚 Resources already exist for task:', taskId, 'in roadmap:', roadmapId)
      return new Response(
        JSON.stringify({ message: 'Resources already exist for this task', count: existingResources.length }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('🔍 Searching for focused, high-quality resources...')

    // Generate resources using both APIs
    const [youtubeResources, geminiResources] = await Promise.all([
      searchYouTubeResources(`${skillName} ${taskTitle} tutorial`),
      generateResourcesWithGemini(taskTitle, skillName, taskType)
    ]);

    const allResources = [...youtubeResources, ...geminiResources];
    console.log(`🎉 Found ${allResources.length} total resources (YouTube: ${youtubeResources.length}, Gemini: ${geminiResources.length})`)

    if (allResources.length === 0) {
      console.log('⚠️ No resources found from any source');
      return new Response(
        JSON.stringify({ message: 'No resources found', resources: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert resources into database with roadmap_id
    const resourcesData = allResources.map(resource => ({
      task_id: taskId,
      roadmap_id: roadmapId,
      skill_name: skillName,
      title: resource.title,
      url: resource.url,
      resource_type: resource.resourceType,
      source: resource.source,
      description: resource.description,
      quality_score: resource.qualityScore,
      difficulty_level: resource.difficultyLevel,
      estimated_time_minutes: resource.estimatedTime,
      tags: resource.tags,
      is_official: resource.isOfficial
    }));

    console.log('💾 Inserting resources into database...')
    console.log('📊 Resource breakdown by type:', resourcesData.reduce((acc: any, r) => {
      acc[r.resource_type] = (acc[r.resource_type] || 0) + 1;
      return acc;
    }, {}));

    const { data, error } = await supabaseClient
      .from('learning_resources')
      .insert(resourcesData)
      .select()

    if (error) {
      console.error('❌ Database insert error:', error)
      throw error
    }

    console.log(`✅ Successfully inserted ${data?.length || 0} focused resources for roadmap ${roadmapId}`)

    return new Response(
      JSON.stringify({ 
        message: `Generated ${allResources.length} focused resources`,
        resources: data 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('💥 Edge function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
