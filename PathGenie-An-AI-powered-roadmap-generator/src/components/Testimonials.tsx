
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "SkillMap.AI helped me transition from marketing to React development in just 4 weeks. The personalized approach made all the difference!",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Johnson",
      role: "Freelance Designer",
      content: "I've tried countless tutorials before, but this AI-generated roadmap was perfectly tailored to my schedule and learning style. Finally completed a full course!",
      rating: 5,
      avatar: "MJ"
    },
    {
      name: "Priya Patel",
      role: "Computer Science Student",
      content: "The weekly checkpoints and progress tracking kept me accountable. I went from zero Python knowledge to building my first web scraper!",
      rating: 5,
      avatar: "PP"
    },
    {
      name: "Alex Rodriguez",
      role: "Product Manager",
      content: "As someone with limited time, the flexible hour options were perfect. The AI understood exactly what I needed to learn UX design fundamentals.",
      rating: 5,
      avatar: "AR"
    },
    {
      name: "Emily Wang",
      role: "Data Analyst",
      content: "The curated resources saved me hours of searching. Every link was relevant and high-quality. My machine learning skills improved dramatically!",
      rating: 5,
      avatar: "EW"
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      content: "SkillMap.AI's structured approach helped me finally learn Node.js properly. The project-based learning style was exactly what I needed.",
      rating: 5,
      avatar: "DK"
    }
  ];

  return (
    <div id="testimonials" className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Success Stories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of learners who have transformed their careers with personalized AI-powered roadmaps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
