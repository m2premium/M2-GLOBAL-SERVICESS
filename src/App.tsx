/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import { User, ActiveView, Theme } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ActiveView>('login');
  const [theme, setTheme] = useState<Theme>('cyber-slate');

  const handleLoginSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    setCurrentView('dashboard');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleLogout = () => {
    setCurrentView('login');
    // Clear user after exit animation has space to play
    setTimeout(() => {
      setUser(null);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentView === 'login' ? (
          <motion.div
            key="login-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            <LoginScreen 
              theme={theme} 
              setTheme={setTheme} 
              onLoginSuccess={handleLoginSuccess} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard-view"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {user && (
              <DashboardScreen 
                user={user} 
                onUserUpdate={handleUserUpdate}
                theme={theme}
                setTheme={setTheme}
                onLogout={handleLogout} 
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

