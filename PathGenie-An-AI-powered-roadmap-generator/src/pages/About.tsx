import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Target, Lightbulb, Award, Heart, Rocket } from 'lucide-react';
import SEO from '@/components/SEO';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  const navigate = useNavigate();

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleScrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`);
  };

  const teamMembers = [
    {
      name: "Pardhu",
      role: "Founder & CEO",
      image: "/team/pardhu.jpg",
      description: "Passionate about democratizing education through AI"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Purpose-Driven Learning",
      description: "Every roadmap is designed with clear, achievable goals that matter to your career."
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Innovation",
      description: "We leverage cutting-edge AI to create personalized learning experiences."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Learning is better together. We build tools that connect learners worldwide."
    },
    {
      icon: Heart,
      title: "Accessible Education",
      description: "Quality education should be available to everyone, regardless of background."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEO 
        title="About Us - PathGenie"
        description="Learn about PathGenie's mission to democratize education through AI-powered personalized learning roadmaps. Meet our team and discover our story."
        keywords="about us, company story, team, mission, vision, AI education, learning platform"
        url="/about"
      />
      <Navbar onAuthClick={handleAuthClick} onScrollToSection={handleScrollToSection} />
      
      <div className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-cyan-500/20 rounded-xl border border-cyan-400/30">
                <Users className="w-8 h-8 text-cyan-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">About PathGenie</h1>
            </div>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to transform how people learn by making personalized, 
              AI-powered education accessible to everyone, everywhere.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <Rocket className="w-8 h-8 text-purple-400" />
                    Our Mission
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    Traditional learning is broken. Scattered tutorials, overwhelming courses, 
                    and one-size-fits-all approaches leave learners frustrated and goals unmet.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg mb-6">
                    PathGenie changes that. We use AI to create personalized learning roadmaps 
                    that adapt to your goals, schedule, and learning style, turning months of 
                    confusion into 4 weeks of focused progress.
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    We believe everyone deserves a clear path to mastery, and we're building 
                    the future where learning is personal, efficient, and successful.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-300 mb-3">50,000+</h3>
                    <p className="text-gray-300">Learners using PathGenie</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-cyan-300 mb-3">100+</h3>
                    <p className="text-gray-300">Skills and domains covered</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-green-300 mb-3">98%</h3>
                    <p className="text-gray-300">Success rate in goal achievement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30 flex-shrink-0">
                      <value.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="flex justify-center">
              <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl max-w-md">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">P</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Pardhu</h3>
                  <p className="text-purple-400 font-medium mb-4">Founder & CEO</p>
                  <p className="text-gray-300 leading-relaxed">
                    Passionate about democratizing education through AI. Building PathGenie 
                    to make personalized learning accessible to everyone worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 sm:p-12 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Story</h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-6">
                  <p className="text-lg">
                    PathGenie was born from a simple frustration: learning new skills online 
                    was chaotic and overwhelming. Scattered YouTube tutorials, expensive courses 
                    that went nowhere, and no clear path to actual competency.
                  </p>
                  <p className="text-lg">
                    Our founder Pardhu experienced this firsthand while trying to master various 
                    technical skills. Despite having access to thousands of resources, the lack 
                    of structure and personalization made progress slow and frustrating.
                  </p>
                  <p className="text-lg">
                    That's when the idea struck: What if AI could create personalized learning 
                    roadmaps that adapt to each person's goals, experience level, and learning 
                    preferences? What if we could turn months of confusion into weeks of focused progress?
                  </p>
                  <p className="text-lg">
                    Today, PathGenie serves thousands of learners worldwide, helping them achieve 
                    their learning goals faster and more efficiently than ever before. We're just 
                    getting started on our mission to democratize personalized education.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Be part of the learning revolution. Start your personalized learning journey today.
              </p>
              <Button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Learning Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
