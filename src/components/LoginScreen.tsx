import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, KeyRound, AlertCircle, CheckCircle, Github, Linkedin, Facebook, Fingerprint, Shield, ShieldCheck, Check, Paintbrush } from 'lucide-react';
import { User as UserType, LoginMode, Theme } from '../types';

interface LoginScreenProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onLoginSuccess: (user: UserType) => void;
}

export const THEMES = [
  {
    id: 'cyber-slate' as Theme,
    name: 'Cyber Slate',
    bg: 'bg-[#020408]',
    cardBg: 'bg-[#0a0d14]/60',
    text: 'text-slate-100',
    primaryColor: 'from-cyan-400 to-blue-500',
    accentClass: 'text-cyan-400',
    borderAccent: 'border-cyan-500/20',
    glowBg1: 'bg-cyan-950/20',
    glowBg2: 'bg-blue-900/10',
    buttonBg: 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500',
    badgeClass: 'border-cyan-500/10 bg-cyan-500/5 text-cyan-400',
    borderClass: 'border-cyan-500/20',
    shadowClass: 'shadow-cyan-900/20',
    activeDot: 'bg-cyan-400',
    accentHex: '#38a8f9',
  },
  {
    id: 'solar-flare' as Theme,
    name: 'Solar Flare',
    bg: 'bg-[#0a0502]',
    cardBg: 'bg-[#140d0a]/60',
    text: 'text-amber-100',
    primaryColor: 'from-amber-400 to-orange-500',
    accentClass: 'text-amber-400',
    borderAccent: 'border-amber-500/20',
    glowBg1: 'bg-amber-950/20',
    glowBg2: 'bg-orange-900/10',
    buttonBg: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
    badgeClass: 'border-amber-500/10 bg-amber-500/5 text-amber-400',
    borderClass: 'border-amber-500/20',
    shadowClass: 'shadow-amber-900/20',
    activeDot: 'bg-amber-400',
    accentHex: '#fbbf24',
  },
  {
    id: 'emerald-vault' as Theme,
    name: 'Emerald Vault',
    bg: 'bg-[#010905]',
    cardBg: 'bg-[#04140c]/60',
    text: 'text-emerald-100',
    primaryColor: 'from-emerald-400 to-teal-500',
    accentClass: 'text-emerald-400',
    borderAccent: 'border-emerald-500/20',
    glowBg1: 'bg-emerald-950/20',
    glowBg2: 'bg-teal-900/10',
    buttonBg: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
    badgeClass: 'border-emerald-500/10 bg-emerald-500/5 text-emerald-400',
    borderClass: 'border-emerald-500/20',
    shadowClass: 'shadow-emerald-900/20',
    activeDot: 'bg-emerald-400',
    accentHex: '#34d399',
  },
  {
    id: 'deep-space' as Theme,
    name: 'Deep Space',
    bg: 'bg-[#030209]',
    cardBg: 'bg-[#0c0617]/60',
    text: 'text-violet-100',
    primaryColor: 'from-violet-400 to-fuchsia-500',
    accentClass: 'text-violet-400',
    borderAccent: 'border-violet-500/20',
    glowBg1: 'bg-violet-950/20',
    glowBg2: 'bg-fuchsia-900/10',
    buttonBg: 'from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500',
    badgeClass: 'border-violet-500/10 bg-violet-500/5 text-violet-400',
    borderClass: 'border-violet-500/20',
    shadowClass: 'shadow-violet-900/20',
    activeDot: 'bg-violet-400',
    accentHex: '#a78bfa',
  }
];

// Google SVG Icon for pixel-perfect social button
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

