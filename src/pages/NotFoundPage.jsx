import React from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-8"
        >
          <motion.span
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-6xl"
          >
            🚀
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-8xl font-bold text-gradient mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Oops! Page Not Found
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl text-gray-600 mb-8"
        >
          The page you're looking for seems to have launched into space! 
          Don't worry, we'll help you get back on track.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="primary"
            icon={<Home className="w-5 h-5" />}
            onClick={() => window.location.href = '/dashboard'}
          >
            Go Home
          </Button>
          
          <Button
            variant="outline"
            icon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          
          <Button
            variant="ghost"
            icon={<Search className="w-5 h-5" />}
            onClick={() => window.location.href = '/dashboard'}
          >
            Search
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Assessment', href: '/assessment' },
              { name: 'Career Path', href: '/career-path' },
              { name: 'Startup Path', href: '/startup-path' }
            ].map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="p-3 bg-white/80 rounded-lg hover:bg-primary-50 transition-colors text-sm font-medium text-gray-700 hover:text-primary-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;

