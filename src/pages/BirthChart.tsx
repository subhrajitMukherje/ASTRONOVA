import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, RefreshCw, Info, Eye, MapPin } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useAstrologyStore } from '../store/astrologyStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BirthChart as BirthChartType } from '../types';

export const BirthChart: React.FC = () => {
  const { user } = useAuthStore();
  const { birthChart, generateBirthChart, isLoading } = useAstrologyStore();
  const [activeChart, setActiveChart] = useState<'lagna' | 'navamsa'>('lagna');

  useEffect(() => {
    if (user && !birthChart) {
      generateChart();
    }
  }, [user, birthChart]);

  const generateChart = async () => {
    if (!user) return;
    
    try {
      await generateBirthChart({
        date: user.birthDate,
        time: user.birthTime,
        place: user.birthPlace,
        coordinates: user.coordinates,
      });
    } catch (error) {
      console.error('Error generating chart:', error);
    }
  };

  const currentChart = birthChart;
  const chartData = activeChart === 'lagna' ? currentChart?.lagnaChart : currentChart?.navamsaChart;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cosmic-500 border-t-transparent rounded-full mx-auto"
          />
          <p className="text-gray-600">Calculating your cosmic blueprint...</p>
          <p className="text-sm text-gray-500">Using Free Astrology API</p>
        </div>
      </div>
    );
  }

  const renderChartGrid = () => {
    if (!chartData) return null;

    return (
      <div className="grid grid-cols-4 gap-1 aspect-square max-w-md mx-auto">
        {Array.from({ length: 12 }, (_, index) => {
          const houseNumber = index + 1;
          const house = chartData.houses.find(h => h.number === houseNumber);
          const planetsInHouse = chartData.planets.filter(p => p.house === houseNumber);
          
          return (
            <motion.div
              key={houseNumber}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="border-2 border-cosmic-300 bg-white p-2 relative min-h-[80px] flex flex-col justify-between hover:bg-cosmic-50 transition-colors"
            >
              {/* House Number */}
              <div className="text-xs font-bold text-cosmic-600 absolute top-1 left-1">
                {houseNumber}
              </div>
              
              {/* Sign */}
              <div className="text-xs text-center font-semibold text-gray-700 mt-3">
                {house?.sign}
              </div>
              
              {/* Planets */}
              <div className="flex flex-wrap justify-center gap-1 mt-1">
                {planetsInHouse.map((planet, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-golden-100 text-golden-800 px-1 rounded font-medium cursor-help"
                    title={`${planet.planet} at ${planet.degree}°`}
                  >
                    {planet.planet.slice(0, 2)}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Star className="h-8 w-8 text-golden-500" />
            <h1 className="text-3xl font-bold text-gray-900">Birth Chart Analysis</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your cosmic blueprint reveals the secrets of your soul's journey
          </p>
          <div className="flex items-center justify-center space-x-2 mt-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>Powered by Free Astrology API & Geolocation Services</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Visualization */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Type Selector */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-4">
                  <Button
                    variant={activeChart === 'lagna' ? 'primary' : 'outline'}
                    onClick={() => setActiveChart('lagna')}
                  >
                    Lagna Chart
                  </Button>
                  <Button
                    variant={activeChart === 'navamsa' ? 'primary' : 'outline'}
                    onClick={() => setActiveChart('navamsa')}
                  >
                    Navamsa Chart
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateChart}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Regenerate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Chart Grid */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-center mb-4 text-gray-900">
                  {activeChart === 'lagna' ? 'Lagna (Birth) Chart' : 'Navamsa (D9) Chart'}
                </h3>
                {renderChartGrid()}
              </div>

              {/* Chart Legend */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-golden-100 border border-golden-300 rounded"></div>
                  <span className="text-gray-600">Planets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cosmic-100 border border-cosmic-300 rounded"></div>
                  <span className="text-gray-600">Houses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-mystical-100 border border-mystical-300 rounded"></div>
                  <span className="text-gray-600">Signs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Hover for details</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Planet Positions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-cosmic-500" />
                Planet Positions
              </h3>
              <div className="space-y-3">
                {currentChart?.planetPositions.map((planet, index) => (
                  <motion.div
                    key={planet.planet}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-semibold text-gray-900">
                        {planet.planet}
                        {planet.isRetrograde && <span className="text-red-500 ml-1">R</span>}
                      </span>
                      <p className="text-sm text-gray-600">
                        {planet.sign} • House {planet.house}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-cosmic-600">
                        {planet.degree.toFixed(2)}°
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Birth Details */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Birth Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{user?.birthDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{user?.birthTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Place:</span>
                  <span className="font-medium">{user?.birthPlace}</span>
                </div>
                {user?.coordinates && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coordinates:</span>
                      <span className="font-medium text-xs">
                        {user.coordinates.lat.toFixed(4)}, {user.coordinates.lng.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timezone:</span>
                      <span className="font-medium">{user.coordinates.timezone}</span>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* API Status */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">API Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Free Astrology API:</span>
                  <span className="text-green-600 font-medium">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Geolocation:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Chart Generation:</span>
                  <span className="text-blue-600 font-medium">Real-time</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Detailed Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Share Chart
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};