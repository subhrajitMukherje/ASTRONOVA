import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Star, Moon, Zap } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Chat: React.FC = () => {
  const { user } = useAuthStore();
  const { messages, isLoading, sendMessage, clearChat } = useChatStore();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage('');
    await sendMessage(message);
  };

  const quickQuestions = [
    "What does my birth chart reveal about my personality?",
    "When is the best time for me to start a new venture?",
    "How can I improve my relationships?",
    "What career path suits me best?",
    "Are there any doshas in my chart?",
    "What remedies can help me overcome obstacles?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="bg-cosmic-gradient p-3 rounded-full"
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900">Sage Cosmos</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Your personal AI astrologer, here to guide you through cosmic wisdom
          </p>
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="text-gray-500 hover:text-red-600"
            >
              Clear Chat History
            </Button>
          </div>
        </motion.div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="bg-cosmic-gradient p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Welcome, {user?.name}!
                </h3>
                <p className="text-gray-600 mb-6">
                  I'm Sage Cosmos, your personal astrology guide. Ask me anything about your cosmic journey!
                </p>
                
                {/* Quick Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {quickQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleQuickQuestion(question)}
                      className="p-3 text-left text-sm bg-gray-50 hover:bg-cosmic-50 rounded-lg transition-colors border border-gray-200 hover:border-cosmic-300"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-cosmic-gradient' 
                        : 'bg-golden-gradient'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-white" />
                      )}
                    </div>

                    {/* Message */}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-cosmic-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-cosmic-200' : 'text-gray-500'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-golden-gradient w-10 h-10 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-cosmic-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-cosmic-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-cosmic-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Sage Cosmos about your cosmic journey..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500"
                  disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Star className="h-4 w-4 text-golden-400" />
                  <Moon className="h-4 w-4 text-mystical-400" />
                  <Zap className="h-4 w-4 text-cosmic-400" />
                </div>
              </div>
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};