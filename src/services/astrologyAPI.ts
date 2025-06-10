import axios from 'axios';
import { BirthChart, AstrologyAnalysis } from '../types';

// Free Astrology API Configuration
const FREE_ASTRO_API_URL = import.meta.env.VITE_FREE_ASTROLOGY_API_URL || 'https://api.vedicastroapi.com/v3-json';
const FREE_ASTRO_USER_ID = import.meta.env.VITE_FREE_ASTROLOGY_API_USER_ID || 'demo';
const FREE_ASTRO_API_KEY = import.meta.env.VITE_FREE_ASTROLOGY_API_KEY || 'demo';

// OpenAI Configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

// Geolocation APIs
const IPGEOLOCATION_API_KEY = import.meta.env.VITE_IPGEOLOCATION_API_KEY || '';
const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY || '';

interface LocationData {
  latitude: number;
  longitude: number;
  timezone: string;
  place_name: string;
}

interface BirthData {
  date: string;
  time: string;
  place: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

class AstrologyAPIService {
  // Get user's current location using IP geolocation
  async getCurrentLocation(): Promise<LocationData> {
    try {
      if (IPGEOLOCATION_API_KEY) {
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`);
        return {
          latitude: parseFloat(response.data.latitude),
          longitude: parseFloat(response.data.longitude),
          timezone: response.data.time_zone.name,
          place_name: `${response.data.city}, ${response.data.country_name}`
        };
      }
      
      // Fallback to browser geolocation
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation not supported'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const placeName = await this.reverseGeocode(latitude, longitude);
              resolve({
                latitude,
                longitude,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                place_name: placeName
              });
            } catch (error) {
              resolve({
                latitude,
                longitude,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                place_name: 'Current Location'
              });
            }
          },
          (error) => {
            // Default to Delhi coordinates
            resolve({
              latitude: 28.6139,
              longitude: 77.2090,
              timezone: 'Asia/Kolkata',
              place_name: 'New Delhi, India'
            });
          }
        );
      });
    } catch (error) {
      console.error('Location error:', error);
      // Default location
      return {
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: 'Asia/Kolkata',
        place_name: 'New Delhi, India'
      };
    }
  }

  // Search for places using geocoding
  async searchPlaces(query: string): Promise<LocationData[]> {
    try {
      if (OPENCAGE_API_KEY) {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
          params: {
            q: query,
            key: OPENCAGE_API_KEY,
            limit: 5,
            no_annotations: 1
          }
        });

        return response.data.results.map((result: any) => ({
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
          timezone: result.annotations?.timezone?.name || 'UTC',
          place_name: result.formatted
        }));
      }

      // Fallback to demo locations
      return this.getDemoLocations(query);
    } catch (error) {
      console.error('Place search error:', error);
      return this.getDemoLocations(query);
    }
  }

  // Reverse geocoding to get place name from coordinates
  async reverseGeocode(latitude: number, longitude: number): Promise<string> {
    try {
      if (OPENCAGE_API_KEY) {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
          params: {
            q: `${latitude},${longitude}`,
            key: OPENCAGE_API_KEY,
            no_annotations: 1
          }
        });

        if (response.data.results.length > 0) {
          return response.data.results[0].formatted;
        }
      }
      return 'Unknown Location';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Unknown Location';
    }
  }

  // Get coordinates for a place name
  async getLocationCoordinates(place: string): Promise<LocationData> {
    try {
      const places = await this.searchPlaces(place);
      if (places.length > 0) {
        return places[0];
      }
      
      // Fallback to demo locations
      const demoLocation = this.getDemoLocationByName(place);
      return demoLocation;
    } catch (error) {
      console.error('Geocoding error:', error);
      return this.getDemoLocationByName(place);
    }
  }

  // Generate birth chart using Free Astrology API
  async generateBirthChart(birthData: BirthData): Promise<BirthChart> {
    try {
      // Get coordinates if not provided
      let locationData: LocationData;
      if (birthData.latitude && birthData.longitude) {
        locationData = {
          latitude: birthData.latitude,
          longitude: birthData.longitude,
          timezone: birthData.timezone || 'UTC',
          place_name: birthData.place
        };
      } else {
        locationData = await this.getLocationCoordinates(birthData.place);
      }

      // Parse date and time
      const [year, month, day] = birthData.date.split('-').map(Number);
      const [hour, minute] = birthData.time.split(':').map(Number);

      const apiParams = {
        user_id: FREE_ASTRO_USER_ID,
        api_key: FREE_ASTRO_API_KEY,
        full_name: 'User',
        day: day,
        month: month,
        year: year,
        hour: hour,
        min: minute,
        sec: 0,
        gender: 'male',
        place: locationData.place_name,
        lat: locationData.latitude,
        lon: locationData.longitude,
        tzone: this.getTimezoneOffset(locationData.timezone),
        language: 'en'
      };

      // Get Lagna Chart
      const lagnaResponse = await axios.post(`${FREE_ASTRO_API_URL}/horoscope-chart/chalit`, apiParams);
      
      // Get Navamsa Chart
      const navamsaResponse = await axios.post(`${FREE_ASTRO_API_URL}/horoscope-chart/D9`, apiParams);
      
      // Get Planet Positions
      const planetsResponse = await axios.post(`${FREE_ASTRO_API_URL}/planet-details`, apiParams);

      return this.formatChartData(lagnaResponse.data, navamsaResponse.data, planetsResponse.data);
    } catch (error) {
      console.error('Free Astrology API error:', error);
      // Fallback to demo chart
      return this.generateDemoChart(birthData);
    }
  }

  // Generate astrology analysis using Free Astrology API
  async generateAnalysis(birthData: BirthData): Promise<AstrologyAnalysis> {
    try {
      const locationData = await this.getLocationCoordinates(birthData.place);
      const [year, month, day] = birthData.date.split('-').map(Number);
      const [hour, minute] = birthData.time.split(':').map(Number);

      const apiParams = {
        user_id: FREE_ASTRO_USER_ID,
        api_key: FREE_ASTRO_API_KEY,
        full_name: 'User',
        day: day,
        month: month,
        year: year,
        hour: hour,
        min: minute,
        sec: 0,
        gender: 'male',
        place: locationData.place_name,
        lat: locationData.latitude,
        lon: locationData.longitude,
        tzone: this.getTimezoneOffset(locationData.timezone),
        language: 'en'
      };

      // Get various analyses
      const [sadsatiResponse, mangalikResponse, kalsarpaResponse] = await Promise.allSettled([
        axios.post(`${FREE_ASTRO_API_URL}/sade-sati-details`, apiParams),
        axios.post(`${FREE_ASTRO_API_URL}/manglik-details`, apiParams),
        axios.post(`${FREE_ASTRO_API_URL}/kalsarpa-details`, apiParams)
      ]);

      return this.formatAnalysisData(sadsatiResponse, mangalikResponse, kalsarpaResponse);
    } catch (error) {
      console.error('Analysis API error:', error);
      return this.generateDemoAnalysis(birthData);
    }
  }

  // AI Astrologer Chat
  async chatWithAstrologer(message: string, userContext?: any): Promise<string> {
    try {
      if (!OPENAI_API_KEY) {
        return this.getDemoAstrologerResponse(message);
      }

      const systemPrompt = `You are Sage Cosmos, a wise and experienced Vedic astrologer with deep knowledge of:
      - Birth chart analysis (Lagna and Navamsa charts)
      - Planetary positions and their effects
      - Sadsati, Mangalik, and Kalsarpa yoga analysis
      - Remedies and spiritual guidance
      - Life predictions and timing of events
      
      Respond in a warm, wise, and mystical tone. Provide practical advice along with spiritual insights.
      Keep responses concise but meaningful. Always end with a blessing or positive affirmation.`;

      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Chat API error:', error);
      return this.getDemoAstrologerResponse(message);
    }
  }

  // Helper methods
  private getTimezoneOffset(timezone: string): number {
    try {
      const now = new Date();
      const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
      const targetTime = new Date(utc.toLocaleString("en-US", {timeZone: timezone}));
      return (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
    } catch (error) {
      return 5.5; // Default to IST
    }
  }

  private formatChartData(lagnaData: any, navamsaData: any, planetsData: any): BirthChart {
    try {
      // Format the API response data into our chart structure
      const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                     'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
      
      const lagnaChart = {
        houses: Array.from({ length: 12 }, (_, i) => ({
          number: i + 1,
          sign: signs[i],
          lord: this.getSignLord(signs[i]),
          strength: Math.floor(Math.random() * 100) + 1,
        })),
        planets: this.extractPlanetsFromChart(lagnaData?.chart_data || {}),
      };

      const navamsaChart = {
        houses: Array.from({ length: 12 }, (_, i) => ({
          number: i + 1,
          sign: signs[i],
          lord: this.getSignLord(signs[i]),
          strength: Math.floor(Math.random() * 100) + 1,
        })),
        planets: this.extractPlanetsFromChart(navamsaData?.chart_data || {}),
      };

      const planetPositions = this.extractPlanetPositions(planetsData?.planet_details || []);

      return {
        lagnaChart,
        navamsaChart,
        planetPositions,
      };
    } catch (error) {
      console.error('Chart formatting error:', error);
      return this.generateDemoChart({});
    }
  }

  private extractPlanetsFromChart(chartData: any): any[] {
    const planets = [];
    const planetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    
    for (let house = 1; house <= 12; house++) {
      const houseData = chartData[house] || [];
      if (Array.isArray(houseData)) {
        houseData.forEach((planetId: number) => {
          if (planetId >= 0 && planetId < planetNames.length) {
            planets.push({
              planet: planetNames[planetId],
              house: house,
              sign: this.getSignForHouse(house),
              degree: Math.round((Math.random() * 30) * 100) / 100,
            });
          }
        });
      }
    }
    
    return planets;
  }

  private extractPlanetPositions(planetDetails: any[]): any[] {
    const planetNames = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    
    return planetDetails.map((planet: any, index: number) => ({
      planet: planetNames[index] || `Planet${index}`,
      sign: planet.sign || 'Aries',
      degree: parseFloat(planet.degree) || 0,
      house: parseInt(planet.house) || 1,
      isRetrograde: planet.is_retrograde === 'true' || false,
    }));
  }

  private formatAnalysisData(sadsatiResponse: any, mangalikResponse: any, kalsarpaResponse: any): AstrologyAnalysis {
    try {
      const sadsatiData = sadsatiResponse.status === 'fulfilled' ? sadsatiResponse.value.data : null;
      const mangalikData = mangalikResponse.status === 'fulfilled' ? mangalikResponse.value.data : null;
      const kalsarpaData = kalsarpaResponse.status === 'fulfilled' ? kalsarpaResponse.value.data : null;

      return {
        sadsati: {
          isActive: sadsatiData?.is_undergoing_sade_sati === 'true' || false,
          phase: sadsatiData?.sade_sati_phase || 'not-active',
          startDate: sadsatiData?.sade_sati_start_date || '',
          endDate: sadsatiData?.sade_sati_end_date || '',
          effects: sadsatiData?.effects || [],
          remedies: sadsatiData?.remedies || []
        },
        mangalik: {
          isMangalik: mangalikData?.is_manglik === 'true' || false,
          severity: mangalikData?.manglik_intensity || 'low',
          affectedAreas: mangalikData?.affected_areas || [],
          remedies: mangalikData?.remedies || []
        },
        kalsarpa: {
          hasKalsarpa: kalsarpaData?.has_kalsarpa_yoga === 'true' || false,
          type: kalsarpaData?.kalsarpa_type || 'None',
          severity: kalsarpaData?.severity || 'partial',
          effects: kalsarpaData?.effects || [],
          remedies: kalsarpaData?.remedies || []
        }
      };
    } catch (error) {
      console.error('Analysis formatting error:', error);
      return this.generateDemoAnalysis({});
    }
  }

  // Demo/Fallback methods
  private getDemoLocations(query: string): LocationData[] {
    const demoLocations = [
      { latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata', place_name: 'New Delhi, India' },
      { latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', place_name: 'Mumbai, India' },
      { latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', place_name: 'Bangalore, India' },
      { latitude: 40.7128, longitude: -74.0060, timezone: 'America/New_York', place_name: 'New York, USA' },
      { latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London', place_name: 'London, UK' },
    ];

    return demoLocations.filter(loc => 
      loc.place_name.toLowerCase().includes(query.toLowerCase())
    );
  }

  private getDemoLocationByName(place: string): LocationData {
    const demoLocations: { [key: string]: LocationData } = {
      'delhi': { latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata', place_name: 'New Delhi, India' },
      'mumbai': { latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata', place_name: 'Mumbai, India' },
      'bangalore': { latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata', place_name: 'Bangalore, India' },
      'chennai': { latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata', place_name: 'Chennai, India' },
      'kolkata': { latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata', place_name: 'Kolkata, India' },
    };

    const key = place.toLowerCase();
    return demoLocations[key] || demoLocations['delhi'];
  }

  private generateDemoChart(birthData: any): BirthChart {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
    
    const lagnaChart = {
      houses: Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        sign: signs[i],
        lord: this.getSignLord(signs[i]),
        strength: Math.floor(Math.random() * 100) + 1,
      })),
      planets: planets.map(planet => ({
        planet,
        house: Math.floor(Math.random() * 12) + 1,
        sign: signs[Math.floor(Math.random() * 12)],
        degree: Math.round((Math.random() * 30) * 100) / 100,
      })),
    };

    const navamsaChart = {
      houses: Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        sign: signs[(i + 3) % 12],
        lord: this.getSignLord(signs[(i + 3) % 12]),
        strength: Math.floor(Math.random() * 100) + 1,
      })),
      planets: planets.map(planet => ({
        planet,
        house: Math.floor(Math.random() * 12) + 1,
        sign: signs[Math.floor(Math.random() * 12)],
        degree: Math.round((Math.random() * 30) * 100) / 100,
      })),
    };

    const planetPositions = planets.map(planet => ({
      planet,
      sign: signs[Math.floor(Math.random() * 12)],
      degree: Math.round((Math.random() * 30) * 100) / 100,
      house: Math.floor(Math.random() * 12) + 1,
      isRetrograde: Math.random() > 0.8,
    }));

    return { lagnaChart, navamsaChart, planetPositions };
  }

  private generateDemoAnalysis(birthData: any): AstrologyAnalysis {
    const isActiveSadsati = Math.random() > 0.6;
    const isMangalik = Math.random() > 0.7;
    const hasKalsarpa = Math.random() > 0.8;

    return {
      sadsati: {
        isActive: isActiveSadsati,
        phase: isActiveSadsati ? ['starting', 'peak', 'ending'][Math.floor(Math.random() * 3)] as any : 'not-active',
        startDate: isActiveSadsati ? '2023-06-15' : '',
        endDate: isActiveSadsati ? '2026-03-20' : '',
        effects: isActiveSadsati ? [
          'Career challenges and professional obstacles',
          'Financial constraints and delayed payments',
          'Health issues related to stress and anxiety'
        ] : [],
        remedies: isActiveSadsati ? [
          'Worship Lord Hanuman every Saturday',
          'Donate black sesame seeds and mustard oil',
          'Recite Shani Chalisa daily'
        ] : []
      },
      mangalik: {
        isMangalik,
        severity: isMangalik ? ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any : 'low',
        affectedAreas: isMangalik ? [
          'Delays in marriage and relationship issues',
          'Conflicts with spouse and family members'
        ] : [],
        remedies: isMangalik ? [
          'Perform Mangal Dosh Puja on Tuesdays',
          'Fast on Tuesdays and offer prayers to Lord Hanuman'
        ] : []
      },
      kalsarpa: {
        hasKalsarpa,
        type: hasKalsarpa ? ['Anant', 'Kulik', 'Vasuki'][Math.floor(Math.random() * 3)] : 'None',
        severity: hasKalsarpa ? ['partial', 'complete'][Math.floor(Math.random() * 2)] as any : 'partial',
        effects: hasKalsarpa ? [
          'Sudden ups and downs in life',
          'Delays in achieving goals'
        ] : [],
        remedies: hasKalsarpa ? [
          'Perform Kalsarpa Dosh Puja',
          'Recite Maha Mrityunjaya Mantra daily'
        ] : []
      }
    };
  }

  private getSignLord(sign: string): string {
    const signLords: { [key: string]: string } = {
      'Aries': 'Mars', 'Taurus': 'Venus', 'Gemini': 'Mercury', 'Cancer': 'Moon',
      'Leo': 'Sun', 'Virgo': 'Mercury', 'Libra': 'Venus', 'Scorpio': 'Mars',
      'Sagittarius': 'Jupiter', 'Capricorn': 'Saturn', 'Aquarius': 'Saturn', 'Pisces': 'Jupiter'
    };
    return signLords[sign] || 'Unknown';
  }

  private getSignForHouse(house: number): string {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    return signs[(house - 1) % 12];
  }

  private getDemoAstrologerResponse(message: string): string {
    const responses = [
      "🌟 The stars whisper of great potential in your path. Your question reveals a soul seeking deeper understanding. Trust in the cosmic timing, for everything unfolds as it should. May the divine light guide your journey forward.",
      
      "🌙 I sense strong planetary influences around you. The Moon's position suggests emotional depth and intuitive gifts. Focus on meditation and inner reflection during this time. The universe is preparing you for something beautiful.",
      
      "⭐ Your birth chart indicates a powerful combination of energies. Jupiter's blessing brings wisdom and growth opportunities. Stay open to new experiences and trust your inner guidance. Prosperity flows to those who align with cosmic rhythms.",
    ];

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('love') || lowerMessage.includes('relationship')) {
      return "💕 Venus graces your chart with the promise of deep connections. Love flows to those who first love themselves. Open your heart to receive the universe's gifts, but remember - true love begins with self-acceptance. May your relationships bloom like lotus flowers in sacred waters.";
    }
    
    if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
      return "🌟 Saturn and Jupiter align to bring career opportunities your way. Your professional path is guided by divine purpose. Trust your skills and take calculated risks. Success comes to those who combine hard work with spiritual wisdom. May prosperity flow abundantly in your chosen field.";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const astrologyAPI = new AstrologyAPIService();