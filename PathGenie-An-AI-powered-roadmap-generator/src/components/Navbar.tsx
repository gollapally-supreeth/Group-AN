import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  User,
  LogOut,
  Map,
  CreditCard,
  Crown,
  Menu,
  Users,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/hooks/useSubscription";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  onAuthClick: () => void;
  onScrollToSection: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAuthClick, onScrollToSection }) => {
  const { user, signOut, loading } = useAuth();
  const { isProUser } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const handlePricingClick = () => {
    if (!user && location.pathname === "/") {
      onScrollToSection("pricing");
    } else {
      navigate("/pricing");
    }
  };

  const handleCommunityClick = () => {
    if (isProUser) {
      navigate("/community");
    } else {
      navigate("/pricing");
    }
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((name: string) => name.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || "U";
  };

  const getUserDisplayName = () => {
    return (
      user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and User Status */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center gap-3 p-1 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden">
                  <img
                    src="/favicon.png"
                    alt="PathGenie Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                <span className="text-3xl font-semibold text-white tracking-tight font-sans">
                  PathGenie
                </span>
              </div>
            </Link>

            {/* User tier badge right next to logo */}
            {user && (
              <div className="flex items-center">
                {isProUser ? (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-medium px-2 py-1">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                ) : (
                  <Badge className="bg-purple-600 text-white text-xs font-medium px-2 py-1">
                    Free
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                {/* My Roadmaps Button */}
                <Link to="/roadmaps">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-white/10 font-medium transition-all duration-200 border border-transparent hover:border-white/20 rounded-lg px-4 py-2"
                  >
                    <Map className="w-4 h-4 mr-2" />
                    My Roadmaps
                  </Button>
                </Link>

                {/* Browse Community Button for both free and pro users */}
                <Button
                  onClick={handleCommunityClick}
                  variant="ghost"
                  size="sm"
                  className={`font-medium transition-all duration-200 rounded-lg px-4 py-2 ${
                    isProUser
                      ? "text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 border border-cyan-400/30 hover:border-cyan-400/50"
                      : "text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 border border-purple-400/30 hover:border-purple-400/50"
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Browse Community
                </Button>

                {/* Upgrade to Pro Button for free users only */}
                {!isProUser && (
                  <Button
                    onClick={handlePricingClick}
                    variant="ghost"
                    size="sm"
                    className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 border border-yellow-400/30 hover:border-yellow-400/50 rounded-lg px-4 py-2 font-medium transition-all duration-200"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2 rounded-full hover:bg-white/10"
                    >
                      <Avatar className="h-9 w-9 ring-2 ring-purple-500/30">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 bg-slate-900/95 backdrop-blur-xl border-white/20 shadow-2xl"
                    align="end"
                  >
                    <DropdownMenuLabel className="text-white">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs leading-none text-gray-400">
                          {user.email}
                        </p>
                        {isProUser && (
                          <div className="flex items-center mt-2">
                            <Crown className="w-3 h-3 mr-1 text-yellow-400" />
                            <span className="text-xs text-yellow-400 font-medium">
                              Pro Member
                            </span>
                          </div>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem
                      onClick={() => navigate("/roadmaps")}
                      className="text-gray-300 focus:text-white focus:bg-white/10 cursor-pointer"
                    >
                      <Map className="w-4 h-4 mr-2" />
                      My Roadmaps
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleCommunityClick}
                      className="text-gray-300 focus:text-white focus:bg-white/10 cursor-pointer"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Browse Community
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handlePricingClick}
                      className="text-gray-300 focus:text-white focus:bg-white/10 cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      {isProUser ? "Manage Subscription" : "Upgrade to Pro"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/20" />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-400 focus:text-red-300 focus:bg-red-500/20 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Navigation Links for Non-Authenticated Users */}
                <button
                  onClick={() => onScrollToSection("features")}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Features
                </button>
                <button
                  onClick={() => onScrollToSection("testimonials")}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Testimonials
                </button>
                <button
                  onClick={handlePricingClick}
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Pricing
                </button>

                <div className="flex items-center space-x-3 ml-4">
                  <Button
                    variant="outline"
                    onClick={onAuthClick}
                    className="border-white/30 text-white hover:bg-white/10 hover:text-white font-medium bg-black/20 backdrop-blur-sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={onAuthClick}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Get Started
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-slate-900/95 backdrop-blur-xl border-white/20 w-80">
                <SheetHeader>
                  <SheetTitle className="text-white flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    SkillMap.AI
                  </SheetTitle>
                  <SheetDescription className="text-gray-300">
                    AI-powered learning roadmaps
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-4">
                  {user ? (
                    <>
                      {/* User Info */}
                      <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                        <Avatar className="h-12 w-12 ring-2 ring-purple-500/30">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">
                            {getUserDisplayName()}
                          </p>
                          <p className="text-gray-300 text-sm">{user.email}</p>
                          {isProUser ? (
                            <div className="flex items-center mt-1">
                              <Crown className="w-3 h-3 mr-1 text-yellow-400" />
                              <span className="text-xs text-yellow-400 font-medium">
                                Pro Member
                              </span>
                            </div>
                          ) : (
                            <Badge className="bg-purple-600 text-white text-xs font-medium mt-1">
                              Free
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => navigate("/roadmaps")}
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          <Map className="w-4 h-4 mr-3" />
                          My Roadmaps
                        </Button>
                        <Button
                          onClick={handleCommunityClick}
                          variant="ghost"
                          className={`w-full justify-start ${
                            isProUser
                              ? "text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10"
                              : "text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                          }`}
                        >
                          <Users className="w-4 h-4 mr-3" />
                          Browse Community
                        </Button>
                        {!isProUser && (
                          <Button
                            onClick={handlePricingClick}
                            variant="ghost"
                            className="w-full justify-start text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10"
                          >
                            <CreditCard className="w-4 h-4 mr-3" />
                            Upgrade to Pro
                          </Button>
                        )}
                        <Button
                          onClick={handleSignOut}
                          variant="ghost"
                          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Navigation for non-authenticated users */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => onScrollToSection("features")}
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          Features
                        </Button>
                        <Button
                          onClick={() => onScrollToSection("testimonials")}
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          Testimonials
                        </Button>
                        <Button
                          onClick={handlePricingClick}
                          variant="ghost"
                          className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                        >
                          Pricing
                        </Button>
                      </div>

                      <div className="space-y-3 pt-4">
                        <Button
                          variant="outline"
                          onClick={onAuthClick}
                          className="w-full border-white/30 text-white hover:bg-white/10 hover:text-white font-medium bg-black/20 backdrop-blur-sm"
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={onAuthClick}
                          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Get Started
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
