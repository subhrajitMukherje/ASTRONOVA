import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { astrologyAPI } from '../services/astrologyAPI';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,

      sendMessage: async (message: string) => {
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'user',
          content: message,
          timestamp: new Date().toISOString(),
        };

        // Add user message immediately
        set(state => ({
          messages: [...state.messages, userMessage],
          isLoading: true,
        }));

        try {
          // Get AI response
          const response = await astrologyAPI.chatWithAstrologer(message);
          
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: response,
            timestamp: new Date().toISOString(),
          };

          set(state => ({
            messages: [...state.messages, botMessage],
            isLoading: false,
          }));
        } catch (error) {
          console.error('Chat error:', error);
          
          const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: "🌟 I apologize, but I'm experiencing some cosmic interference right now. Please try asking your question again, and I'll do my best to provide you with the guidance you seek.",
            timestamp: new Date().toISOString(),
          };

          set(state => ({
            messages: [...state.messages, errorMessage],
            isLoading: false,
          }));
        }
      },

      clearChat: () => {
        set({ messages: [] });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);