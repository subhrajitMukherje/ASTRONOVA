import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cosmic-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="bg-cosmic-gradient p-2 rounded-lg"
              >
                <Sparkles className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold">AstroNova</span>
            </div>
            <p className="text-gray-300 text-sm">
              Unlock the mysteries of the cosmos with personalized astrology readings and cosmic insights.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/dashboard" className="text-gray-300 hover:text-golden-400 transition-colors">Dashboard</a></li>
              <li><a href="/chart" className="text-gray-300 hover:text-golden-400 transition-colors">Birth Chart</a></li>
              <li><a href="/readings" className="text-gray-300 hover:text-golden-400 transition-colors">Readings</a></li>
              <li><a href="/chat" className="text-gray-300 hover:text-golden-400 transition-colors">Chat</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-300">Sadsati Analysis</span></li>
              <li><span className="text-gray-300">Mangalik Dosh</span></li>
              <li><span className="text-gray-300">Kalsarpa Yoga</span></li>
              <li><span className="text-gray-300">Navamsa Chart</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-golden-400" />
                <span className="text-gray-300">support@astronova.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-golden-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-golden-400" />
                <span className="text-gray-300">Cosmic Center, Star City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 AstroNova. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-golden-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-golden-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-golden-400 text-sm transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};