import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Loader2, Navigation } from 'lucide-react';
import { astrologyAPI } from '../../services/astrologyAPI';

interface LocationData {
  latitude: number;
  longitude: number;
  timezone: string;
  place_name: string;
}

interface LocationPickerProps {
  value: string;
  onChange: (location: string, coordinates?: { lat: number; lng: number; timezone: string }) => void;
  placeholder?: string;
  className?: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  value,
  onChange,
  placeholder = "Enter birth place",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const searchPlaces = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const places = await astrologyAPI.searchPlaces(query);
      setSuggestions(places);
    } catch (error) {
      console.error('Place search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      searchPlaces(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSelectPlace = (place: LocationData) => {
    setSearchQuery(place.place_name);
    onChange(place.place_name, {
      lat: place.latitude,
      lng: place.longitude,
      timezone: place.timezone
    });
    setIsOpen(false);
    setSuggestions([]);
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      const location = await astrologyAPI.getCurrentLocation();
      setSearchQuery(location.place_name);
      onChange(location.place_name, {
        lat: location.latitude,
        lng: location.longitude,
        timezone: location.timezone
      });
    } catch (error) {
      console.error('Current location error:', error);
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors"
        />
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={isGettingLocation}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-cosmic-600 transition-colors"
          title="Use current location"
        >
          {isGettingLocation ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (searchQuery.length > 1 || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-cosmic-500" />
                <span className="ml-2 text-sm text-gray-600">Searching places...</span>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((place, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelectPlace(place)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {place.place_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : searchQuery.length > 1 ? (
              <div className="py-4 px-4 text-center text-sm text-gray-500">
                No places found for "{searchQuery}"
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};