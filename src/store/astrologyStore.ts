import { create } from 'zustand';
import { AstrologyReading, ChatMessage, BirthChart, AstrologyAnalysis } from '../types';
import { astrologyAPI } from '../services/astrologyAPI';

interface AstrologyState {
  readings: AstrologyReading[];
  chatHistory: ChatMessage[];
  birthChart: BirthChart | null;
  analysis: AstrologyAnalysis | null;
  isLoading: boolean;
  
  addReading: (reading: AstrologyReading) => void;
  addChatMessage: (message: ChatMessage) => void;
  generateBirthChart: (birthData: { date: string; time: string; place: string; coordinates?: any }) => Promise<void>;
  generateAnalysis: (birthData: { date: string; time: string; place: string; coordinates?: any }) => Promise<void>;
  clearHistory: () => void;
}

export const useAstrologyStore = create<AstrologyState>((set, get) => ({
  readings: [],
  chatHistory: [],
  birthChart: null,
  analysis: null,
  isLoading: false,

  addReading: (reading) => {
    set(state => ({
      readings: [reading, ...state.readings]
    }));
  },

  addChatMessage: (message) => {
    set(state => ({
      chatHistory: [message, ...state.chatHistory]
    }));
  },

  generateBirthChart: async (birthData) => {
    set({ isLoading: true });
    try {
      const chart = await astrologyAPI.generateBirthChart({
        date: birthData.date,
        time: birthData.time,
        place: birthData.place,
        latitude: birthData.coordinates?.lat,
        longitude: birthData.coordinates?.lng,
        timezone: birthData.coordinates?.timezone,
      });
      set({ birthChart: chart, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  generateAnalysis: async (birthData) => {
    set({ isLoading: true });
    try {
      const analysis = await astrologyAPI.generateAnalysis({
        date: birthData.date,
        time: birthData.time,
        place: birthData.place,
        latitude: birthData.coordinates?.lat,
        longitude: birthData.coordinates?.lng,
        timezone: birthData.coordinates?.timezone,
      });
      set({ analysis, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  clearHistory: () => {
    set({ chatHistory: [], readings: [] });
  },
}));