export default function LoginScreen({ theme, setTheme, onLoginSuccess }: LoginScreenProps) {
  // Prepopulated users matching the Flutter code
  const [users, setUsers] = useState<Record<string, string>>({
    'dribbble@gmail.com': '12345',
    'hunter@gmail.com': 'hunter',
  });

  // Prepopulated user profile details for dashboard experience
  const [userProfiles, setUserProfiles] = useState<Record<string, Partial<UserType>>>({
    'dribbble@gmail.com': {
      name: 'Dribbble Designer',
      role: 'Principal UI/UX Specialist',
      department: 'Creative Innovation Lab',
      company: 'M2-GLOBAL-SERVICESS',
    },
    'hunter@gmail.com': {
      name: 'Hunter Sterling',
      role: 'Lead Cybersecurity Threat Analyst',
      department: 'Enterprise Security Division',
      company: 'M2-GLOBAL-SERVICESS',
    },
  });

  const [mode, setMode] = useState<LoginMode>('login');
  
  // Form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Status and feedback
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Biometric Verification Simulation States
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scanMessage, setScanMessage] = useState('');
  const [tempAuthorizedUser, setTempAuthorizedUser] = useState<UserType | null>(null);

  // UTC Clock State
  const [currentTimeStr, setCurrentTimeStr] = useState('08.24.2024 — 14:02 UTC');

  useEffect(() => {
    // Update UTC time to feel authentic and dynamic
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      };
      const formatted = now.toLocaleString('en-US', options).replace(',', ' —') + ' UTC';
      setCurrentTimeStr(formatted);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Clear errors when changing modes
  useEffect(() => {
    setError(null);
    setSuccessMessage(null);
  }, [mode]);

  // Auth delay matching flutter_login duration (2250ms)
  const AUTH_DELAY = 1500;

  // Biometric fingerprint scanning simulator loop
  const triggerBiometricScan = (targetUser: UserType) => {
    setTempAuthorizedUser(targetUser);
    setIsBiometricScanning(true);
    setScanStatus('scanning');
    setScanProgress(0);
    setScanMessage('Calibrating optical laser scanner & locking terminal...');

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setScanProgress(100);
        setScanStatus('success');
        setScanMessage('Access authorized. Handshake complete.');
        
        // Grant final dashboard access after a satisfying brief delay
        setTimeout(() => {
          setIsBiometricScanning(false);
          onLoginSuccess(targetUser);
        }, 1200);
      } else {
        setScanProgress(progress);
        if (progress > 80) {
          setScanMessage('Verifying quantum authentication hashes...');
        } else if (progress > 50) {
          setScanMessage('Processing biometric ridge pattern matches...');
        } else if (progress > 25) {
          setScanMessage('Retrieving corporate database security profiles...');
        } else {
          setScanMessage('Calibrating optical laser scanner & locking terminal...');
        }
      }
    }, 120);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Securing tunnel & validating credentials...');

    setTimeout(() => {
      const storedPassword = users[email.toLowerCase().trim()];
      if (!storedPassword) {
        setError('User not exists');
        setIsLoading(false);
        return;
      }

      if (storedPassword !== password) {
        setError('Password does not match');
        setIsLoading(false);
        return;
      }

      // Successful first-stage login, now trigger Framer Motion biometric verification
      const profile = userProfiles[email.toLowerCase().trim()] || {
        name: email.split('@')[0].toUpperCase(),
        role: 'Corporate Officer',
        department: 'General Operations',
        company: 'M2-GLOBAL-SERVICESS',
      };

      const completeUser: UserType = {
        email: email.toLowerCase().trim(),
        name: profile.name || 'M2-GLOBAL-SERVICESS Employee',
        role: profile.role || 'Associate',
        department: profile.department || 'General Division',
        company: 'M2-GLOBAL-SERVICESS',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };

      setIsLoading(false);
      triggerBiometricScan(completeUser);
    }, AUTH_DELAY);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email address is required.');
      return;
    }
    if (!name) {
      setError('Please enter your full name.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (password.length < 5) {
      setError('Password must be at least 5 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Registering global corporate directory records...');

    setTimeout(() => {
      const emailLower = email.toLowerCase().trim();
      
      if (users[emailLower]) {
        setError('Account already exists for this email address.');
        setIsLoading(false);
        return;
      }

      // Add user credentials and profile
      setUsers(prev => ({
        ...prev,
        [emailLower]: password
      }));

      setUserProfiles(prev => ({
        ...prev,
        [emailLower]: {
          name: name,
          role: 'Newly Appointed Associate',
          department: 'Executive Development Branch',
          company: 'M2-GLOBAL-SERVICESS'
        }
      }));

      setIsLoading(false);
      setSuccessMessage('Registration successful! You can now log in.');
      // Switch back to login
      setTimeout(() => {
        setMode('login');
        setPassword('');
        setConfirmPassword('');
      }, 1500);
    }, AUTH_DELAY);
  };

  const handleRecoverPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email) {
      setError('Please enter your email address to recover.');
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Locating security nodes and generating token...');

    setTimeout(() => {
      const emailLower = email.toLowerCase().trim();
      if (!users[emailLower]) {
        setError('User not exists');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      const maskedEmail = emailLower.charAt(0) + '******' + emailLower.substring(emailLower.indexOf('@'));
      setSuccessMessage(`Recovery link successfully dispatched to ${maskedEmail}`);
    }, AUTH_DELAY);
  };

  const handleSocialLogin = (provider: string) => {
    setError(null);
    setIsLoading(true);
    setLoadingMessage(`Redirecting to secure ${provider} handshaking gateway...`);

    setTimeout(() => {
      // Social login triggers successful access
      const socialEmail = `${provider.toLowerCase()}@m2global.com`;
      const socialUser: UserType = {
        email: socialEmail,
        name: `${provider} Certified Enterprise`,
        role: 'Verified External Partner',
        department: `${provider} Enterprise Integration`,
        company: 'M2-GLOBAL-SERVICESS',
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };

      setIsLoading(false);
      // Trigger satisfying fingerprint verification for social logins as well!
      triggerBiometricScan(socialUser);
    }, AUTH_DELAY);
  };

  const handleBypassBypass = (selectedUser: 'dribbble' | 'hunter') => {
    const selectedEmail = selectedUser === 'dribbble' ? 'dribbble@gmail.com' : 'hunter@gmail.com';
    const profile = userProfiles[selectedEmail];
    
    const completeUser: UserType = {
      email: selectedEmail,
      name: profile.name || 'M2-GLOBAL-SERVICESS Employee',
      role: profile.role || 'Associate',
      department: profile.department || 'General Division',
      company: 'M2-GLOBAL-SERVICESS',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    triggerBiometricScan(completeUser);
  };

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div id="login-screen-container" className={`relative w-full min-h-screen ${currentThemeObj.bg} text-slate-100 flex flex-col font-sans overflow-hidden transition-all duration-500`}>
      
      {/* Immersive Atmospheric Background Elements */}
      <div className={`absolute top-[-200px] left-[-200px] w-[600px] h-[600px] ${currentThemeObj.glowBg1} rounded-full blur-[120px] pointer-events-none transition-all duration-700`}></div>
      <div className={`absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] ${currentThemeObj.glowBg2} rounded-full blur-[100px] pointer-events-none transition-all duration-700`}></div>
      
      {/* Dynamic interactive grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Corporate Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-6 md:px-12 py-6 md:py-8 z-10 w-full max-w-7xl mx-auto gap-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-tr ${currentThemeObj.primaryColor} rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]`}>
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white font-display">M2-GLOBAL-SERVICESS</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-[10px] md:text-xs font-medium tracking-widest text-slate-400 font-mono">
          {/* Quick theme selector dots */}
          <div className="flex items-center gap-1.5 border border-white/10 bg-white/[0.02] p-1.5 rounded-lg">
            <Paintbrush className="w-3.5 h-3.5 opacity-50 mr-0.5 text-white" />
            {THEMES.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                  theme === t.id ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.accentHex }}
                title={`Switch to ${t.name}`}
              />
            ))}
          </div>
          
          <span className="hidden sm:inline w-px h-4 bg-slate-800"></span>
          <span className="hidden sm:inline">THEME: <span className="text-white font-bold uppercase">{currentThemeObj.name}</span></span>
          <span className="hidden sm:inline w-px h-4 bg-slate-800"></span>
          <span className="hidden sm:inline">SYSTEM STATUS: <span className={`${currentThemeObj.accentClass} font-bold`}>OPTIMAL</span></span>
          <span className="hidden sm:inline w-px h-4 bg-slate-800"></span>
          <span>{currentTimeStr}</span>
        </div>
      </header>

      {/* Main Responsive Grid Container */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 md:px-12 py-8 w-full max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Dynamic Brand Message (from Immersive UI theme design) */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-left"
          >
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${currentThemeObj.badgeClass} font-mono text-[10px] tracking-widest uppercase`}>
              <span className={`h-1.5 w-1.5 rounded-full ${currentThemeObj.activeDot} animate-pulse`} />
              Standardized Corporate System
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white font-display tracking-tight">
              M2-VALIDATION-<br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentThemeObj.primaryColor}`}>
                HUP-CENTER.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-400 max-w-md leading-relaxed">
              Secure your assets with the world's most advanced encrypted infrastructure. Welcome back to the standard.
            </p>
            
            {/* Hardcoded stats showing precision and performance */}
            <div className="pt-6 flex space-x-8">
              <div className={`border-l-2 ${currentThemeObj.borderAccent} pl-4 py-1`}>
                <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-wider">99.9%</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">Uptime</div>
              </div>
              <div className={`border-l-2 ${currentThemeObj.borderAccent} pl-4 py-1`}>
                <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-wider">256-bit</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">Encryption</div>
              </div>
              <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <div className="text-2xl sm:text-3xl font-black text-white font-display tracking-wider">Multi-Bio</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">Identity</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Login Card (styled directly per Immersive UI style guidelines) */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white/[0.02] border border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 shadow-2xl relative group overflow-hidden"
            >
              {/* Futuristic Top highlight line */}
              <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              
              <AnimatePresence mode="wait">
                
                {/* 1. BIOMETRIC SCANNING OVERLAY VIEW (Framer Motion Fingerprint scan) */}
                {isBiometricScanning ? (
                  <motion.div
                    key="biometric-scanner"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center py-6 text-center"
                  >
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase tracking-widest">
                        <Shield className="w-3.5 h-3.5" />
                        Stage 2: Biometric Handshake
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Biometric Verification</h2>
                    <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-normal">
                      Security policy demands secondary verification. Please wait while the optical scanner completes verification.
                    </p>

                    {/* Highly Animated Scanner container */}
                    <div className="relative my-8 w-44 h-44 rounded-2xl border border-white/5 bg-slate-950/40 flex items-center justify-center overflow-hidden shadow-inner shadow-cyan-900/10 group/scanner">
                      
                      {/* Grid background on scanner stage */}
                      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
                      
                      {/* Pulse circle rings */}
                      <motion.div
                        className="absolute w-36 h-36 rounded-full border border-cyan-500/20 bg-cyan-500/5"
                        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        className="absolute w-24 h-24 rounded-full border border-blue-500/10"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                      />

                      {/* Fingerprint Vector */}
                      <div className="relative z-10 p-5 rounded-full border border-white/5 bg-slate-900/30">
                        <Fingerprint 
                          className={`w-16 h-16 transition-colors duration-500 ${
                            scanStatus === 'success' ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]' : 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                          }`} 
                        />
                      </div>

                      {/* Moving Laser Sweep Line */}
                      {scanStatus === 'scanning' && (
                        <motion.div 
                          className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9),0_0_4px_rgba(34,211,238,0.5)] z-20"
                          animate={{ top: ['4%', '96%', '4%'] }}
                          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        />
                      )}

                      {/* Absolute overlay when success occurs */}
                      {scanStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-emerald-950/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center text-emerald-400"
                        >
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                            <Check className="w-6 h-6 stroke-[3]" />
                          </div>
                          <span className="font-mono text-xs font-bold uppercase tracking-wider">SECURE LINK OK</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Progress textual labels */}
                    <div className="w-full max-w-[280px]">
                      <div className="flex justify-between items-center text-[11px] font-mono font-semibold tracking-wider text-slate-400 mb-1.5">
                        <span className="uppercase">{scanStatus === 'success' ? 'DECRYPTION SOLVED' : 'SCAN COMPILING'}</span>
                        <span className={scanStatus === 'success' ? 'text-emerald-400 font-bold' : 'text-cyan-400'}>{scanProgress}%</span>
                      </div>
                      
                      {/* Small progress meter track */}
                      <div className="h-1.5 w-full rounded-full bg-slate-900 border border-white/5 overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r transition-all duration-100 ${
                            scanStatus === 'success' ? 'from-emerald-500 to-teal-400' : 'from-cyan-500 to-blue-500'
                          }`}
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>

                      <p className="mt-4 text-xs font-mono font-medium tracking-wide text-slate-400 h-8 flex items-center justify-center">
                        {scanMessage}
                      </p>
                    </div>
                  </motion.div>
                ) : isLoading ? (
                  
                  /* 2. FIRST STAGE VALIDATION LOADER (matching credentials verify delay) */
                  <motion.div
                    key="auth-gateway-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="relative mb-6 flex h-16 w-16 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-900" />
                      <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
                    </div>
                    <p className="text-sm text-slate-200 font-medium font-display tracking-wide">{loadingMessage}</p>
                    <p className="mt-2 text-[10px] text-slate-500 font-mono tracking-widest uppercase">TUNNEL LATENCY ACTIVE</p>
                  </motion.div>
                ) : (
                  
                  /* 3. CORE LOGIN/SIGNUP FORM VIEWS */
                  <motion.div
                    key="auth-forms"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    
                    {/* Error Alerts */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-rose-400"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="text-xs font-medium leading-relaxed">{error}</div>
                      </motion.div>
                    )}

                    {/* Success Alerts */}
                    {successMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-400"
                      >
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div className="text-xs font-medium leading-relaxed">{successMessage}</div>
                      </motion.div>
                    )}

                    {/* Dynamic Header Titles based on mode */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white font-display">
                        {mode === 'login' ? 'Account Login' : mode === 'signup' ? 'Create Corporate Identity' : 'Identity Override'}
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        {mode === 'login' ? 'Enter your credentials to connect.' : mode === 'signup' ? 'Declare details on corporate ledger.' : 'Initiate secure password override.'}
                      </p>
                    </div>

                    {/* Login Form */}
                    {mode === 'login' && (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="dribbble@gmail.com"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} focus:ring-1 focus:ring-white/10 transition-all placeholder:text-slate-700`}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 px-1">
                            Presets: <span className={`font-mono ${currentThemeObj.accentClass}/80`}>dribbble@gmail.com</span> or <span className={`font-mono ${currentThemeObj.accentClass}/80`}>hunter@gmail.com</span>
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-end px-1">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                              Password
                            </label>
                            <button
                              type="button"
                              onClick={() => setMode('recover')}
                              className={`text-[10px] ${currentThemeObj.accentClass} hover:opacity-85 transition-colors uppercase font-bold tracking-wider`}
                            >
                              Forgot?
                            </button>
                          </div>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <Lock className="w-4 h-4" />
                            </span>
                            <input
                              type="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} focus:ring-1 focus:ring-white/10 transition-all placeholder:text-slate-700`}
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 px-1">
                            Passwords: <span className={`font-mono ${currentThemeObj.accentClass}/80`}>12345</span> / <span className={`font-mono ${currentThemeObj.accentClass}/80`}>hunter</span>
                          </p>
                        </div>

                        {/* Fingerprint bypass indicators next to forms */}
                        <div className="pt-2 flex flex-col gap-2">
                          <button
                            type="submit"
                            className={`w-full bg-gradient-to-r ${currentThemeObj.buttonBg} text-white font-bold py-3.5 rounded-xl shadow-lg ${currentThemeObj.shadowClass} transition-all transform active:scale-[0.98]`}
                          >
                            Access Secure Portal
                          </button>

                          {/* Quick Biometric Bypass Selector */}
                          <div className="mt-3 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                            <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-slate-500 uppercase font-bold">
                              <Fingerprint className={`w-3.5 h-3.5 ${currentThemeObj.accentClass}`} />
                              Simulated Biometric Bypass
                            </div>
                            <button
                              type="button"
                              onClick={() => handleBypassBypass('hunter')}
                              className="w-full text-xs font-bold py-2.5 px-3 border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900 rounded-lg hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-wider cursor-pointer"
                            >
                              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                              BIOMETRIC FINGERPRINT SCAN
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-center text-xs mt-4">
                          <span className="text-slate-400">New to M2-GLOBAL-SERVICESS?</span>
                          <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className={`ml-1.5 font-bold ${currentThemeObj.accentClass} hover:opacity-80 transition-colors`}
                          >
                            Create Account
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Registration Form */}
                    {mode === 'signup' && (
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">
                            Full Corporate Name
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} transition-all placeholder:text-slate-700`}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@gmail.com"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} transition-all placeholder:text-slate-700`}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">
                            Identity Password
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <Lock className="w-4 h-4" />
                            </span>
                            <input
                              type="password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="At least 5 characters"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} transition-all placeholder:text-slate-700`}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <KeyRound className="w-4 h-4" />
                            </span>
                            <input
                              type="password"
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm your password"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} transition-all placeholder:text-slate-700`}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className={`w-full mt-2 bg-gradient-to-r ${currentThemeObj.buttonBg} text-white font-bold py-3.5 rounded-xl shadow-lg ${currentThemeObj.shadowClass} transition-all transform active:scale-[0.98]`}
                        >
                          Register Account
                        </button>

                        <div className="flex justify-center text-xs mt-4">
                          <span className="text-slate-400">Already registered?</span>
                          <button
                            type="button"
                            onClick={() => setMode('login')}
                            className={`ml-1.5 font-bold ${currentThemeObj.accentClass} hover:opacity-80 transition-colors`}
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Password Recovery Form */}
                    {mode === 'recover' && (
                      <form onSubmit={handleRecoverPassword} className="space-y-4">
                        <div className="rounded-xl border border-white/5 bg-slate-900/40 p-4 text-slate-400">
                          <p className="text-xs leading-relaxed">
                            Enter your registered email address below. If an associated identity profile is recovered, a remote override link will be generated.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 ml-1">
                            Registered Email Address
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-600">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="name@gmail.com"
                              className={`w-full bg-slate-900/40 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-200 outline-none focus:${currentThemeObj.borderClass} transition-all placeholder:text-slate-700`}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className={`w-full bg-gradient-to-r ${currentThemeObj.buttonBg} text-white font-bold py-3.5 rounded-xl shadow-lg ${currentThemeObj.shadowClass} transition-all`}
                        >
                          Recover Identity
                        </button>

                        <div className="flex justify-center text-xs mt-4">
                          <button
                            type="button"
                            onClick={() => setMode('login')}
                            className="font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-wider text-[10px]"
                          >
                            Back to Sign In
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Social Authorized Gateways */}
                    {mode === 'login' && (
                      <div className="mt-6 border-t border-white/5 pt-5">
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest mb-4">
                          <span className="bg-[#020408] px-2 text-slate-500 font-bold font-mono">
                            or authorize partner gateways
                          </span>
                        </div>

                        <div className="flex justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => handleSocialLogin('Google')}
                            className="flex-1 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
                            title="Authorize Google Sign-In"
                          >
                            <GoogleIcon />
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => handleSocialLogin('Facebook')}
                            className="flex-1 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 text-blue-500 transition-colors"
                            title="Authorize Facebook Sign-In"
                          >
                            <Facebook className="w-5 h-5 fill-current" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSocialLogin('LinkedIn')}
                            className="flex-1 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 text-cyan-400 transition-colors"
                            title="Authorize LinkedIn Sign-In"
                          >
                            <Linkedin className="w-5 h-5 fill-current" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleSocialLogin('GitHub')}
                            className="flex-1 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/10 text-slate-400 transition-colors"
                            title="Authorize GitHub Sign-In"
                          >
                            <Github className="w-5 h-5 fill-current" />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Immersive Footer */}
      <footer className="px-6 md:px-12 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-slate-600 uppercase font-medium z-10 w-full max-w-7xl mx-auto border-t border-white/5 mt-auto gap-4">
        <div className="flex space-x-6 font-mono">
          <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Encrypted Support</a>
        </div>
        <div className="font-mono">© 2026 M2-GLOBAL-SERVICESS. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
}
