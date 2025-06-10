import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Calendar, Zap, Eye, Download, RefreshCw, Bot, Heart, Shield, Moon } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Demo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'chart' | 'analysis' | 'chat' | 'location'>('chart');

  const demoData = {
    user: {
      name: "Arjun Sharma",
      birthDate: "1990-01-15",
      birthTime: "14:30",
      birthPlace: "New Delhi, India",
      coordinates: { lat: 28.6139, lng: 77.2090, timezone: "Asia/Kolkata" }
    },
    chart: {
      lagnaChart: {
        houses: [
          { number: 1, sign: "Aries", planets: ["Sun", "Me"] },
          { number: 2, sign: "Taurus", planets: ["Ve"] },
          { number: 3, sign: "Gemini", planets: [] },
          { number: 4, sign: "Cancer", planets: ["Mo"] },
          { number: 5, sign: "Leo", planets: ["Ju"] },
          { number: 6, sign: "Virgo", planets: [] },
          { number: 7, sign: "Libra", planets: ["Ma"] },
          { number: 8, sign: "Scorpio", planets: [] },
          { number: 9, sign: "Sagittarius", planets: [] },
          { number: 10, sign: "Capricorn", planets: ["Sa"] },
          { number: 11, sign: "Aquarius", planets: ["Ra"] },
          { number: 12, sign: "Pisces", planets: ["Ke"] }
        ]
      },
      planetPositions: [
        { planet: "Sun", sign: "Aries", degree: 15.5, house: 1, isRetrograde: false },
        { planet: "Moon", sign: "Cancer", degree: 23.2, house: 4, isRetrograde: false },
        { planet: "Mars", sign: "Libra", degree: 8.7, house: 7, isRetrograde: false },
        { planet: "Mercury", sign: "Aries", degree: 12.3, house: 1, isRetrograde: true },
        { planet: "Jupiter", sign: "Leo", degree: 28.9, house: 5, isRetrograde: false },
        { planet: "Venus", sign: "Taurus", degree: 5.1, house: 2, isRetrograde: false },
        { planet: "Saturn", sign: "Capricorn", degree: 18.4, house: 10, isRetrograde: false }
      ]
    },
    analysis: {
      sadsati: {
        isActive: true,
        phase: "peak",
        startDate: "2023-01-15",
        endDate: "2025-12-30",
        effects: [
          "Career challenges and professional obstacles",
          "Financial constraints and delayed payments",
          "Health issues related to stress and anxiety",
          "Relationship tensions and misunderstandings"
        ],
        remedies: [
          "Worship Lord Hanuman every Saturday",
          "Donate black sesame seeds and mustard oil",
          "Wear blue sapphire after proper consultation",
          "Recite Shani Chalisa daily"
        ]
      },
      mangalik: {
        isMangalik: true,
        severity: "medium",
        affectedAreas: [
          "Delays in marriage and relationship issues",
          "Conflicts with spouse and family members",
          "Career aggression and workplace disputes"
        ],
        remedies: [
          "Perform Mangal Dosh Puja on Tuesdays",
          "Marry another Mangalik person for compatibility",
          "Fast on Tuesdays and offer prayers to Lord Hanuman"
        ]
      },
      kalsarpa: {
        hasKalsarpa: false,
        type: "None",
        severity: "partial"
      }
    }
  };

  const renderChartDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Birth Chart</h3>
        <p className="text-gray-600">Real-time chart generation using Free Astrology API</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Visualization */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Lagna Chart (D1)</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </div>

            {/* Chart Grid */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-4 gap-1 aspect-square max-w-md mx-auto">
                {demoData.chart.lagnaChart.houses.map((house) => (
                  <motion.div
                    key={house.number}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: house.number * 0.05 }}
                    className="border-2 border-cosmic-300 bg-white p-2 relative min-h-[80px] flex flex-col justify-between hover:bg-cosmic-50 transition-colors cursor-pointer"
                  >
                    <div className="text-xs font-bold text-cosmic-600 absolute top-1 left-1">
                      {house.number}
                    </div>
                    <div className="text-xs text-center font-semibold text-gray-700 mt-3">
                      {house.sign}
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 mt-1">
                      {house.planets.map((planet, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-golden-100 text-golden-800 px-1 rounded font-medium"
                          title={`${planet} in ${house.sign}`}
                        >
                          {planet}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <Zap className="h-4 w-4" />
                <span>Live API Integration Active</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Planet Positions */}
        <div>
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-cosmic-500" />
              Planet Positions
            </h4>
            <div className="space-y-3">
              {demoData.chart.planetPositions.map((planet, index) => (
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
        </div>
      </div>
    </div>
  );

  const renderAnalysisDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Comprehensive Analysis</h3>
        <p className="text-gray-600">Sadsati, Mangalik & Kalsarpa Yoga detection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sadsati Analysis */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="h-6 w-6 text-mystical-500" />
            <h4 className="text-xl font-bold text-gray-900">Sadsati Analysis</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                Active (Peak Phase)
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-semibold text-gray-900 text-sm">
                Jan 2023 - Dec 2025
              </span>
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-semibold text-gray-900 mb-2">Key Effects:</h5>
              <ul className="space-y-1">
                {demoData.analysis.sadsati.effects.slice(0, 3).map((effect, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-mystical-400 rounded-full mr-2" />
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-semibold text-gray-900 mb-2">Remedies:</h5>
              <ul className="space-y-1">
                {demoData.analysis.sadsati.remedies.slice(0, 2).map((remedy, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-golden-400 rounded-full mr-2" />
                    {remedy}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Mangalik Analysis */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <h4 className="text-xl font-bold text-gray-900">Mangalik Analysis</h4>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Mangalik Status:</span>
              <span className="font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                Yes (Medium)
              </span>
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-semibold text-gray-900 mb-2">Affected Areas:</h5>
              <ul className="space-y-1">
                {demoData.analysis.mangalik.affectedAreas.slice(0, 3).map((area, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-semibold text-gray-900 mb-2">Remedies:</h5>
              <ul className="space-y-1">
                {demoData.analysis.mangalik.remedies.slice(0, 2).map((remedy, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-golden-400 rounded-full mr-2" />
                    {remedy}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Kalsarpa Status */}
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-cosmic-500" />
            <h4 className="text-xl font-bold text-gray-900">Kalsarpa Yoga</h4>
          </div>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h5 className="text-lg font-semibold text-green-600 mb-2">No Kalsarpa Yoga Detected</h5>
            <p className="text-gray-600">Your chart is free from Kalsarpa Yoga effects. This is a positive indication for spiritual and material progress.</p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderChatDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Astrologer Chat</h3>
        <p className="text-gray-600">Powered by OpenAI GPT with astrology expertise</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-cosmic-gradient p-3 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Sage Cosmos</h4>
              <p className="text-sm text-gray-600">Your AI Astrology Guide</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Sample Chat Messages */}
          <div className="flex justify-end">
            <div className="bg-cosmic-600 text-white rounded-2xl px-4 py-3 max-w-xs">
              <p className="text-sm">What does my birth chart reveal about my career prospects?</p>
              <p className="text-xs text-cosmic-200 mt-1">2:30 PM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-xs">
              <p className="text-sm text-gray-900">
                🌟 Your birth chart reveals powerful career indicators! With Sun in Aries (1st house) and Saturn in Capricorn (10th house), you possess natural leadership abilities and strong work ethics. 
                
                Jupiter in Leo (5th house) suggests success in creative fields or education. The current planetary transits favor new opportunities in early 2024.
                
                May divine blessings guide your professional journey! ✨
              </p>
              <p className="text-xs text-gray-500 mt-2">2:31 PM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-cosmic-600 text-white rounded-2xl px-4 py-3 max-w-xs">
              <p className="text-sm">When is the best time to start a new business?</p>
              <p className="text-xs text-cosmic-200 mt-1">2:32 PM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-xs">
              <p className="text-sm text-gray-900">
                🚀 The cosmic energies suggest March-April 2024 as highly favorable for new ventures! Jupiter's transit through your 5th house brings innovation and creativity.
                
                However, be mindful of the ongoing Sadsati period - ensure proper planning and seek divine blessings before major decisions.
                
                Trust your intuition and the universe will support your endeavors! 🙏
              </p>
              <p className="text-xs text-gray-500 mt-2">2:33 PM</p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Ask Sage Cosmos about your cosmic journey..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cosmic-500"
              disabled
            />
            <Button className="px-6 py-2 rounded-full" disabled>
              Send
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Demo mode - Add OpenAI API key for live chat
          </p>
        </div>
      </Card>
    </div>
  );

  const renderLocationDemo = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Location Services</h3>
        <p className="text-gray-600">Automatic detection and precise coordinate calculation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Location */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-6 w-6 text-cosmic-500" />
            <h4 className="text-lg font-bold text-gray-900">Current Location</h4>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Detected Location:</span>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Auto-detected</span>
              </div>
              <p className="font-semibold text-gray-900">{demoData.user.birthPlace}</p>
              <p className="text-sm text-gray-600">
                {demoData.user.coordinates.lat.toFixed(4)}, {demoData.user.coordinates.lng.toFixed(4)}
              </p>
              <p className="text-sm text-gray-600">
                Timezone: {demoData.user.coordinates.timezone}
              </p>
            </div>

            <Button variant="outline" className="w-full" disabled>
              <MapPin className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>
        </Card>

        {/* Location Search */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-6 w-6 text-golden-500" />
            <h4 className="text-lg font-bold text-gray-900">Location Search</h4>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for a place..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500"
                defaultValue="New Delhi"
                disabled
              />
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="text-xs text-gray-500 mb-2">Search Results:</div>
              {[
                "New Delhi, India",
                "Delhi, India", 
                "New Delhi, NY, USA"
              ].map((place, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded cursor-pointer hover:bg-cosmic-50">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{place}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* API Status */}
        <Card className="p-6 md:col-span-2">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Geolocation API Status</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h5 className="font-semibold text-green-600">IP Geolocation</h5>
              <p className="text-sm text-gray-600">Auto-detect user location</p>
              <div className="mt-2 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">Connected</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h5 className="font-semibold text-blue-600">OpenCage Geocoding</h5>
              <p className="text-sm text-gray-600">Place search & coordinates</p>
              <div className="mt-2 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Active</div>
            </div>

            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-purple-600">Timezone Detection</h5>
              <p className="text-sm text-gray-600">Accurate time calculations</p>
              <div className="mt-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">Real-time</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

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
            <h1 className="text-3xl font-bold text-gray-900">AstroNova Demo</h1>
          </div>
          <p className="text-gray-600 text-lg mb-6">
            Experience the power of real-time astrology with Free Astrology API integration
          </p>
          
          {/* API Status Banner */}
          <div className="inline-flex items-center space-x-4 bg-green-50 border border-green-200 rounded-lg px-6 py-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-medium">Free Astrology API</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-medium">Geolocation Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700 font-medium">AI Chat Ready</span>
            </div>
          </div>
        </motion.div>

        {/* Demo Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <div className="flex space-x-1">
              {[
                { id: 'chart', label: 'Birth Chart', icon: Star },
                { id: 'analysis', label: 'Analysis', icon: Eye },
                { id: 'chat', label: 'AI Chat', icon: Bot },
                { id: 'location', label: 'Location', icon: MapPin }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveDemo(id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeDemo === id
                      ? 'bg-cosmic-600 text-white'
                      : 'text-gray-600 hover:text-cosmic-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Demo Content */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeDemo === 'chart' && renderChartDemo()}
          {activeDemo === 'analysis' && renderAnalysisDemo()}
          {activeDemo === 'chat' && renderChatDemo()}
          {activeDemo === 'location' && renderLocationDemo()}
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Demo User Profile</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{demoData.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Birth Date:</span>
                <span className="font-medium">{demoData.user.birthDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Birth Time:</span>
                <span className="font-medium">{demoData.user.birthTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Birth Place:</span>
                <span className="font-medium">{demoData.user.birthPlace}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coordinates:</span>
                <span className="font-medium text-xs">
                  {demoData.user.coordinates.lat}, {demoData.user.coordinates.lng}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Timezone:</span>
                <span className="font-medium">{demoData.user.coordinates.timezone}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-cosmic-gradient text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-200 mb-6">
              Add your API keys to unlock the full power of real-time astrology calculations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Sign Up Now
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-cosmic-900">
                <Eye className="h-5 w-5 mr-2" />
                View Documentation
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};