import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Clock, TrendingUp, Users, CheckCircle, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "AI-Powered Personalization",
      description: "Every roadmap is tailored to your skill level, time availability, and learning goals using advanced AI algorithms.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Flexible Time Management",
      description: "Whether you have 3 hours or 15+ hours per week, get a roadmap that fits your schedule perfectly.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Progressive Learning Path",
      description: "Structured 4-week journey with increasing difficulty and complexity to ensure optimal skill development.",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Users,
      title: "Curated Resources",
      description: "Access handpicked YouTube tutorials, courses, articles, and GitHub repositories from industry experts.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Visual progress indicators, completion checkboxes, and milestone celebrations to keep you motivated.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Star,
      title: "Weekly Checkpoints",
      description: "Built-in assessments and project milestones to validate your learning and reinforce key concepts.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div id="features" className="py-20 px-6 bg-gradient-to-br from-slate-800 via-purple-800 to-slate-800">
      <div className="container mx-auto max-w-6xl">        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Why Choose SkillMap.AI?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Unlike generic tutorials and overwhelming courses, we provide intelligent, 
            adaptive learning paths that evolve with your progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-purple-500/30">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 backdrop-blur-xl rounded-3xl p-12 text-white border border-white/10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">50K+</div>
              <div className="text-indigo-200">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">100+</div>
              <div className="text-indigo-200">Skills Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">98%</div>
              <div className="text-indigo-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">4.9★</div>
              <div className="text-indigo-200">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
