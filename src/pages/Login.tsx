import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [loginError, setLoginError] = React.useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoginError('');
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Invalid email or password. Try demo@astronova.com / demo123');
    }
  };

  return (
    <div className="min-h-screen bg-cosmic-gradient flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-200">Sign in to your cosmic journey</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {loginError && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2"
              >
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-red-700 text-sm">{loginError}</p>
              </motion.div>
            )}

            <div className="space-y-4">
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-cosmic-600 focus:ring-cosmic-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-cosmic-600 hover:text-cosmic-500">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-3 text-lg"
            >
              Sign In
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-cosmic-600 hover:text-cosmic-500 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 mb-2">Demo Account:</p>
              <p className="text-sm font-mono text-gray-700">demo@astronova.com</p>
              <p className="text-sm font-mono text-gray-700">demo123</p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};