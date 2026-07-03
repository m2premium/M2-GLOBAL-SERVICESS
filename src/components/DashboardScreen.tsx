import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, ShieldAlert, Cpu, Network, TrendingUp, TrendingDown, DollarSign, 
  Plus, Calendar, CheckCircle2, CircleDot, RefreshCw, Layers, Sparkles, Filter, ShieldCheck, Clock,
  Paintbrush, Edit3, Camera, UploadCloud, Check, Fingerprint, AlertCircle, Shield, X, Info,
  Smartphone, ArrowUpRight, Activity
} from 'lucide-react';
import { User, Transaction, Project } from '../types';
import { THEMES } from './LoginScreen';

const PRESET_AVATARS = [
  { name: 'Cyber Specialist', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { name: 'Lead Developer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { name: 'Principal UX Designer', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
  { name: 'Security Strategist', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
];

export interface ActiveUser {
  id: string;
  name: string;
  phone: string;
  network: 'MTN' | 'Airtel' | 'Glo' | '9mobile';
  airtimeBalance: number;
  validationsCount: number;
  revenueGenerated: number;
  lastActive: string;
  status: 'online' | 'offline';
}

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
  onUserUpdate: (updatedUser: User) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export default function DashboardScreen({ user, onLogout, onUserUpdate, theme, setTheme }: DashboardScreenProps) {
  // Initialize sample transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-1042', title: 'Global Server Ingress Billing', date: '2026-06-30', amount: 14500.00, type: 'debit', status: 'completed', category: 'Infrastructure' },
    { id: 'TX-1043', title: 'Asset Injection - Dribbble Lab', date: '2026-06-29', amount: 8200.00, type: 'credit', status: 'completed', category: 'R&D' },
    { id: 'TX-1044', title: 'Firewall Node Encryption Sync', date: '2026-06-28', amount: 4300.00, type: 'debit', status: 'completed', category: 'Security' },
    { id: 'TX-1045', title: 'Venture Capital Dividend Retainer', date: '2026-06-27', amount: 95000.00, type: 'credit', status: 'completed', category: 'Corporate Finance' },
    { id: 'TX-1046', title: 'Quantum Security Core Upgrade', date: '2026-06-25', amount: 31200.00, type: 'debit', status: 'pending', category: 'Security' },
  ]);

  // Initialize sample active users with Nigerian details
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([
    { id: 'USR-701', name: 'Abubakar Ibrahim', phone: '08031234567', network: 'MTN', airtimeBalance: 3500, validationsCount: 12, revenueGenerated: 6000, lastActive: '2 mins ago', status: 'online' },
    { id: 'USR-702', name: 'Chidi Okafor', phone: '08159876543', network: 'Glo', airtimeBalance: 1200, validationsCount: 8, revenueGenerated: 4000, lastActive: 'Just now', status: 'online' },
    { id: 'USR-703', name: 'Amina Yusuf', phone: '09023456789', network: 'Airtel', airtimeBalance: 8500, validationsCount: 24, revenueGenerated: 12000, lastActive: '5 mins ago', status: 'online' },
    { id: 'USR-704', name: 'Olumide Balogun', phone: '08095551234', network: '9mobile', airtimeBalance: 400, validationsCount: 3, revenueGenerated: 1500, lastActive: '1 hr ago', status: 'offline' },
    { id: 'USR-705', name: 'Florence Danjuma', phone: '08134447777', network: 'MTN', airtimeBalance: 15000, validationsCount: 45, revenueGenerated: 22500, lastActive: 'Just now', status: 'online' },
  ]);

  // Settlement and Revenue States
  const [defaultAccountNo, setDefaultAccountNo] = useState('3115711063');
  const [defaultBankName, setDefaultBankName] = useState('First Bank');
  const [defaultAccountName, setDefaultAccountName] = useState('MANIRU MOHAMMAD');
  const [dailyRevenue, setDailyRevenue] = useState(48500); // in NGN
  const [totalConvertedAirtime, setTotalConvertedAirtime] = useState(132000); // in NGN
  const [validationFee, setValidationFee] = useState(500); // in NGN

  // State to hold selected phone number for current validation
  const [selectedPhoneForValidation, setSelectedPhoneForValidation] = useState('08031234567');
  const [isRegisteringPhoneForVal, setIsRegisteringPhoneForVal] = useState(false);
  const [tempRegName, setTempRegName] = useState('');
  const [tempRegPhone, setTempRegPhone] = useState('');
  const [tempRegNetwork, setTempRegNetwork] = useState<'MTN' | 'Airtel' | 'Glo' | '9mobile'>('MTN');
  const [tempRegAirtime, setTempRegAirtime] = useState('1500');

  // Interactive Live Credit Alerts list
  interface CreditAlert {
    id: string;
    phone: string;
    amount: number;
    timestamp: string;
  }
  const [liveCreditAlerts, setLiveCreditAlerts] = useState<CreditAlert[]>([
    { id: 'ALT-8891', phone: '08134447777', amount: 500, timestamp: '10 mins ago' },
    { id: 'ALT-8890', phone: '09023456789', amount: 500, timestamp: '24 mins ago' },
    { id: 'ALT-8889', phone: '08031234567', amount: 1000, timestamp: '45 mins ago' },
  ]);

  // Alert toast notification
  const [activeAlertNotification, setActiveAlertNotification] = useState<{
    show: boolean;
    phone: string;
    amount: number;
    accountNo: string;
    accountName: string;
    bank: string;
    reference: string;
  } | null>(null);

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

  // M2 Telecom Gateway Integration States (VTpass, Shago, Clubkonnect)
  const [selectedApiProvider, setSelectedApiProvider] = useState<string>('vtpass');
  const [apiMode, setApiMode] = useState<'sandbox' | 'production'>('production');
  const [apiKey, setApiKey] = useState('m2_live_pk_8a92b10fd4e3c68a9d8c2e171');

  // Developer security & Custom API variables
  const [isDeveloperVerified, setIsDeveloperVerified] = useState(false);
  const [devPassword, setDevPassword] = useState('');
  const [devError, setDevError] = useState('');
  const [customApis, setCustomApis] = useState<{ name: string; value: string }[]>([]);
  const [newApiName, setNewApiName] = useState('');
  const [showAddApiForm, setShowAddApiForm] = useState(false);

  interface ApiLogEntry {
    id: string;
    method: string;
    endpoint: string;
    status: number;
    latency: number;
    timestamp: string;
    requestPayload: any;
    responsePayload: any;
  }

  const [apiLogs, setApiLogs] = useState<ApiLogEntry[]>([
    {
      id: 'API-REQ-889',
      method: 'GET',
      endpoint: '/api/v1/gateway/status',
      status: 200,
      latency: 48,
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
      requestPayload: null,
      responsePayload: {
        status: "active",
        channels: ["MTN", "Airtel", "Glo", "9mobile"],
        bvn_registry: "online",
        nin_registry: "online",
        settlement_node: "First Bank (3115711063)"
      }
    }
  ]);

  const triggerApiLog = (method: string, endpoint: string, status: number, request: any, response: any) => {
    const newLog: ApiLogEntry = {
      id: 'API-REQ-' + Math.floor(100 + Math.random() * 900),
      method,
      endpoint,
      status,
      latency: Math.floor(60 + Math.random() * 110),
      timestamp: new Date().toLocaleTimeString(),
      requestPayload: request,
      responsePayload: response
    };
    setApiLogs(prev => [newLog, ...prev]);
  };

  // Periodically fluctuate system stats to feel alive!
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNetworkPing(prev => Math.max(8, Math.min(22, prev + (Math.random() > 0.5 ? 1 : -1))));
      setShieldIntegrity(prev => Math.max(99.4, Math.min(100, prev + (Math.random() > 0.6 ? 0.01 : -0.01))));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // User Profile Modal States
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState(user.name);
  const [profileCompany, setProfileCompany] = useState(user.company);
  const [profileRole, setProfileRole] = useState(user.role || 'Senior Director');
  const [profileDept, setProfileDept] = useState(user.department || 'Management');
  const [profileAvatarStyle, setProfileAvatarStyle] = useState<'pixel-art' | 'bottts' | 'adventurer' | 'lorelei'>('pixel-art');
  const [profileAvatarSeed, setProfileAvatarSeed] = useState(user.name);

  // Synchronize profile details when prop user is updated
  React.useEffect(() => {
    setProfileName(user.name);
    setProfileCompany(user.company);
    setProfileRole(user.role || 'Senior Director');
    setProfileDept(user.department || 'Management');
    setProfileAvatarSeed(user.avatarUrl ? '' : user.name);
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedAvatar = profileAvatarSeed 
      ? `https://api.dicebear.com/7.x/${profileAvatarStyle}/svg?seed=${encodeURIComponent(profileAvatarSeed)}`
      : user.avatarUrl;
    onUserUpdate({
      ...user,
      name: profileName,
      company: profileCompany,
      role: profileRole,
      department: profileDept,
      avatarUrl: generatedAvatar
    });
    setShowProfileModal(false);
  };

  // Validation States & Simulation Handlers
  const [activeValidationType, setActiveValidationType] = useState<'bvn' | 'nin' | 'account' | null>(null);
  const [validationInputValue, setValidationInputValue] = useState('');
  const [isValidationRunning, setIsValidationRunning] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationStatusMessage, setValidationStatusMessage] = useState('');
  const [validationSuccess, setValidationSuccess] = useState<boolean | null>(null);
  const [validationResultHash, setValidationResultHash] = useState('');

  const handleOpenValidation = (type: 'bvn' | 'nin' | 'account') => {
    setActiveValidationType(type);
    setValidationInputValue('');
    setIsValidationRunning(false);
    setValidationProgress(0);
    setValidationStatusMessage('READY FOR SECURE TRANSMISSION');
    setValidationSuccess(null);
    setValidationResultHash('');
    if (user.role === 'user' && user.phone) {
      setSelectedPhoneForValidation(user.phone);
    }
  };

  const startValidationSimulation = () => {
    if (!validationInputValue) return;

    // Zero-tax exemption applies if the user is a normal user OR matching their registered phone
    const isTaxExempt = (user.role === 'user') || (user.phone && selectedPhoneForValidation === user.phone);
    const effectiveFee = isTaxExempt ? 0 : validationFee;

    // Find the user being charged if not tax-exempt
    let chargingUser = null;
    if (!isTaxExempt) {
      chargingUser = activeUsers.find(u => u.phone === selectedPhoneForValidation);
      if (!chargingUser) {
        alert("Please select or register an active phone number for airtime deduction first.");
        return;
      }
      if (chargingUser.airtimeBalance < effectiveFee) {
        alert(`Insufficient airtime balance on ${selectedPhoneForValidation}! Standard fee is ₦${validationFee}. Please top up or select another registered phone.`);
        return;
      }
    }

    setIsValidationRunning(true);
    setValidationProgress(0);
    setValidationSuccess(null);

    const steps = [
      { progress: 15, msg: isTaxExempt ? `ZERO-TAX EXEMPTION DETECTED FOR PHONE ${user.phone || selectedPhoneForValidation}...` : `DEDUCTING ₦${effectiveFee}.00 AIRTIME FEE FROM ${selectedPhoneForValidation}...` },
      { progress: 40, msg: isTaxExempt ? `BYPASSING AIRTIME CHARGE • SECURE OVERRIDE GRANTED...` : `CONVERTING AIRTIME VALUE VIA M2 TELECOM LIQUIDITY GATEWAY...` },
      { progress: 70, msg: `ROUTING ZERO-TAX IDENTIFIER QUERY TO REGISTRY DIRECTORY...` },
      { progress: 90, msg: `WAITING FOR CENTRAL REGISTRY CRYPTOGRAPHIC HANDSHAKE...` },
      { progress: 100, msg: `COMPLETED • VERIFICATION COMPLIANT` },
    ];

    let currentStepIdx = 0;
    const interval = setInterval(() => {
      if (currentStepIdx < steps.length) {
        const currentProgress = steps[currentStepIdx].progress;
        setValidationProgress(currentProgress);
        setValidationStatusMessage(steps[currentStepIdx].msg);
        
        // At 40%, perform the state deduction if not tax-exempt
        if (currentProgress === 40 && !isTaxExempt) {
          setActiveUsers(prev => prev.map(u => {
            if (u.phone === selectedPhoneForValidation) {
              return {
                ...u,
                airtimeBalance: Math.max(0, u.airtimeBalance - effectiveFee),
                validationsCount: u.validationsCount + 1,
                revenueGenerated: u.revenueGenerated + effectiveFee
              };
            }
            return u;
          }));
        }
        
        currentStepIdx++;
      } else {
        clearInterval(interval);
        setIsValidationRunning(false);
        // Deem valid if length matches standard formats
        const isSuccessful = validationInputValue.trim().length >= 8;
        setValidationSuccess(isSuccessful);
        if (isSuccessful) {
          const mockHash = 'M2-TAXFREE-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Math.random().toString(36).substring(2, 10).toUpperCase();
          setValidationResultHash(mockHash);

          // Increment daily profit and total converted airtime (only for standard fee-paying transactions)
          if (effectiveFee > 0) {
            setDailyRevenue(prev => prev + effectiveFee);
            setTotalConvertedAirtime(prev => prev + effectiveFee);
          }

          // Add to transactions ledger
          const newTx: Transaction = {
            id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
            title: isTaxExempt ? `Zero-Tax Identity Check • ${user.phone || selectedPhoneForValidation}` : `Airtime Conversion Settlement • ${selectedPhoneForValidation}`,
            date: new Date().toISOString().split('T')[0],
            amount: effectiveFee,
            type: 'credit',
            status: 'completed',
            category: isTaxExempt ? 'Tax-Exempt Check' : 'Revenue Gateway'
          };
          setTransactions(prev => [newTx, ...prev]);

          // Add to live credit logs list
          const alertRef = 'M2-TAXFREE-' + Math.floor(100000 + Math.random() * 900000);
          const newAlert: CreditAlert = {
            id: alertRef,
            phone: user.phone || selectedPhoneForValidation,
            amount: effectiveFee,
            timestamp: 'Just now'
          };
          setLiveCreditAlerts(prev => [newAlert, ...prev]);

          // Trigger Toast notification
          setActiveAlertNotification({
            show: true,
            phone: user.phone || selectedPhoneForValidation,
            amount: effectiveFee,
            accountNo: defaultAccountNo,
            accountName: defaultAccountName,
            bank: defaultBankName,
            reference: alertRef
          });

          // Trigger API Log
          triggerApiLog(
            'POST',
            `/api/v1/identity/${activeValidationType || 'bvn'}`,
            200,
            {
              api_key: apiKey,
              provider: selectedApiProvider,
              mode: apiMode,
              identifier: validationInputValue,
              phone: user.phone || selectedPhoneForValidation,
              fee: effectiveFee,
              tax_exempt: "true"
            },
            {
              status: "success",
              code: "200",
              message: `${(activeValidationType || 'bvn').toUpperCase()} verification processed successfully without charge.`,
              transaction_id: alertRef,
              validated_node: user.phone || selectedPhoneForValidation,
              tax_policy: "TAX_EXEMPT_ZERO_FEE",
              liquid_settlement: {
                destination: defaultBankName,
                account: defaultAccountNo,
                payout_ngn: 0
              }
            }
          );
        } else {
          // Trigger Failed API Log
          triggerApiLog(
            'POST',
            `/api/v1/identity/${activeValidationType || 'bvn'}`,
            400,
            {
              api_key: apiKey,
              provider: selectedApiProvider,
              mode: apiMode,
              identifier: validationInputValue,
              phone: user.phone || selectedPhoneForValidation
            },
            {
              status: "failed",
              code: "400",
              error: "INVALID_IDENTIFIER_FORMAT",
              message: "Check format length and digits count."
            }
          );
        }
      }
    }, 700);
  };

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

  const totalUserProfit = useMemo(() => {
    return activeUsers.reduce((sum, usr) => sum + usr.revenueGenerated, 0);
  }, [activeUsers]);

  const onlineNodesCount = useMemo(() => {
    return activeUsers.filter(u => u.status === 'online').length;
  }, [activeUsers]);

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

  // Register a new Nigerian active user phone for airtime deduction
  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempRegPhone || !tempRegName) return;

    if (activeUsers.some(u => u.phone === tempRegPhone)) {
      alert("This phone number is already registered!");
      return;
    }

    const newUser: ActiveUser = {
      id: `USR-${Math.floor(700 + Math.random() * 300)}`,
      name: tempRegName,
      phone: tempRegPhone,
      network: tempRegNetwork,
      airtimeBalance: parseFloat(tempRegAirtime) || 0,
      validationsCount: 0,
      revenueGenerated: 0,
      lastActive: 'Just now',
      status: 'online'
    };

    setActiveUsers(prev => [newUser, ...prev]);
    setSelectedPhoneForValidation(tempRegPhone);
    setTempRegName('');
    setTempRegPhone('');
    setTempRegAirtime('1500');
    setIsRegisteringPhoneForVal(false);
  };

  // Simulate quick recharge of airtime for an active user
  const handleRechargeAirtime = (phone: string, amount: number = 1000) => {
    setActiveUsers(prev => prev.map(u => {
      if (u.phone === phone) {
        return {
          ...u,
          airtimeBalance: u.airtimeBalance + amount
        };
      }
      return u;
    }));

    // Trigger API topup log
    triggerApiLog(
      'POST',
      '/api/v1/airtime/topup',
      201,
      {
        api_key: apiKey,
        provider: selectedApiProvider,
        mode: apiMode,
        phone_node: phone,
        recharge_amount: amount
      },
      {
        status: "success",
        code: "201",
        message: "Airtime voucher topup processed successfully.",
        target_phone: phone,
        credited_amount: amount,
        gateway_ref: 'API-TOP-' + Math.floor(100000 + Math.random() * 900000)
      }
    );
  };

  // Manually convert airtime from a selected user to cash
  const handleManualAirtimeDeduction = (phone: string, amount: number = 500) => {
    const userToCharge = activeUsers.find(u => u.phone === phone);
    if (!userToCharge) return;

    if (userToCharge.airtimeBalance < amount) {
      alert(`Insufficient airtime balance on ${phone}! Needs ₦${amount} to convert.`);
      return;
    }

    // Deduct
    setActiveUsers(prev => prev.map(u => {
      if (u.phone === phone) {
        return {
          ...u,
          airtimeBalance: Math.max(0, u.airtimeBalance - amount),
          revenueGenerated: u.revenueGenerated + amount,
          validationsCount: u.validationsCount + 1
        };
      }
      return u;
    }));

    // Increment global revenue
    setDailyRevenue(prev => prev + amount);
    setTotalConvertedAirtime(prev => prev + amount);

    // Prepend a transaction record
    const newTx: Transaction = {
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}`,
      title: `Manual Airtime Conversion • ${phone}`,
      date: new Date().toISOString().split('T')[0],
      amount: amount,
      type: 'credit',
      status: 'completed',
      category: 'Revenue Gateway'
    };
    setTransactions(prev => [newTx, ...prev]);

    // Live alert
    const alertRef = 'M2-SETTLED-' + Math.floor(100000 + Math.random() * 900000);
    const newAlert: CreditAlert = {
      id: alertRef,
      phone: phone,
      amount: amount,
      timestamp: 'Just now'
    };
    setLiveCreditAlerts(prev => [newAlert, ...prev]);

    // Fire Credit Alert notification toast
    setActiveAlertNotification({
      show: true,
      phone: phone,
      amount: amount,
      accountNo: defaultAccountNo,
      accountName: defaultAccountName,
      bank: defaultBankName,
      reference: alertRef
    });

    // Trigger API conversion charge log
    triggerApiLog(
      'POST',
      '/api/v1/airtime/charge',
      200,
      {
        api_key: apiKey,
        provider: selectedApiProvider,
        mode: apiMode,
        phone_node: phone,
        network: userToCharge.network,
        charge_amount: amount,
        settlement: {
          destination_bank: defaultBankName,
          account_no: defaultAccountNo,
          account_name: defaultAccountName
        }
      },
      {
        status: "success",
        code: "200",
        message: `₦${amount} airtime conversion liquidated successfully.`,
        transaction_id: alertRef,
        charged_carrier: userToCharge.network,
        charged_number: phone,
        settlement_status: "settled",
        settled_payout: amount
      }
    );
  };

  // Filtered list of transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      if (user.role === 'user') {
        const isTaxExemptCheck = tx.category === 'Tax-Exempt Check' || tx.title.includes('Zero-Tax');
        if (!isTaxExemptCheck) return false;
      }
      if (txFilter === 'all') return true;
      return tx.type === txFilter;
    });
  }, [transactions, txFilter, user.role]);

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

  const currentThemeObj = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div id="dashboard-container" className={`relative min-h-screen ${currentThemeObj.bg} text-slate-100 font-sans overflow-hidden transition-all duration-500`}>
      
      {/* Immersive Atmospheric Background Elements */}
      <div className={`absolute top-[-200px] left-[-200px] w-[600px] h-[600px] ${currentThemeObj.glowBg1} rounded-full blur-[120px] pointer-events-none transition-all duration-700`}></div>
      <div className={`absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] ${currentThemeObj.glowBg2} rounded-full blur-[100px] pointer-events-none transition-all duration-700`}></div>
      
      {/* Dynamic interactive grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Dynamic Header / Navigation bar */}
      <header className={`sticky top-0 z-40 border-b border-white/10 ${currentThemeObj.bg}/80 backdrop-blur-md relative transition-all duration-500`}>
        <div className={`absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-${theme === 'cyber-slate' ? 'cyan' : theme === 'solar-flare' ? 'amber' : theme === 'emerald-vault' ? 'emerald' : 'violet'}-500/30 to-transparent`}></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${currentThemeObj.primaryColor} p-[1.5px]`}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                  <svg className={`w-5 h-5 ${currentThemeObj.accentClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
                <span className={`ml-1.5 text-[9px] font-mono tracking-widest ${currentThemeObj.accentClass} border ${currentThemeObj.borderAccent} px-1.5 py-0.5 rounded-full bg-white/[0.02]`}>
                  CORE-STABLE
                </span>
              </div>
            </div>

            {/* Quick stats banner (middle) with theme selector */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-400">
              {/* Theme Selection Dots */}
              <div className="flex items-center gap-1 border border-white/10 bg-white/[0.02] p-1 rounded-lg">
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
              <span className="w-px h-4 bg-slate-800"></span>
              <div className="flex items-center gap-2">
                <Network className={`w-3.5 h-3.5 ${currentThemeObj.accentClass}`} />
                <span>LATENCY: <strong className="text-white">{networkPing}ms</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>SHIELD INTEGRITY: <strong className="text-emerald-400">{shieldIntegrity.toFixed(2)}%</strong></span>
              </div>
            </div>

            {/* Logged in identity card & Logout */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowProfileModal(true)}
                className="group flex items-center gap-3 text-right hover:opacity-95 transition-all focus:outline-none cursor-pointer"
                title="Edit Identity Profile"
              >
                <div className="text-right hidden sm:block">
                  <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors leading-tight flex items-center gap-1.5 justify-end">
                    {user.name}
                    <Edit3 className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wide uppercase">{user.role || userContextInfo.badge}</p>
                </div>

                {/* Avatar circle */}
                <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${avatarBg} text-white font-bold text-sm shadow-md shadow-slate-900 border border-white/10 group-hover:scale-105 transition-transform overflow-hidden`}>
                  {user.avatarUrl ? (
                    <img referrerPolicy="no-referrer" src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </button>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center justify-center p-2.5 rounded-xl border border-slate-900 bg-slate-950 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all cursor-pointer"
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
        {user.role === 'user' ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* User Node Phone */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-m2-400">Registered Phone Node</span>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                  <Smartphone className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold font-mono tracking-wide text-white">
                  {user.phone || 'Not Registered'}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Assigned device for identity lookup bypass
                </p>
              </div>
            </div>

            {/* Zero-Tax Waiver */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tax compliance status</span>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                  <Check className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold font-display tracking-wide text-emerald-400">
                  0% TAX (EXEMPT)
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  All validation processing fees waived (saved ₦500/check)
                </p>
              </div>
            </div>

            {/* Total validations */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Validations Completed</span>
                <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/20">
                  <Fingerprint className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold font-display tracking-wide text-cyan-400">
                  {transactions.filter(t => t.category === 'Tax-Exempt Check').length} Processed
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  Secure cryptographic signatures synchronized
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Reservoirs: Total Portfolio Profit from Users */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-m2-400">Total User Profit</span>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white">
                  ₦{totalUserProfit.toLocaleString()}
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  Converted profit from {activeUsers.length} active nodes
                </p>
              </div>
            </div>

            {/* Reservoirs: Airtime Revenue Settlement Hub */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Daily Cash Yield</span>
                <div className="rounded-lg bg-m2-500/10 p-2 text-m2-400 border border-m2-500/20">
                  <Smartphone className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-emerald-400">
                  ₦{dailyRevenue.toLocaleString()}
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 leading-normal">
                  Settled to <strong className="text-slate-300 font-mono">Maniru Mohammad</strong> (First Bank)
                </p>
              </div>
            </div>

            {/* Reservoirs: Active registered nodes */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Node Status</span>
                <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 border border-cyan-500/20">
                  <RefreshCw className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-cyan-400">
                  {onlineNodesCount} / {activeUsers.length} Online
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  Identity & liquidity links active
                </p>
              </div>
            </div>

            {/* Reservoirs: Reserve capital pool */}
            <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Reserve Capital</span>
                <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-wide text-white">
                  ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  Global reserve collateral backing
                </p>
              </div>
            </div>

          </div>
        )}

        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Column: Interactive Project Matrix and Analytics (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* M2 Secure Verification Hub (3D Tactile Buttons) */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">M2 Secure Identity Verification</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Tactile 3D compliance gateways for instant registry auditing</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.02] border border-white/5">
                  <Shield className={`w-4 h-4 ${currentThemeObj.accentClass}`} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* 3D BVN Validation Button */}
                <button
                  type="button"
                  onClick={() => handleOpenValidation('bvn')}
                  className="relative group px-4 py-5 font-bold text-[11px] tracking-wider text-white bg-gradient-to-b from-cyan-600 to-cyan-700 rounded-2xl border-b-[6px] border-cyan-800 hover:from-cyan-500 hover:to-cyan-600 active:translate-y-[4px] active:border-b-[2px] transition-all duration-75 shadow-md shadow-cyan-950/40 flex flex-col items-center justify-center gap-3 cursor-pointer text-center"
                >
                  <Fingerprint className="w-6 h-6 text-cyan-200 group-hover:scale-110 transition-transform" />
                  <span>VALIDATE BVN</span>
                </button>

                {/* 3D NIN Validation Button */}
                <button
                  type="button"
                  onClick={() => handleOpenValidation('nin')}
                  className="relative group px-4 py-5 font-bold text-[11px] tracking-wider text-white bg-gradient-to-b from-violet-600 to-violet-700 rounded-2xl border-b-[6px] border-violet-800 hover:from-violet-500 hover:to-violet-600 active:translate-y-[4px] active:border-b-[2px] transition-all duration-75 shadow-md shadow-violet-950/40 flex flex-col items-center justify-center gap-3 cursor-pointer text-center"
                >
                  <ShieldCheck className="w-6 h-6 text-violet-200 group-hover:scale-110 transition-transform" />
                  <span>VALIDATE NIN</span>
                </button>

                {/* 3D Account No Validation Button */}
                <button
                  type="button"
                  onClick={() => handleOpenValidation('account')}
                  className="relative group px-4 py-5 font-bold text-[11px] tracking-wider text-white bg-gradient-to-b from-emerald-600 to-emerald-700 rounded-2xl border-b-[6px] border-emerald-800 hover:from-emerald-500 hover:to-emerald-600 active:translate-y-[4px] active:border-b-[2px] transition-all duration-75 shadow-md shadow-emerald-950/40 flex flex-col items-center justify-center gap-3 cursor-pointer text-center"
                >
                  <DollarSign className="w-6 h-6 text-emerald-200 group-hover:scale-110 transition-transform" />
                  <span>VALIDATE ACCT NO</span>
                </button>
              </div>
            </div>

            {user.role === 'user' ? (
              /* A beautiful Phone No Registered card */
              <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-6">
                <div className="flex justify-between items-center text-left">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white tracking-wide">Registered Phone Node</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Your connected terminal status with active tax removal protocol</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-400 border border-emerald-500/20">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Assigned Device Phone</span>
                    <span className="text-base font-bold font-mono text-white block">{user.phone || 'Not Assigned'}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Compliance Tax Status</span>
                    <span className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5 pt-0.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      100% TAX REMOVED (0 CHARGE)
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Validation Terminal Node</span>
                    <span className="text-xs font-bold text-slate-300 block">{user.name} ({user.email})</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">Carrier Routing</span>
                    <span className="text-xs font-bold text-m2-400 font-mono block">M2 DIRECT-SYNC TELECOM</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10 flex items-start gap-2.5 text-left">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Zero-Tax Mode Active:</strong> Standard verification fees (<strong className="text-emerald-400 font-mono">₦500.00</strong> per verification) are completely waived when initiating queries. Verification tunnels are secured under license key <span className="font-mono text-emerald-300 font-bold bg-emerald-950 px-1 py-0.5 rounded">M2-TAXFREE-NODE</span>.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Interactive Total Active Users & Registered Nodes Panel */}
                <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">Total Active Users</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Live registered carriers & active phone nodes for validation airtime deductions</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span className="font-mono">{activeUsers.filter(u => u.status === 'online').length} ONLINE NODES</span>
                </div>
              </div>

              {/* Quick Inline Add User Form */}
              <div className="border border-slate-900 bg-slate-900/10 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-m2-400" />
                    Register New Phone for Deductions
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">Requires Airtime Balance</span>
                </div>

                <form onSubmit={handleRegisterUser} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="User Display Name"
                    value={tempRegName}
                    onChange={(e) => setTempRegName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-700 outline-none focus:border-m2-500"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Phone (e.g. 08031234567)"
                    value={tempRegPhone}
                    onChange={(e) => setTempRegPhone(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono placeholder-slate-700 outline-none focus:border-m2-500"
                  />
                  <div className="flex gap-1.5">
                    <select
                      value={tempRegNetwork}
                      onChange={(e) => setTempRegNetwork(e.target.value as any)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-1 py-1.5 text-xs text-white outline-none focus:border-m2-500"
                    >
                      <option value="MTN">MTN</option>
                      <option value="Airtel">Airtel</option>
                      <option value="Glo">Glo</option>
                      <option value="9mobile">9mobile</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Airtime ₦"
                      value={tempRegAirtime}
                      onChange={(e) => setTempRegAirtime(e.target.value)}
                      className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-1.5 py-1.5 text-xs text-white font-mono placeholder-slate-700 outline-none focus:border-m2-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-m2-600 hover:bg-m2-500 text-xs font-bold text-white uppercase tracking-wider py-1.5 rounded-lg transition-all border border-m2-500/20 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Register
                  </button>
                </form>
              </div>

              {/* Active Users Table-Like Rows */}
              <div className="grid gap-3 max-h-[380px] overflow-y-auto pr-1">
                {activeUsers.map((usr) => (
                  <div 
                    key={usr.id} 
                    className="group relative overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/10 p-4 hover:bg-slate-900/20 hover:border-slate-800 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: User Identity Info */}
                      <div className="flex items-center gap-3">
                        <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white font-bold text-xs uppercase tracking-wider ${
                          usr.network === 'MTN' ? 'bg-amber-500' :
                          usr.network === 'Airtel' ? 'bg-red-600' :
                          usr.network === 'Glo' ? 'bg-emerald-600' :
                          'bg-cyan-700'
                        }`}>
                          {usr.name.charAt(0)}
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-slate-950 bg-emerald-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-white">{usr.name}</h4>
                            <span className="text-[9px] text-slate-500 font-mono">({usr.id})</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 font-mono text-[10px]">
                            <span className="text-slate-400">{usr.phone}</span>
                            <span className="h-1 w-1 rounded-full bg-slate-700" />
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                              usr.network === 'MTN' ? 'bg-amber-500/10 text-amber-400' :
                              usr.network === 'Airtel' ? 'bg-rose-500/10 text-rose-400' :
                              usr.network === 'Glo' ? 'bg-emerald-500/10 text-emerald-400' :
                              'bg-cyan-500/10 text-cyan-400'
                            }`}>
                              {usr.network}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Balance & Dynamic Interactive Simulation Triggers */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-white/5 pt-2 sm:pt-0 sm:border-0">
                        <div className="text-left sm:text-right">
                          <span className="block text-[8px] uppercase tracking-wider font-bold text-slate-500">Airtime Balance</span>
                          <span className="text-sm font-bold font-mono text-emerald-400">₦{usr.airtimeBalance.toLocaleString()}</span>
                        </div>

                        {/* Direct Control Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleRechargeAirtime(usr.phone, 1000)}
                            className="text-[9px] font-mono font-bold bg-white/5 hover:bg-white/10 text-white px-2 py-1 rounded-md border border-white/5 transition-all cursor-pointer"
                            title="Simulate ₦1,000 Airtime Voucher Recharge"
                          >
                            +₦1k Topup
                          </button>
                          <button
                            type="button"
                            onClick={() => handleManualAirtimeDeduction(usr.phone, 500)}
                            className="text-[9px] font-mono font-bold bg-m2-950 hover:bg-m2-900 text-m2-400 px-2 py-1 rounded-md border border-m2-500/20 transition-all cursor-pointer flex items-center gap-0.5"
                            title="Directly deduct ₦500 and convert to Maniru Mohammad First Bank account"
                          >
                            Deduct ₦500
                            <ArrowUpRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Stats mini footprint */}
                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-white/[0.03] text-[9px] font-mono text-slate-500">
                      <span>Activity: <strong className="text-slate-400">{usr.lastActive}</strong></span>
                      <div className="flex gap-2">
                        <span>Validations: <strong className="text-slate-300">{usr.validationsCount}</strong></span>
                        <span>Converted: <strong className="text-emerald-500">₦{usr.revenueGenerated}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            {/* M2 Telecom API Gateway Terminal */}
            <div className="rounded-3xl border border-slate-900 bg-slate-950 p-6 space-y-5">
              {!isDeveloperVerified ? (
                <div className="space-y-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-400 border border-rose-500/20">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white tracking-wide">
                        Developer Access Required
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        The Aggregator API Gateway console is encrypted for safety.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 text-left">
                    <label className="block text-[10px] font-mono uppercase font-bold text-slate-500">
                      Developer Private Key
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative flex-1">
                        <input
                          type="password"
                          value={devPassword}
                          onChange={(e) => {
                            setDevPassword(e.target.value);
                            setDevError('');
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-m2-500 outline-none"
                          placeholder="Enter M2-ADMIN-XXX Key..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (devPassword.trim() === 'M2-ADMIN-001') {
                                setIsDeveloperVerified(true);
                                setDevPassword('');
                                setDevError('');
                              } else {
                                setDevError('Invalid developer key. Unauthorized access denied.');
                              }
                            }
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (devPassword.trim() === 'M2-ADMIN-001') {
                            setIsDeveloperVerified(true);
                            setDevPassword('');
                            setDevError('');
                          } else {
                            setDevError('Invalid developer key. Unauthorized access denied.');
                          }
                        }}
                        className="bg-m2-500 hover:bg-m2-600 text-slate-950 font-bold py-2 px-4 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Unlock Terminal
                      </button>
                    </div>
                    {devError && (
                      <p className="text-[11px] text-rose-400 font-mono flex items-center gap-1.5 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {devError}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white tracking-wide flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-m2-400 animate-pulse" />
                        M2 Telecom API Gateway Terminal
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Real-time REST API integration console for national carriers
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDeveloperVerified(false);
                          triggerApiLog('POST', '/api/v1/gateway/lock', 200, null, { status: "locked" });
                        }}
                        className="text-[10px] font-mono text-rose-400 hover:text-rose-300 border border-rose-500/20 bg-rose-500/5 px-2.5 py-1 rounded-md cursor-pointer transition-all uppercase font-bold"
                      >
                        Lock Console
                      </button>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        DEV ACCESS UNLOCKED
                      </span>
                    </div>
                  </div>

                  {/* API Configuration Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-2xl border border-slate-900 bg-slate-900/15 text-xs font-mono">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">AGGREGATOR API</label>
                      <select
                        value={selectedApiProvider}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedApiProvider(val);
                          triggerApiLog('GET', `/api/v1/switch-provider?provider=${val}`, 200, null, {
                            status: "success",
                            active_provider: val.toUpperCase(),
                            endpoints_loaded: ["airtime/charge", "airtime/topup", "identity/bvn", "identity/nin"]
                          });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-m2-500 outline-none cursor-pointer"
                      >
                        <option value="vtpass">VTPass Airtime API</option>
                        <option value="shago">Shago Payments API</option>
                        <option value="clubkonnect">ClubKonnect Telecom</option>
                        {customApis.map((api) => (
                          <option key={api.value} value={api.value}>
                            {api.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">TRANSACTION MODE</label>
                      <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setApiMode('sandbox');
                            triggerApiLog('POST', '/api/v1/gateway/mode', 200, { mode: 'sandbox' }, { status: 'success', active_mode: 'sandbox' });
                          }}
                          className={`flex-1 text-center py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            apiMode === 'sandbox' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Sandbox
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setApiMode('production');
                            triggerApiLog('POST', '/api/v1/gateway/mode', 200, { mode: 'production' }, { status: 'success', active_mode: 'production' });
                          }}
                          className={`flex-1 text-center py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            apiMode === 'production' ? 'bg-m2-500/10 text-m2-400 border border-m2-500/20' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          Prod
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">API PRIVATE KEY</label>
                      <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-m2-500 outline-none"
                        placeholder="Key..."
                      />
                    </div>
                  </div>

                  {/* Add Custom API Section */}
                  <div className="pt-1">
                    {showAddApiForm ? (
                      <div className="p-3.5 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                          <span className="font-bold flex items-center gap-1.5 text-m2-400">
                            <Plus className="w-3.5 h-3.5" />
                            REGISTER NEW ENDPOINT CHANNEL
                          </span>
                          <button
                            type="button"
                            onClick={() => setShowAddApiForm(false)}
                            className="text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] uppercase font-mono font-bold text-slate-500 mb-1">API Provider Name</label>
                            <input
                              type="text"
                              value={newApiName}
                              onChange={(e) => setNewApiName(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white outline-none focus:border-m2-500 text-xs font-mono"
                              placeholder="e.g. Mono Pay, Flutterwave Direct"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => {
                                if (!newApiName.trim()) return;
                                const val = newApiName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
                                const newApi = { name: newApiName.trim(), value: val };
                                setCustomApis(prev => [...prev, newApi]);
                                setSelectedApiProvider(val);
                                setNewApiName('');
                                setShowAddApiForm(false);
                                triggerApiLog('POST', `/api/v1/registry/add-gateway`, 201, newApi, {
                                  status: "created",
                                  message: `Gateway ${newApi.name} successfully registered in security matrix.`
                                });
                              }}
                              className="w-full bg-m2-500 hover:bg-m2-600 text-slate-950 font-bold py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-center font-mono uppercase"
                            >
                              Register
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center bg-slate-900/10 p-2.5 rounded-xl border border-slate-900">
                        <span className="text-[11px] text-slate-400 font-mono">Custom Integrations: {customApis.length}</span>
                        <button
                          type="button"
                          onClick={() => setShowAddApiForm(true)}
                          className="text-[10px] font-bold text-m2-400 hover:text-m2-300 font-mono flex items-center gap-1 uppercase cursor-pointer"
                        >
                          <Plus className="w-3 h-3" /> Add Custom API
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Logs Console Container */}
                  <div className="rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden flex flex-col h-72">
                    {/* Console Header Bar */}
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-900 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                        LIVE TELEMETRY FEED
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            triggerApiLog('POST', '/api/v1/gateway/ping', 200, { ping: 'request' }, {
                              status: 'healthy',
                              latency_ms: 45,
                              carrier_handshake: 'verified',
                              telecom_routing: 'active'
                            });
                          }}
                          className="hover:text-emerald-400 text-[10px] font-bold cursor-pointer"
                          title="Test live API route connection"
                        >
                          PING GATEWAY
                        </button>
                        <span className="text-slate-800">•</span>
                        <button
                          type="button"
                          onClick={() => setApiLogs([])}
                          className="hover:text-rose-400 text-[10px] font-bold cursor-pointer"
                        >
                          CLEAR
                        </button>
                      </div>
                    </div>

                    {/* Log Line Rows */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs select-text">
                      {apiLogs.map((log) => (
                        <div key={log.id} className="p-3 rounded-xl border border-slate-900 bg-slate-900/10 space-y-2 text-left">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                log.method === 'GET' ? 'bg-sky-500/10 text-sky-400' : 'bg-emerald-500/10 text-emerald-400'
                              }`}>
                                {log.method}
                              </span>
                              <span className="text-slate-300 font-bold break-all text-[11px]">{log.endpoint}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span>{log.timestamp}</span>
                              <span>•</span>
                              <span className="text-slate-400 font-bold">{log.latency}ms</span>
                              <span>•</span>
                              <span className={`font-bold px-1 rounded ${
                                log.status >= 200 && log.status < 300 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                              }`}>
                                {log.status} {log.status === 200 ? 'OK' : log.status === 201 ? 'CREATED' : 'BAD REQUEST'}
                              </span>
                            </div>
                          </div>

                          {/* Request / Response JSON Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] pt-1">
                            {log.requestPayload && (
                              <div className="space-y-1">
                                <span className="text-slate-500 uppercase tracking-wider font-bold">Request Payload</span>
                                <pre className="p-2 rounded bg-slate-950 border border-slate-900 overflow-x-auto text-cyan-400 max-h-32 text-[10px] leading-relaxed text-left">
                                  {JSON.stringify(log.requestPayload, null, 2)}
                                </pre>
                              </div>
                            )}
                            {log.responsePayload && (
                              <div className={`space-y-1 ${!log.requestPayload ? 'col-span-2' : ''}`}>
                                <span className="text-slate-500 uppercase tracking-wider font-bold">Response JSON</span>
                                <pre className="p-2 rounded bg-slate-950 border border-slate-900 overflow-x-auto text-emerald-400 max-h-32 text-[10px] leading-relaxed text-left">
                                  {JSON.stringify(log.responsePayload, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {apiLogs.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center py-12 text-slate-500 text-center space-y-2">
                          <Cpu className="w-8 h-8 text-slate-700 animate-pulse" />
                          <p className="text-xs font-bold uppercase tracking-wider">Console streams cleared</p>
                          <p className="text-[10px] text-slate-600">Perform a verification, top up airtime, or deduct airtime to log live API transmissions.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Developer Credentials Notes */}
                  <div className="flex gap-2.5 p-3 rounded-2xl border border-slate-900/60 bg-slate-900/5 text-[11px] text-slate-400 leading-relaxed text-left">
                    <Info className="w-4 h-4 text-m2-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Production Credentials Active:</strong> Transactions are routed through corporate channels using secure headers. Change the provider selector to instantly hot-swap target servers.
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}

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
                {user.role === 'admin' && (
                  <button
                    onClick={() => setShowAddTx(!showAddTx)}
                    className="flex items-center gap-1.5 self-start sm:self-auto rounded-xl bg-m2-600 hover:bg-m2-500 py-2 px-3.5 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Record Flow
                  </button>
                )}
              </div>

              {/* Add Transaction Form Panel */}
              {user.role === 'admin' && (
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
              )}

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
                        {tx.type === 'credit' ? '+' : '-'}
                        {tx.category === 'Revenue Gateway' ? '₦' : '$'}
                        {tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
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
            {user.role === 'admin' && (
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
            )}

          </div>

        </div>

      </main>

      {/* Corporate bottom credit line */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10 mt-16 text-center text-xs text-slate-600 font-mono tracking-widest">
        © 2026 M2-GLOBAL-SERVICESS. ALL QUANTUM VECTORS REGISTERED.
      </footer>

      {/* Dynamic Popups Container */}
      <AnimatePresence>
        {/* 1. User Profile Customizer Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfileModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8 space-y-6 text-left"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <Edit3 className={`w-5 h-5 ${currentThemeObj.accentClass}`} />
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">Update Identity Profile</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-5">
                {/* Avatar selection preview */}
                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                  <div className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${avatarBg} text-white font-black text-2xl shadow-xl overflow-hidden border border-white/10`}>
                    {profileAvatarSeed ? (
                      <img
                        referrerPolicy="no-referrer"
                        src={`https://api.dicebear.com/7.x/${profileAvatarStyle}/svg?seed=${encodeURIComponent(profileAvatarSeed)}`}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : user.avatarUrl ? (
                      <img referrerPolicy="no-referrer" src={user.avatarUrl} alt="Preset Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span>{profileName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-2.5 text-center sm:text-left">
                    <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400">AI-Generated Portrait Generator</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {(['pixel-art', 'bottts', 'adventurer', 'lorelei'] as const).map((style) => (
                        <button
                          key={style}
                          type="button"
                          onClick={() => {
                            setProfileAvatarStyle(style);
                            if (!profileAvatarSeed) setProfileAvatarSeed(profileName || 'M2');
                          }}
                          className={`text-[9px] font-mono font-bold py-1 px-1.5 border rounded-lg transition-all ${
                            profileAvatarStyle === style && profileAvatarSeed
                              ? 'border-cyan-500 bg-cyan-500/10 text-white'
                              : 'border-white/5 bg-white/[0.01] text-slate-400 hover:border-white/10'
                          }`}
                        >
                          {style.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 mt-2">
                      <input
                        type="text"
                        value={profileAvatarSeed}
                        onChange={(e) => setProfileAvatarSeed(e.target.value)}
                        placeholder="Avatar generation seed..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white placeholder-slate-700 outline-none focus:border-cyan-500"
                      />
                      <button
                        type="button"
                        onClick={() => setProfileAvatarSeed('seed-' + Math.floor(Math.random() * 99999))}
                        className="px-2.5 py-1 text-[10px] bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all font-mono border border-white/5 cursor-pointer"
                        title="Roll random vector coordinates"
                      >
                        ROLL
                      </button>
                    </div>
                  </div>
                </div>

                {/* Pre-designed AI portrait selections */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-500">Or Select High-Fidelity Design Presets</label>
                  <div className="grid grid-cols-4 gap-3">
                    {PRESET_AVATARS.map((avatar, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setProfileAvatarSeed(''); // clear seed so preset url is prioritized
                          onUserUpdate({
                            ...user,
                            avatarUrl: avatar.url
                          });
                        }}
                        className={`group relative h-12 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          user.avatarUrl === avatar.url
                            ? 'border-cyan-500 ring-2 ring-cyan-500/30'
                            : 'border-white/5 hover:border-white/20'
                        }`}
                        title={avatar.name}
                      >
                        <img referrerPolicy="no-referrer" src={avatar.url} alt={avatar.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Display Identity</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Active Division</label>
                    <input
                      type="text"
                      required
                      value={profileDept}
                      onChange={(e) => setProfileDept(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Corporate Role</label>
                    <input
                      type="text"
                      required
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">Ledger Entity</label>
                    <input
                      type="text"
                      required
                      value={profileCompany}
                      onChange={(e) => setProfileCompany(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer border border-white/5"
                  >
                    Cancel Override
                  </button>
                  <button
                    type="submit"
                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${currentThemeObj.buttonBg} rounded-xl shadow-lg ${currentThemeObj.shadowClass} transition-all cursor-pointer`}
                  >
                    Commit Overrides
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* 2. Interactive Compliance Registry Validation Portal */}
        {activeValidationType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if (!isValidationRunning) setActiveValidationType(null); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8 space-y-6 text-left"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <Fingerprint className={`w-5 h-5 ${currentThemeObj.accentClass}`} />
                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                    {activeValidationType === 'bvn' ? 'Validate Bank Verification No' :
                     activeValidationType === 'nin' ? 'Validate National ID Number' :
                     'Validate Account Number'}
                  </h3>
                </div>
                <button
                  type="button"
                  disabled={isValidationRunning}
                  onClick={() => setActiveValidationType(null)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors disabled:opacity-30 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps and details */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-2">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Initiate instant compliance registry validation. The standard processing fee is <strong className="text-emerald-400 font-mono">₦{validationFee}</strong>, deducted as airtime directly from your registered phone node and converted into bank-settled cash.
                  </p>
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-900 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-500 uppercase">Settlement account:</span>
                    <span className="text-cyan-400 font-bold">{defaultAccountNo} (First Bank)</span>
                  </div>
                </div>

                {validationSuccess === null && (
                  <div className="space-y-4">
                    {/* Active Phone Selection block */}
                    {user.role === 'user' ? (
                      <div className="space-y-1.5 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-left">
                        <span className="block text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                          REGISTERED ZERO-TAX IDENTITY NODE
                        </span>
                        <div className="flex justify-between items-center text-sm font-mono text-white pt-1">
                          <div>
                            <span className="font-bold block">{user.phone || 'N/A'}</span>
                            <span className="text-[10px] text-slate-400 font-sans block mt-0.5">Assigned Terminal: {user.name}</span>
                          </div>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md uppercase tracking-wider">
                            ZERO-TAX ACTIVE
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-500">
                            Select Charging Node (Phone)
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsRegisteringPhoneForVal(!isRegisteringPhoneForVal)}
                            className="text-[9px] text-m2-400 hover:underline font-bold"
                          >
                            {isRegisteringPhoneForVal ? "Select Existing" : "+ Register New Phone"}
                          </button>
                        </div>

                        {isRegisteringPhoneForVal ? (
                          <div className="border border-slate-900 bg-slate-900/40 p-3 rounded-xl space-y-2.5 text-left">
                            <span className="block text-[9px] font-bold text-slate-400 uppercase">New Charging Phone Node</span>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="Name"
                                value={tempRegName}
                                onChange={(e) => setTempRegName(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
                              />
                              <input
                                type="text"
                                placeholder="Phone"
                                value={tempRegPhone}
                                onChange={(e) => setTempRegPhone(e.target.value)}
                                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white font-mono"
                              />
                            </div>
                            <div className="flex gap-2">
                              <select
                                value={tempRegNetwork}
                                onChange={(e) => setTempRegNetwork(e.target.value as any)}
                                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white"
                              >
                                <option value="MTN">MTN</option>
                                <option value="Airtel">Airtel</option>
                                <option value="Glo">Glo</option>
                                <option value="9mobile">9mobile</option>
                              </select>
                              <input
                                type="number"
                                placeholder="Airtime ₦"
                                value={tempRegAirtime}
                                onChange={(e) => setTempRegAirtime(e.target.value)}
                                className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white font-mono"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                if (!tempRegPhone || !tempRegName) return;
                                const newUser: ActiveUser = {
                                  id: `USR-${Math.floor(700 + Math.random() * 300)}`,
                                  name: tempRegName,
                                  phone: tempRegPhone,
                                  network: tempRegNetwork,
                                  airtimeBalance: parseFloat(tempRegAirtime) || 0,
                                  validationsCount: 0,
                                  revenueGenerated: 0,
                                  lastActive: 'Just now',
                                  status: 'online'
                                };
                                setActiveUsers(prev => [newUser, ...prev]);
                                setSelectedPhoneForValidation(tempRegPhone);
                                setTempRegName('');
                                setTempRegPhone('');
                                setTempRegAirtime('1500');
                                setIsRegisteringPhoneForVal(false);
                              }}
                              className="w-full bg-m2-600 py-1.5 rounded-lg text-[10px] font-bold text-white uppercase cursor-pointer"
                            >
                              Add & Select Phone Node
                            </button>
                          </div>
                        ) : (
                          <div className="relative">
                            <select
                              value={selectedPhoneForValidation}
                              onChange={(e) => setSelectedPhoneForValidation(e.target.value)}
                              disabled={isValidationRunning}
                              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-500 font-mono cursor-pointer"
                            >
                              {activeUsers.map(usr => (
                                <option key={usr.phone} value={usr.phone}>
                                  {usr.name} • {usr.phone} ({usr.network}) — Bal: ₦{usr.airtimeBalance}
                                </option>
                              ))}
                            </select>
                            {/* Low balance warning */}
                            {(() => {
                              const selectedUserObj = activeUsers.find(u => u.phone === selectedPhoneForValidation);
                              if (selectedUserObj && selectedUserObj.airtimeBalance < validationFee) {
                                return (
                                  <div className="text-[10px] text-rose-400 font-medium mt-1 flex items-center gap-1 text-left">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    <span>Insufficient airtime balance! Standard fee is ₦{validationFee}. Please top up on the main screen first.</span>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        {activeValidationType.toUpperCase()} CODE STRING
                      </label>
                      <input
                        type="text"
                        disabled={isValidationRunning}
                        value={validationInputValue}
                        onChange={(e) => setValidationInputValue(e.target.value.replace(/\D/g, ''))}
                        placeholder={activeValidationType === 'account' ? 'e.g. 0123456789' : 'e.g. 22345678901'}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono placeholder-slate-700 outline-none focus:border-cyan-500"
                      />
                    </div>

                    {!isValidationRunning ? (
                      <button
                        type="button"
                        onClick={startValidationSimulation}
                        disabled={!validationInputValue || (user.role !== 'user' && (activeUsers.find(u => u.phone === selectedPhoneForValidation)?.airtimeBalance || 0) < validationFee)}
                        className={`w-full py-3.5 font-bold text-sm tracking-wider text-white bg-gradient-to-r ${currentThemeObj.buttonBg} rounded-xl shadow-lg ${currentThemeObj.shadowClass} disabled:opacity-40 transition-all cursor-pointer`}
                      >
                        {user.role === 'user' ? "INITIATE SECURE VERIFICATION (0 TAX EXEMPT)" : `INITIATE VERIFICATION (DEBIT ₦${validationFee})`}
                      </button>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-[10px] font-mono uppercase text-slate-400">
                          <span>{validationStatusMessage}</span>
                          <span>{validationProgress}%</span>
                        </div>
                        <div className="relative h-2 w-full rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                            style={{ width: `${validationProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {validationSuccess !== null && (
                  <div className="space-y-5 pt-1 text-center">
                    {validationSuccess ? (
                      <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <Check className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white uppercase tracking-wider">LEDGER BLOCK APPROVED</h4>
                          <p className="text-xs text-slate-400">Verification successful. Identity record is confirmed and securely synchronized.</p>
                        </div>
                        <div className="bg-slate-950 p-3 rounded-xl border border-slate-900 space-y-1 text-left font-mono text-[10px]">
                          <div className="flex justify-between"><span className="text-slate-500">GATEWAY SEC:</span><span className="text-slate-300">NFIU-COMPLIANT</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">BLOCK SIGN:</span><span className="text-emerald-400 select-all truncate max-w-[200px]">{validationResultHash}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500">TIMESTAMP:</span><span className="text-slate-300">{new Date().toISOString()}</span></div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-4">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <AlertCircle className="w-7 h-7" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white uppercase tracking-wider">REGISTRY REJECTED</h4>
                          <p className="text-xs text-slate-400">The digits provided do not match any recognized global cryptographic signature blocks.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setValidationSuccess(null)}
                          className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-xs text-white font-bold rounded-xl border border-white/5 transition-all cursor-pointer"
                        >
                          TRY RE-SUBMITTING CODE
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveValidationType(null)}
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 font-bold uppercase tracking-wider rounded-xl border border-slate-800 transition-all cursor-pointer"
                    >
                      Dismiss Portal
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* 3. Live Majestic First Bank Credit Alert Notification */}
        {activeAlertNotification && activeAlertNotification.show && (
          <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-slate-950 border-2 border-emerald-500 rounded-2xl shadow-[0_4px_30px_rgba(16,185,129,0.2)] overflow-hidden text-left"
            >
              {/* Header */}
              <div className="bg-emerald-600 px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white font-bold text-xs uppercase tracking-wider">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-white animate-ping" />
                  <span>FIRST BANK CREDIT ALERT</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveAlertNotification(null)}
                  className="text-white hover:text-emerald-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-500 text-[10px]">
                  <span>M2 LIQUIDITY SETTLEMENT</span>
                  <span>{new Date().toLocaleTimeString()}</span>
                </div>
                
                <div className="py-2 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="block text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Amount Credited</span>
                  <span className="text-2xl font-black text-emerald-300">₦{activeAlertNotification.amount.toLocaleString()}.00</span>
                </div>

                <div className="space-y-1 text-[10px] text-slate-300">
                  <div className="flex justify-between"><span className="text-slate-500">Account No:</span><span className="font-bold select-all text-white">{activeAlertNotification.accountNo}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Account Name:</span><span className="font-bold uppercase text-white">{activeAlertNotification.accountName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Origin Node:</span><span className="text-white">{activeAlertNotification.phone}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">STAN Ref:</span><span className="text-slate-400 font-bold">{activeAlertNotification.reference}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Status:</span><span className="text-emerald-400 font-bold uppercase">Cash Liquidated</span></div>
                </div>

                <div className="pt-1.5 text-[9px] text-slate-500 text-center border-t border-white/5">
                  Converted from airtime balance direct routing protocol.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
