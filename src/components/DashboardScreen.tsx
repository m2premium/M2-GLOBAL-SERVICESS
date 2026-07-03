import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, ShieldAlert, Cpu, Network, TrendingUp, TrendingDown, DollarSign, 
  Plus, Calendar, CheckCircle2, CircleDot, RefreshCw, Layers, Sparkles, Filter, ShieldCheck, Clock
} from 'lucide-react';
import { User, Transaction, Project } from '../types';

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardScreen({ user, onLogout }: DashboardScreenProps) {
  // Initialize sample transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-1042', title: 'Global Server Ingress Billing', date: '2026-06-30', amount: 14500.00, type: 'debit', status: 'completed', category: 'Infrastructure' },
    { id: 'TX-1043', title: 'Asset Injection - Dribbble Lab', date: '2026-06-29', amount: 8200.00, type: 'credit', status: 'completed', category: 'R&D' },
    { id: 'TX-1044', title: 'Firewall Node Encryption Sync', date: '2026-06-28', amount: 4300.00, type: 'debit', status: 'completed', category: 'Security' },
    { id: 'TX-1045', title: 'Venture Capital Dividend Retainer', date: '2026-06-27', amount: 95000.00, type: 'credit', status: 'completed', category: 'Corporate Finance' },
    { id: 'TX-1046', title: 'Quantum Security Core Upgrade', date: '2026-06-25', amount: 31200.00, type: 'debit', status: 'pending', category: 'Security' },
  ]);

  // Initialize sample projects
  const [projects, setProjects] = useState<Project[]>([
    { id: 'PRJ-801', name: 'UI Revolution 3.0', progress: 84, status: 'Active', teamSize: 6, budget: '$250,000', category: 'Creative' },
    { id: 'PRJ-802', name: 'Quantum Crypto Shield', progress: 92, status: 'Active', teamSize: 9, budget: '$1.2M', category: 'Security' },
    { id: 'PRJ-803', name: 'Neural Marketing Agent', progress: 45, status: 'Planning', teamSize: 4, budget: '$180,000', category: 'Marketing' },
    { id: 'PRJ-804', name: 'Distributed Ledger Sync', progress: 100, status: 'Completed', teamSize: 12, budget: '$600,000', category: 'Finance' },
  ]);

  // Form states for adding a new transaction
  const [showAddTx, setShowAddTx] = useState(false);
  const [newTxTitle, setNewTxTitle] = useState('');
  const [newTxAmount, setNewTxAmount] = useState('');
  const [newTxType, setNewTxType] = useState<'credit' | 'debit'>('credit');
  const [newTxCategory, setNewTxCategory] = useState('Infrastructure');

  // Ledger Filter states
  const [txFilter, setTxFilter] = useState<'all' | 'credit' | 'debit'>('all');

  // System statistics simulations
  const [networkPing, setNetworkPing] = useState(14);
  const [shieldIntegrity, setShieldIntegrity] = useState(99.98);

  // Periodically fluctuate system stats to feel alive!
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNetworkPing(prev => Math.max(8, Math.min(22, prev + (Math.random() > 0.5 ? 1 : -1))));
      setShieldIntegrity(prev => Math.max(99.4, Math.min(100, prev + (Math.random() > 0.6 ? 0.01 : -0.01))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Compute stats based on transactions
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      if (tx.status === 'failed') return acc;
      return tx.type === 'credit' ? acc + tx.amount : acc - tx.amount;
    }, 150000); // 150K initial reservoir
  }, [transactions]);

  const creditTotal = useMemo(() => {
    return transactions
      .filter(tx => tx.type === 'credit' && tx.status === 'completed')
      .reduce((acc, tx) => acc + tx.amount, 0);
  }, [transactions]);

  const debitTotal = useMemo(() => {
    return transactions
      .filter(tx => tx.type === 'debit' && tx.status === 'completed')
      .reduce((acc, tx) => acc + tx.amount, 0);
  }, [transactions]);

  // Contextual Greetings and specific details based on user
  const userContextInfo = useMemo(() => {
    const isHunter = user.email.toLowerCase() === 'hunter@gmail.com';
    const isDribbble = user.email.toLowerCase() === 'dribbble@gmail.com';

    if (isHunter) {
      return {
        bannerMessage: 'Enterprise Security Dashboard • Defensive Core is ONLINE',
        heroTag: 'Security Chief Console',
        accentColor: 'from-blue-600 to-cyan-500',
        badge: 'SEC-LEVEL 5 CLEARANCE',
        customStatTitle: 'Threats Deflected',
        customStatValue: '14,204',
        customStatSub: 'Quantum intrusion shields stabilized',
        widgetTitle: 'Security System Core Feed'
      };
    } else if (isDribbble) {
      return {
        bannerMessage: 'Creative Catalyst Dashboard • Brand assets finalized',
        heroTag: 'Principal Design Console',
        accentColor: 'from-violet-600 to-m2-500',
        badge: 'CREATIVE DIRECTOR',
        customStatTitle: 'Submissions Live',
        customStatValue: '184',
        customStatSub: '99.4% user satisfaction review',
        widgetTitle: 'Active Design System Audits'
      };
    } else {
      return {
        bannerMessage: 'Enterprise Associate Dashboard • Portal Synced',
        heroTag: 'General Workspace Portal',
        accentColor: 'from-m2-600 to-blue-500',
        badge: 'ASSOCIATE IDENTITY',
        customStatTitle: 'System Task Force',
        customStatValue: '32',
        customStatSub: 'All personal workspace goals on track',
        widgetTitle: 'Global Task Overview'
      };
    }
  }, [user]);

  // Handles appending a new transaction to the ledger
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTxTitle || !newTxAmount) return;

    const amountNum = parseFloat(newTxAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTxTitle,
      date: new Date().toISOString().split('T')[0],
      amount: amountNum,
      type: newTxType,
      status: 'completed',
      category: newTxCategory,
    };

    setTransactions(prev => [newTx, ...prev]);
    setNewTxTitle('');
    setNewTxAmount('');
    setShowAddTx(false);
  };

  // Toggle project progress for interactivity
  const handleUpdateProgress = (projId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        const nextProgress = p.progress >= 100 ? 0 : Math.min(100, p.progress + 10);
        return {
          ...p,
          progress: nextProgress,
          status: nextProgress === 100 ? 'Completed' : 'Active'
        };
      }
      return p;
    }));
  };

  // Filtered list of transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (txFilter === 'all') return true;
      return tx.type === txFilter;
    });
  }, [transactions, txFilter]);

  // Multi-color user avatars
  const avatarBg = useMemo(() => {
    if (user.email.toLowerCase() === 'hunter@gmail.com') return 'bg-cyan-500';
    if (user.email.toLowerCase() === 'dribbble@gmail.com') return 'bg-violet-500';
    return 'bg-m2-500';
  }, [user]);

  // Simple clean SVG line path coordinate generator for dashboard charts
  const svgLineCoordinates = useMemo(() => {
    // Standardize coordinates for a visual trendline based on current balances
    const dataPoints = [30, 45, 35, 60, 50, 85, 75, 100];
    return dataPoints.map((point, index) => {
      const x = (index / (dataPoints.length - 1)) * 360 + 20;
      const y = 110 - (point * 0.8);
      return `${x},${y}`;
    }).join(' ');
  }, []);

  return (
    <div id="dashboard-container" className="relative min-h-screen bg-[#020408] text-slate-100 font-sans overflow-hidden">
      
      {/* Immersive Atmospheric Background Elements */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-cyan-950/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Dynamic interactive grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Dynamic Header / Navigation bar */}
      <header className="sticky top-0 z-40 border-b border-white/15 bg-[#020408]/80 backdrop-blur-md relative">
        <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-m2-600 to-cyan-400 p-[1.5px]">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                  <svg className="w-5 h-5 text-m2-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 5 10-5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  M2-GLOBAL-SERVICESS
                </span>
                <span className="ml-1.5 text-[9px] font-mono tracking-widest text-m2-400 border border-m2-500/20 px-1.5 py-0.5 rounded-full bg-m2-500/5">
                  CORE-STABLE
                </span>
              </div>
            </div>

            {/* Quick stats banner (middle) */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-m2-400" />
                <span>LATENCY: <strong className="text-white">{networkPing}ms</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>SHIELD INTEGRITY: <strong className="text-emerald-400">{shieldIntegrity.toFixed(2)}%</strong></span>
              </div>
            </div>

            {/* Logged in identity card & Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <h4 className="text-sm font-semibold text-white leading-tight">{user.name}</h4>
                <p className="text-[10px] text-slate-400 font-mono tracking-wide">{userContextInfo.badge}</p>
              </div>

              {/* Avatar circle */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${avatarBg} text-white font-bold text-sm shadow-md shadow-slate-900`}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center justify-center p-2.5 rounded-xl border border-slate-900 bg-slate-950 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
                title="Secure Disconnect"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner Alert Ribbon */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-m2-500/10 text-m2-400 border border-m2-500/20">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                {userContextInfo.bannerMessage}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Global identity node verified at <span className="font-mono text-slate-300">SYSTEM-HOST_7709</span>. All session logs audit-trail active.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-slate-400 bg-slate-950 border border-slate-900 py-1 px-3 rounded-full shrink-0 w-fit self-start sm:self-auto">
            <Clock className="w-3 h-3 text-m2-400" />
            <span>SESSION RUNTIME: UTC</span>
          </div>
        </div>

        {/* Core Stats Overview Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Reservoirs: Total Portfolio */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Portfolio Capital</span>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-mono flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">+12.4%</span> vs baseline target
              </p>
            </div>
          </div>

          {/* Reservoirs: Inflow Ledger */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Secured Inflow</span>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white">
                ${creditTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-mono">
                Corporate capital pipelines verified
              </p>
            </div>
          </div>

          {/* Reservoirs: Outflow Ledger */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Committed Outflow</span>
              <div className="rounded-lg bg-rose-500/10 p-2 text-rose-400 border border-rose-500/20">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white">
                ${debitTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h3>
              <p className="mt-1 text-xs text-slate-500 font-mono">
                System expenses & routing nodes
              </p>
            </div>
          </div>

          {/* Custom Dynamic Role-Based Card */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {userContextInfo.customStatTitle}
              </span>
              <div className="rounded-lg bg-m2-500/10 p-2 text-m2-400 border border-m2-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white">
                {userContextInfo.customStatValue}
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-normal">
                {userContextInfo.customStatSub}
              </p>
            </div>
          </div>

        </div>

        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: Interactive Project Matrix and Analytics (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive SVG Chart Card */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">Corporate Cash Trend & Yield</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Real-time ledger projection model</p>
                </div>
                <span className="text-xs font-mono text-m2-400 bg-m2-500/5 px-2.5 py-1 rounded-lg border border-m2-500/20">
                  AUTO-UPDATE ACTIVE
                </span>
              </div>

              {/* Graphic custom SVG Line chart */}
              <div className="relative h-48 w-full bg-slate-900/20 rounded-2xl border border-slate-900 overflow-hidden flex items-end">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                
                {/* Visual Chart Grid Lines */}
                <div className="absolute inset-0 grid grid-rows-4 opacity-5 pointer-events-none">
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                  <div className="border-b border-white" />
                </div>

                {/* SVG Polyline with high-end glows */}
                <svg className="absolute inset-0 w-full h-full z-20" viewBox="0 0 400 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0e8dec" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0e8dec" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Fill Area */}
                  <path
                    d={`M20,110 L${svgLineCoordinates} L380,110 Z`}
                    fill="url(#chart-glow)"
                    className="transition-all duration-700"
                  />
                  
                  {/* Outer Stroke line */}
                  <polyline
                    fill="none"
                    stroke="#38a8f9"
                    strokeWidth="3"
                    points={svgLineCoordinates}
                    className="transition-all duration-700 drop-shadow-[0_2px_8px_rgba(56,168,249,0.5)]"
                  />
                  
                  {/* Individual joint dots */}
                  {svgLineCoordinates.split(' ').map((coord, i) => {
                    const [x, y] = coord.split(',');
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill="#ffffff"
                        stroke="#026fc6"
                        strokeWidth="1.5"
                        className="hover:scale-150 transition-transform cursor-pointer"
                      />
                    );
                  })}
                </svg>

                {/* Floating tooltips */}
                <div className="absolute bottom-3 left-4 z-30 font-mono text-[9px] text-slate-500">
                  Q2 BASELINE RECORD
                </div>
                <div className="absolute bottom-3 right-4 z-30 font-mono text-[9px] text-m2-400 font-bold">
                  Q3 PRE-SYNCHRONIZED TARGET
                </div>
              </div>
            </div>

            {/* Interactive Projects Panel */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">Active Project Pipelines</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Click any record to cycle/augment milestones</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-400">4 HOSTED INJECTORS</span>
                </div>
              </div>

              <div className="grid gap-4">
                {projects.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => handleUpdateProgress(project.id)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/10 p-5 hover:bg-slate-900/30 hover:border-slate-800 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold text-slate-500">{project.id}</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-m2-400 transition-colors">{project.name}</h4>
                        <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md text-slate-400">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400">Budget: <strong className="text-white">{project.budget}</strong></span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          project.status === 'Active' ? 'bg-m2-500/10 text-m2-400 border border-m2-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress slider bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                        <span className="text-slate-500">Pipeline Progression</span>
                        <span className="text-white font-bold">{project.progress}%</span>
                      </div>
                      <div className="relative h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-m2-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Ledger Logs & Add Transaction (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Ledger Transactions Container */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-5">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">Corporate Ledger</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Secure ledger record logs</p>
                </div>
                
                {/* Ledger actions (Add transaction trigger) */}
                <button
                  onClick={() => setShowAddTx(!showAddTx)}
                  className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-m2-600 hover:bg-m2-500 py-2 px-3.5 text-xs font-bold text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Record Flow
                </button>
              </div>

              {/* Add Transaction Form Panel */}
              <AnimatePresence>
                {showAddTx && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleAddTransaction}
                    className="overflow-hidden border border-slate-900 bg-slate-900/20 rounded-2xl p-4 space-y-3.5"
                  >
                    <h4 className="text-xs font-bold uppercase tracking-wider text-m2-400">Append New Balance Entry</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Entry Title</label>
                        <input
                          type="text"
                          required
                          value={newTxTitle}
                          onChange={(e) => setNewTxTitle(e.target.value)}
                          placeholder="e.g. Asset Purchase"
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-m2-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Amount ($)</label>
                        <input
                          type="number"
                          required
                          min="1"
                          step="0.01"
                          value={newTxAmount}
                          onChange={(e) => setNewTxAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-600 outline-none focus:border-m2-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Entry Type</label>
                        <select
                          value={newTxType}
                          onChange={(e) => setNewTxType(e.target.value as 'credit' | 'debit')}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-m2-500"
                        >
                          <option value="credit">Capital Inflow (Credit)</option>
                          <option value="debit">Expense Outflow (Debit)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category</label>
                        <select
                          value={newTxCategory}
                          onChange={(e) => setNewTxCategory(e.target.value)}
                          className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white outline-none focus:border-m2-500"
                        >
                          <option value="Infrastructure">Infrastructure</option>
                          <option value="Security">Security</option>
                          <option value="Creative">Creative Development</option>
                          <option value="Capital Injection">Capital Injection</option>
                          <option value="R&D">Research & Dev</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddTx(false)}
                        className="rounded-lg border border-slate-800 hover:bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-400"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-m2-500 hover:bg-m2-600 px-4 py-1.5 text-xs font-bold text-white shadow"
                      >
                        Commit Record
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setTxFilter('all')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      txFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setTxFilter('credit')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      txFilter === 'credit' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Inflow
                  </button>
                  <button
                    onClick={() => setTxFilter('debit')}
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                      txFilter === 'debit' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Outflow
                  </button>
                </div>
              </div>

              {/* Transactions Ledger List */}
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredTransactions.map((tx) => (
                  <div 
                    key={tx.id} 
                    className="flex items-center justify-between gap-4 p-3 rounded-xl border border-slate-900 bg-slate-900/5 hover:bg-slate-900/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                        tx.type === 'credit' 
                          ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' 
                          : 'bg-rose-500/5 text-rose-400 border-rose-500/10'
                      }`}>
                        {tx.type === 'credit' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{tx.title}</h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[9px] text-slate-500">{tx.id}</span>
                          <span className="h-1 w-1 rounded-full bg-slate-800" />
                          <span className="text-[10px] text-slate-400">{tx.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-xs font-bold font-mono ${tx.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">{tx.date}</span>
                    </div>
                  </div>
                ))}

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-xs font-mono">
                    NO TRANSACTIONS DECLARED UNDER THIS VIEW
                  </div>
                )}
              </div>

            </div>

            {/* Contextual Widget for the User's Role */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-white tracking-wide">
                {userContextInfo.widgetTitle}
              </h3>

              {user.email.toLowerCase() === 'hunter@gmail.com' ? (
                /* Hunter specific security modules */
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-emerald-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>GATEWAY PROTOCOL V4</span>
                    </div>
                    <span className="font-bold">SHIELDED</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-emerald-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>MAIN SYNC INTRUSION BUFFER</span>
                    </div>
                    <span className="font-bold">ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-amber-500/10 bg-amber-500/5 text-amber-400">
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4 animate-pulse" />
                      <span>FIREWALL AUDIT NODE #088</span>
                    </div>
                    <span className="font-bold">RE-SYNCHRONIZING</span>
                  </div>
                </div>
              ) : user.email.toLowerCase() === 'dribbble@gmail.com' ? (
                /* Dribbble specific design modules */
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-500/10 bg-emerald-500/5 text-emerald-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>BRAND DESIGN SYSTEM COMPONENT V3</span>
                    </div>
                    <span className="font-bold">APPROVED</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-m2-500/10 bg-m2-500/5 text-m2-400">
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-4 h-4" />
                      <span>M2 LIGHTBLUE PALETTE HEX</span>
                    </div>
                    <span className="font-bold">#38A8F9</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-violet-500/10 bg-violet-500/5 text-violet-400">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>UI STAGE ASSET GENERATOR</span>
                    </div>
                    <span className="font-bold">UPDATING</span>
                  </div>
                </div>
              ) : (
                /* Standard guest / employee details */
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-900 bg-slate-900/50 text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>ONBOARDING RECORDS SECURED</span>
                    </div>
                    <span>COMPLETE</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-900 bg-slate-900/50 text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>GLOBAL ENTERPRISE SIGN-ON</span>
                    </div>
                    <span>ACTIVATED</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Corporate bottom credit line */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 text-center text-xs text-slate-600 font-mono tracking-widest">
        © 2026 M2-GLOBAL-SERVICESS. ALL QUANTUM VECTORS REGISTERED.
      </footer>

    </div>
  );
}
