import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, User, Mail, Lock, Calendar, Clock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LocationPicker } from '../components/ui/LocationPicker';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthTime: z.string().min(1, 'Birth time is required'),
  birthPlace: z.string().min(2, 'Birth place is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [locationCoordinates, setLocationCoordinates] = React.useState<{
    lat: number;
    lng: number;
    timezone: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const handleLocationChange = (location: string, coordinates?: { lat: number; lng: number; timezone: string }) => {
    setValue('birthPlace', location);
    if (coordinates) {
      setLocationCoordinates(coordinates);
    }
  };

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        birthPlace: data.birthPlace,
        coordinates: locationCoordinates,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-16 h-16 bg-golden-gradient rounded-full flex items-center justify-center mb-4"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Join AstroNova</h2>
          <p className="mt-2 text-gray-200">Begin your cosmic journey today</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Full Name"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email address"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Confirm Password"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Birth Information */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-semibold text-gray-900">Birth Information</h3>
                <p className="text-sm text-gray-600">
                  Required for accurate astrology readings and chart calculations
                </p>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...register('birthDate')}
                    type="date"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors ${
                      errors.birthDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.birthDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    {...register('birthTime')}
                    type="time"
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:border-cosmic-500 transition-colors ${
                      errors.birthTime ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.birthTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.birthTime.message}</p>
                  )}
                </div>

                <div>
                  <LocationPicker
                    value=""
                    onChange={handleLocationChange}
                    placeholder="Birth Place (City, Country)"
                    className="w-full"
                  />
                  {errors.birthPlace && (
                    <p className="mt-1 text-sm text-red-600">{errors.birthPlace.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="rounded border-gray-300 text-cosmic-600 focus:ring-cosmic-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-cosmic-600 hover:text-cosmic-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-cosmic-600 hover:text-cosmic-500">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-3 text-lg"
            >
              Create Account
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-cosmic-600 hover:text-cosmic-500 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};