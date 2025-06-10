import React from 'react';
import { motion } from 'framer-motion';
import { Star, Moon, Heart, Shield, Calendar, TrendingUp, Users, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAstrologyStore } from '../store/astrologyStore';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { analysis, generateAnalysis, isLoading } = useAstrologyStore();

  React.useEffect(() => {
    if (user && !analysis) {
      generateAnalysis({
        date: user.birthDate,
        time: user.birthTime,
        place: user.birthPlace,
      });
    }
  }, [user, analysis, generateAnalysis]);

  const quickStats = [
    { icon: <Star className="h-6 w-6 text-golden-500" />, label: 'Birth Chart', value: 'Generated', status: 'success' },
    { icon: <Moon className="h-6 w-6 text-mystical-500" />, label: 'Sadsati Status', value: analysis?.sadsati.isActive ? 'Active' : 'Inactive', status: analysis?.sadsati.isActive ? 'warning' : 'success' },
    { icon: <Heart className="h-6 w-6 text-red-500" />, label: 'Mangalik', value: analysis?.mangalik.isMangalik ? 'Yes' : 'No', status: analysis?.mangalik.isMangalik ? 'warning' : 'success' },
    { icon: <Shield className="h-6 w-6 text-cosmic-500" />, label: 'Kalsarpa', value: analysis?.kalsarpa.hasKalsarpa ? 'Present' : 'Absent', status: analysis?.kalsarpa.hasKalsarpa ? 'warning' : 'success' },
  ];

  const upcomingEvents = [
    { date: '2024-01-15', event: 'Mercury Retrograde begins', impact: 'Communication challenges' },
    { date: '2024-01-22', event: 'New Moon in Aquarius', impact: 'New beginnings in innovation' },
    { date: '2024-02-05', event: 'Venus enters Pisces', impact: 'Enhanced creativity and love' },
    { date: '2024-02-14', event: 'Saturn sextile Jupiter', impact: 'Opportunities for growth' },
  ];

  if (isLoading && !analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cosmic-500 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-gray-600">Calculating your cosmic blueprint...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-cosmic-gradient rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-200 text-lg">
                  Your cosmic journey continues. Here's what the stars reveal today.
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="text-sm text-gray-300">Birth Details</p>
                <p className="font-semibold">{user?.birthPlace}</p>
                <p className="text-sm">{user?.birthDate} at {user?.birthTime}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  stat.status === 'success' ? 'bg-green-100 text-green-800' :
                  stat.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {stat.status === 'success' ? 'Favorable' : 
                   stat.status === 'warning' ? 'Attention Needed' : 'Critical'}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sadsati Analysis */}
            {analysis?.sadsati && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Moon className="h-6 w-6 text-mystical-500" />
                    <h2 className="text-xl font-bold text-gray-900">Sadsati Analysis</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Current Status:</span>
                      <span className={`font-semibold ${analysis.sadsati.isActive ? 'text-yellow-600' : 'text-green-600'}`}>
                        {analysis.sadsati.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    {analysis.sadsati.isActive && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Phase:</span>
                          <span className="font-semibold text-cosmic-600 capitalize">
                            {analysis.sadsati.phase}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold text-gray-900">
                            {analysis.sadsati.startDate} - {analysis.sadsati.endDate}
                          </span>
                        </div>
                      </>
                    )}
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Key Effects:</h3>
                      <ul className="space-y-1">
                        {analysis.sadsati.effects.map((effect, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-mystical-400 rounded-full mr-2" />
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Recommended Remedies:</h3>
                      <ul className="space-y-1">
                        {analysis.sadsati.remedies.map((remedy, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-golden-400 rounded-full mr-2" />
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Mangalik Analysis */}
            {analysis?.mangalik && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="h-6 w-6 text-red-500" />
                    <h2 className="text-xl font-bold text-gray-900">Mangalik Analysis</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Mangalik Status:</span>
                      <span className={`font-semibold ${analysis.mangalik.isMangalik ? 'text-red-600' : 'text-green-600'}`}>
                        {analysis.mangalik.isMangalik ? 'Yes' : 'No'}
                      </span>
                    </div>
                    
                    {analysis.mangalik.isMangalik && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Severity:</span>
                          <span className={`font-semibold capitalize ${
                            analysis.mangalik.severity === 'high' ? 'text-red-600' :
                            analysis.mangalik.severity === 'medium' ? 'text-yellow-600' :
                            'text-green-600'
                          }`}>
                            {analysis.mangalik.severity}
                          </span>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-gray-900 mb-2">Affected Areas:</h3>
                          <ul className="space-y-1">
                            {analysis.mangalik.affectedAreas.map((area, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                                {area}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-semibold text-gray-900 mb-2">Recommended Remedies:</h3>
                          <ul className="space-y-1">
                            {analysis.mangalik.remedies.map((remedy, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-golden-400 rounded-full mr-2" />
                                {remedy}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="primary" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    View Full Birth Chart
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Get Daily Horoscope
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Compatibility Check
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Career Guidance
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Upcoming Cosmic Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Cosmic Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-2 border-cosmic-300 pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900">{event.event}</h4>
                      <p className="text-xs text-gray-600">{event.impact}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};