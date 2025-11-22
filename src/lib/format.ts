/**
 * Bangladesh-specific formatting utilities
 */

export const formatCurrency = (amount: number): string => {
  return `৳${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)}`;
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('bn-BD').format(number);
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('bn-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
};

// Bangladesh-specific text translations
export const text = {
  // Common terms
  dashboard: 'ড্যাশবোর্ড',
  projects: 'প্রকল্প',
  investments: 'বিনিয়োগ',
  profits: 'লাভ',
  shares: 'শেয়ার',

  // Actions
  buy: 'কিনুন',
  sell: 'বিক্রি করুন',
  invest: 'বিনিয়োগ করুন',
  approve: 'অনুমোদন করুন',
  reject: 'প্রত্যাখ্যান করুন',

  // Status
  active: 'সক্রিয়',
  closed: 'বন্ধ',
  pending: 'অপেক্ষমাণ',
  approved: 'অনুমোদিত',
  rejected: 'প্রত্যাখ্যাত',

  // Common phrases
  totalInvestment: 'মোট বিনিয়োগ',
  availableShares: 'উপলব্ধ শেয়ার',
  pricePerShare: 'প্রতি শেয়ারের দাম',
  totalProfit: 'মোট লাভ',
  myInvestments: 'আমার বিনিয়োগ',
  browseProjects: 'প্রকল্প ব্রাউজ করুন',

  // Currency
  taka: 'টাকা',
  bdt: 'বিডিটি',
};