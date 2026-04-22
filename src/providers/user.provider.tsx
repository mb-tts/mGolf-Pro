import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { createMMKV } from 'react-native-mmkv';
import type { UserProfile, UserContextType, EquipmentKey, EquipmentItem } from '@/types/user.types';

const userStorage = createMMKV({ id: 'user-storage' });

const INITIAL_EQUIPMENT: Record<EquipmentKey, EquipmentItem> = {
  driver: { label: 'Gậy driver', value: 'Bridgestone' },
  wood: { label: 'Gậy gỗ', value: 'Bridgestone' },
  hybrid: { label: 'Gậy hybrid', value: 'Bridgestone' },
  iron: { label: 'Gậy bộ gậy sắt', value: 'Katana' },
  technical: { label: 'Gậy kỹ thuật', value: 'Katana' },
  putter: { label: 'Putter', value: 'Ping' },
  ball: { label: 'Hãng bóng', value: 'Ping' },
  hand: { label: 'Tay thuận', value: 'Tay trái' },
  gloveSize: { label: 'Size găng tay', value: '30' },
  shirtSize: { label: 'Size áo', value: 'XL' },
  pantSize: { label: 'Size quần', value: '40' },
  shoeSize: { label: 'Size giày', value: '42' },
  hatSize: { label: 'Size mũ', value: '30' },
};

const INITIAL_PROFILE: UserProfile = {
  fullName: 'Nguyen Van Linh',
  vgaCode: 'VGA123',
  handicap: '30',
  phone: '0901234567',
  email: 'nvlinh@mobifone.vn',
  memberShip: 'Basic',
  teeBox: 'Blue',
  equipment: INITIAL_EQUIPMENT,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from MMKV on mount
  useEffect(() => {
    const savedProfile = userStorage.getString('user.profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
    setIsLoading(false);
  }, []);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setProfile(prev => {
      const newProfile = { ...prev, ...data };
      userStorage.set('user.profile', JSON.stringify(newProfile));
      return newProfile;
    });
  }, []);

  const updateEquipment = useCallback((key: EquipmentKey, value: string, logo?: any) => {
    setProfile(prev => {
      const newEquipment = {
        ...prev.equipment,
        [key]: { ...prev.equipment[key], value, logo }
      };
      const newProfile = { ...prev, equipment: newEquipment };
      userStorage.set('user.profile', JSON.stringify(newProfile));
      return newProfile;
    });
  }, []);

  const value = useMemo(() => ({
    profile,
    updateProfile,
    updateEquipment,
    isLoading
  }), [profile, updateProfile, updateEquipment, isLoading]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
