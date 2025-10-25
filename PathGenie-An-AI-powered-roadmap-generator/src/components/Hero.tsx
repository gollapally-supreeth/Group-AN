import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, TrendingUp, Target, Sparkles, Zap, BookOpen, Clock, Trophy, Rocket, Play } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import AuthModal from './AuthModal';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isTextChanging, setIsTextChanging] = useState(false);
  const { user } = useAuth();

  const skills = [
    { name: "JavaScript", icon: "💻", color: "from-yellow-400 to-orange-500" },
    { name: "Python", icon: "🐍", color: "from-blue-400 to-green-500" },
    { name: "Digital Marketing", icon: "📱", color: "from-pink-400 to-purple-500" },
    { name: "UI/UX Design", icon: "🎨", color: "from-cyan-400 to-blue-500" },
    { name: "Data Science", icon: "📊", color: "from-green-400 to-teal-500" },
    { name: "Photography", icon: "📸", color: "from-purple-400 to-pink-500" },
  ];

  const dynamicTexts = user ? [
    "Ready to Level Up?",
    "Time to Grow Further",
    "Your Next Challenge Awaits"
  ] : [
    "Master Any Skill Fast",
    "Break Tutorial Hell",
    "Transform Your Career"
  ];

  const stats = user ? [
    { icon: Target, value: "3", label: "Active Roadmaps", color: "text-blue-400" },
    { icon: Trophy, value: "87%", label: "Progress", color: "text-green-400" },
    { icon: Clock, value: "2 Weeks", label: "Average Time", color: "text-purple-400" },
    { icon: Sparkles, value: "12", label: "Skills Learned", color: "text-yellow-400" },
  ] : [
    { icon: Users, value: "50K+", label: "Success Stories", color: "text-blue-400" },
    { icon: Target, value: "98%", label: "Completion Rate", color: "text-green-400" },
    { icon: Clock, value: "4 Weeks", label: "To Mastery", color: "text-purple-400" },
    { icon: Trophy, value: "1000+", label: "Skills Available", color: "text-yellow-400" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextChanging(true);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
        setIsTextChanging(false);
      }, 250);
    }, 4000);
    return () => clearInterval(interval);
  }, [dynamicTexts.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGenerator = () => {
    document.getElementById('skill-generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrimaryClick = () => {
    if (user) {
      scrollToGenerator();
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleSecondaryClick = () => {
    if (!user) {
      scrollToSection('testimonials');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div 
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />
      <div 
        className="absolute top-1/2 right-0 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"
        style={{
          transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`,
        }}
      />
      <div 
        className="absolute bottom-0 left-1/3 w-64 h-64 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-2000"
        style={{
          transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`,
        }}
      />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse delay-1000"></div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(user ? 20 : 40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            <div className={`w-2 h-2 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full ${!user ? 'animate-pulse' : ''}`} />
          </div>
        ))}
      </div>

      {!user && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="absolute text-4xl opacity-20 animate-float hover:opacity-40 transition-opacity"
              style={{
                left: `${15 + (index * 15)}%`,
                top: `${20 + (index * 10)}%`,
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${6 + Math.random() * 2}s`,
              }}
            >
              {skill.icon}
            </div>
          ))}
        </div>
      )}

      <Navbar onAuthClick={() => setIsAuthModalOpen(true)} onScrollToSection={scrollToSection} />

      
      <div className="relative z-10 container mx-auto px-6 pt-44 pb-28">
        <div className="text-center max-w-6xl mx-auto space-y-10">
          
          {!user && (
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20 mb-6 hover:bg-white/15 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-medium text-gray-200">
                  🔥 Trending Now: 
                  <span className={`ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r ${skills[currentSkill].color} transition-all duration-500`}>
                    {skills[currentSkill].name} {skills[currentSkill].icon}
                  </span>
                </span>
              </div>
            </div>
          )}

          
          <div className="relative mb-10">
            <h1 
              className="text-5xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-8 leading-tight animate-fade-in"
              style={{
                transform: `translateY(${scrollY * -0.05}px)`,
                textShadow: '0 0 40px rgba(168, 85, 247, 0.4)',
              }}            >
              {user ? (
                <>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl mb-2 sm:mb-4 text-white/80">
                    Welcome back,
                  </span>
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-glow">
                    {user.user_metadata?.full_name?.split(' ')[0] || 'Champion'}! 🚀
                  </span>
                  <span className="block text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl mt-3 sm:mt-6 text-gradient">
                    <span className={`transition-all duration-500 ${isTextChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                      {dynamicTexts[textIndex]}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span className="block animate-glow">
                    <span className={`transition-all duration-500 ${isTextChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                      {dynamicTexts[textIndex]}
                    </span>
                  </span>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl mt-2 sm:mt-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    With AI-Powered Roadmaps ⚡
                  </span>
                </>
              )}
            </h1>
            
            <div 
              className="absolute inset-0 text-5xl lg:text-7xl xl:text-8xl font-black text-purple-500/5 -z-10 blur-sm"
              style={{
                transform: `translateY(${scrollY * -0.05 + 4}px) translateX(4px)`,
              }}
            >
              {user ? (
                <>
                  <span className="block text-4xl lg:text-6xl xl:text-7xl mb-4">Welcome back,</span>
                  <span className="block">{user.user_metadata?.full_name?.split(' ')[0] || 'Champion'}! 🚀</span>
                  <span className="block text-3xl lg:text-5xl xl:text-6xl mt-6">{dynamicTexts[textIndex]}</span>
                </>
              ) : (
                <>
                  <span className="block">{dynamicTexts[textIndex]}</span>
                  <span className="block text-4xl lg:text-6xl xl:text-7xl mt-4">With AI-Powered Roadmaps ⚡</span>
                </>
              )}
            </div>
          </div>

            <p 
            className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-8 sm:mb-12 lg:mb-14 leading-relaxed max-w-4xl mx-auto animate-fade-in px-4 sm:px-6"
            style={{
              transform: `translateY(${scrollY * -0.02}px)`,
              animationDelay: '0.2s',
            }}
          >
            {user ? (
              <>
                Your personalized learning journey continues here. Generate a new roadmap,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-semibold"> track your progress</span>, 
                and unlock your full potential.
              </>
            ) : (
              <>
                Skip the overwhelm of scattered tutorials and random YouTube videos. Get a 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold"> clear, step-by-step path </span>
                from beginner to job-ready professional in just 4 weeks.
              </>
            )}
          </p>

          
          <div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in px-4 sm:px-6"
            style={{
              transform: `translateY(${scrollY * -0.01}px)`,
              animationDelay: '0.4s',
            }}
          >
            <Button 
              onClick={handlePrimaryClick}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              size="lg" 
              className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-base sm:text-lg px-6 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 transform-gpu border-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Rocket className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              {user ? "Create New Roadmap" : "Start Learning Now"}
              <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              {isHovering && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-pink-400/30 animate-pulse" />
              )}
            </Button>
            
            {!user && (
              <Button 
                onClick={handleSecondaryClick}
                variant="outline" 
                size="lg"
                className="group border-2 border-white/40 text-white font-semibold hover:bg-white/20 hover:text-white backdrop-blur-sm text-lg px-12 py-8 rounded-2xl hover:scale-105 transition-all duration-300 bg-white/5 hover:border-white/60"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                View Success Stories
              </Button>
            )}
          </div>          {!user && (
            <div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 animate-fade-in px-4 sm:px-6"
              style={{
                transform: `translateY(${scrollY * 0.01}px)`,
                animationDelay: '0.6s',
              }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="flex flex-col items-center">
                      <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${stat.color} mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`} />
                      <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300 font-medium text-center">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          
          {!user && (
            <div className="mt-28 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-lg rounded-3xl p-10 border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden">
                
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 animate-pulse"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white">Your Journey Starts Here</h3>
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    Join thousands who've transformed their careers with our proven 4-week method
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4 group-hover:animate-bounce">🎯</div>
                        <div className="text-white font-bold text-xl mb-2">Week 1</div>
                        <div className="text-gray-400 text-lg">Foundation & Setup</div>
                        <div className="text-sm text-gray-500 mt-2">Build your learning foundation</div>
                      </div>
                    </div>
                    
                    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4 group-hover:animate-bounce">⚡</div>
                        <div className="text-white font-bold text-xl mb-2">Week 2-3</div>
                        <div className="text-gray-400 text-lg">Rapid Skill Building</div>
                        <div className="text-sm text-gray-500 mt-2">Intensive practice & projects</div>
                      </div>
                    </div>
                    
                    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-400/30 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-6xl mb-4 group-hover:animate-bounce">🏆</div>
                        <div className="text-white font-bold text-xl mb-2">Week 4</div>
                        <div className="text-gray-400 text-lg">Job-Ready Mastery</div>
                        <div className="text-sm text-gray-500 mt-2">Portfolio & career preparation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Hero;
