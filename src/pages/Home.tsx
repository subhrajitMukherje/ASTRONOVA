import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, Moon, Sun, Zap, Eye, Heart, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Home: React.FC = () => {
  const features = [
    {
      icon: <Star className="h-8 w-8 text-golden-500" />,
      title: 'Birth Chart Analysis',
      description: 'Comprehensive Lagna and Navamsa chart readings with detailed planetary positions and influences.',
    },
    {
      icon: <Moon className="h-8 w-8 text-mystical-500" />,
      title: 'Sadsati Prediction',
      description: 'Accurate Saturn transit analysis with timing predictions and effective remedial measures.',
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Mangalik Analysis',
      description: 'Complete Mars dosha evaluation with compatibility insights and marriage guidance.',
    },
    {
      icon: <Shield className="h-8 w-8 text-cosmic-500" />,
      title: 'Kalsarpa Yoga',
      description: 'Detailed serpent yoga analysis with life impact assessment and spiritual remedies.',
    },
    {
      icon: <Eye className="h-8 w-8 text-golden-500" />,
      title: 'Personalized Insights',
      description: 'AI-powered readings tailored to your unique cosmic blueprint and life journey.',
    },
    {
      icon: <Zap className="h-8 w-8 text-mystical-500" />,
      title: 'Real-time Updates',
      description: 'Live planetary transit alerts and daily cosmic energy forecasts.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cosmic-gradient min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-4 h-4 bg-golden-400 rounded-full opacity-60"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-40 right-32 w-6 h-6 bg-mystical-400 rounded-full opacity-40"
          />
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-40 w-8 h-8 bg-cosmic-400 rounded-full opacity-30"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="h-16 w-16 text-golden-400 animate-pulse-slow" />
            </motion.div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                Welcome to
                <span className="block bg-golden-gradient bg-clip-text text-transparent">
                  AstroNova
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Discover your cosmic destiny with advanced astrology readings, 
                personalized birth charts, and AI-powered insights into your spiritual journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button size="lg" className="bg-golden-500 hover:bg-golden-600 text-white px-8 py-4 text-lg font-semibold">
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-cosmic-900 px-8 py-4 text-lg">
                  <Eye className="h-5 w-5 mr-2" />
                  View Live Demo
                </Button>
              </Link>
            </div>

            {/* API Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 mt-8"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Free Astrology API</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">Real-time Calculations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm">AI-Powered Insights</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center space-y-16"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Unlock Your Cosmic Potential
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the power of ancient wisdom combined with modern technology. 
                Our comprehensive astrology platform provides insights that guide your life's journey.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card hover className="p-8 h-full text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-gray-100 rounded-full">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                See AstroNova in Action
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience our live demo with real API integrations, interactive charts, 
                and AI-powered astrology insights.
              </p>
            </div>
            
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-cosmic-50 to-mystical-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-cosmic-gradient rounded-full flex items-center justify-center mx-auto">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Live Birth Charts</h3>
                  <p className="text-sm text-gray-600">Real-time chart generation with Free Astrology API</p>
                </div>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-golden-gradient rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Smart Location</h3>
                  <p className="text-sm text-gray-600">Auto-detect location with precise coordinates</p>
                </div>
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-mystical-gradient rounded-full flex items-center justify-center mx-auto">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">AI Astrologer</h3>
                  <p className="text-sm text-gray-600">Chat with Sage Cosmos for personalized guidance</p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/demo">
                  <Button size="lg" className="bg-cosmic-600 hover:bg-cosmic-700 text-white px-8 py-4">
                    <Eye className="h-5 w-5 mr-2" />
                    Explore Live Demo
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-cosmic-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Explore Your Destiny?
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Join thousands of users who have discovered their cosmic path through AstroNova's 
                advanced astrology platform.
              </p>
            </div>
            
            <Link to="/signup">
              <Button size="lg" className="bg-golden-500 hover:bg-golden-600 text-white px-12 py-4 text-lg font-semibold">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};