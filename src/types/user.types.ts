export type EquipmentBrandKey = 'driver' | 'wood' | 'hybrid' | 'iron' | 'technical' | 'putter' | 'ball';
export type EquipmentSizeKey = 'hand' | 'gloveSize' | 'shirtSize' | 'pantSize' | 'shoeSize' | 'hatSize';
export type EquipmentKey = EquipmentBrandKey | EquipmentSizeKey;

export interface EquipmentItem {
  label: string;
  value: string;
  logo?: any;
}

export interface UserProfile {
  fullName: string;
  vgaCode: string;
  handicap: string;
  phone: string;
  email: string;
  memberShip: string;
  teeBox: string;
  equipment: Record<EquipmentKey, EquipmentItem>;
}

export interface UserContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateEquipment: (key: EquipmentKey, value: string, logo?: any) => void;
  isLoading: boolean;
}
