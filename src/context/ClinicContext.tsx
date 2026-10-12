import React, { createContext, useContext, useState, useEffect } from 'react';
import { clinicData as defaultClinicData, ClinicConfig } from '../config/clinicData';

interface ClinicContextType {
  data: ClinicConfig;
  updateData: (newData: Partial<ClinicConfig>) => void;
  resetDefaults: () => void;
  statusOverride: 'auto' | 'open' | 'closed';
  setStatusOverride: (override: 'auto' | 'open' | 'closed') => void;
  currentStatus: {
    isOpen: boolean;
    statusLabel: string;
    statusDetails: string;
    badgeColorClass: string;
  };
}

const STORAGE_KEY = 'dr_sameh_omara_clinic_data_v2';
const OVERRIDE_KEY = 'dr_sameh_omara_status_override_v2';

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ClinicConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultClinicData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse saved clinic data:', e);
    }
    return defaultClinicData;
  });

  const [statusOverride, setStatusOverrideState] = useState<'auto' | 'open' | 'closed'>(() => {
    try {
      const saved = localStorage.getItem(OVERRIDE_KEY);
      if (saved === 'open' || saved === 'closed' || saved === 'auto') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'auto';
  });

  const setStatusOverride = (override: 'auto' | 'open' | 'closed') => {
    setStatusOverrideState(override);
    try {
      localStorage.setItem(OVERRIDE_KEY, override);
    } catch {
      // ignore
    }
  };

  const updateData = (newData: Partial<ClinicConfig>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
      return updated;
    });
  };

  const resetDefaults = () => {
    setData(defaultClinicData);
    setStatusOverride('auto');
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(OVERRIDE_KEY);
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  // دالة حساب الحالة الحالية مع مراعاة الفرض اليدوي
  const calculateStatus = () => {
    if (statusOverride === 'open') {
      return {
        isOpen: true,
        statusLabel: 'مفتوح الآن',
        statusDetails: 'نستقبلكم الآن (تثبيت يدوي)',
        badgeColorClass: 'bg-emerald-500',
      };
    }

    if (statusOverride === 'closed') {
      return {
        isOpen: false,
        statusLabel: 'مغلق الآن',
        statusDetails: `المواعيد: ${data.workingHours.display}`,
        badgeColorClass: 'bg-amber-500',
      };
    }

    // حساب تلقائي حسب التوقيت
    try {
      const now = new Date();
      const cairoTimeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Cairo',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
      });

      const parts = cairoTimeFormatter.formatToParts(now);
      const hourPart = parts.find((p) => p.type === 'hour');
      const minutePart = parts.find((p) => p.type === 'minute');

      const currentHour = hourPart ? parseInt(hourPart.value, 10) : now.getHours();
      const currentMinute = minutePart ? parseInt(minutePart.value, 10) : now.getMinutes();
      const totalMinutes = currentHour * 60 + currentMinute;

      const openMinutes = data.workingHours.startHour24 * 60;
      const closeMinutes = data.workingHours.endHour24 * 60;

      const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

      if (isOpen) {
        return {
          isOpen: true,
          statusLabel: 'مفتوح الآن',
          statusDetails: `نستقبلكم حتى ${data.workingHours.endHour24 > 12 ? data.workingHours.endHour24 - 12 : data.workingHours.endHour24}:00 م`,
          badgeColorClass: 'bg-emerald-500',
        };
      } else {
        return {
          isOpen: false,
          statusLabel: 'مغلق الآن',
          statusDetails: `المواعيد: ${data.workingHours.display}`,
          badgeColorClass: 'bg-amber-500',
        };
      }
    } catch {
      return {
        isOpen: false,
        statusLabel: 'مواعيد العيادة',
        statusDetails: data.workingHours.display,
        badgeColorClass: 'bg-turquoise',
      };
    }
  };

  const [currentStatus, setCurrentStatus] = useState(calculateStatus());

  useEffect(() => {
    setCurrentStatus(calculateStatus());
    const timer = setInterval(() => {
      setCurrentStatus(calculateStatus());
    }, 30000); // تحديث كل 30 ثانية
    return () => clearInterval(timer);
  }, [data.workingHours, statusOverride]);

  return (
    <ClinicContext.Provider
      value={{
        data,
        updateData,
        resetDefaults,
        statusOverride,
        setStatusOverride,
        currentStatus,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
