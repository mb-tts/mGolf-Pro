import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Colors } from "@/constants/colors";

// Import các logo từ assets/icons
const BridgestoneLogo = require('../../../../assets/icons/bridgestone.png');
const PingLogo = require('../../../../assets/icons/ping.png');
const KatanaGolfLogo = require('../../../../assets/icons/katanagolf.png');

const BRAND_TYPES = ['driver', 'wood', 'hybrid', 'iron', 'technical', 'putter', 'ball'] as const;
type BrandType = typeof BRAND_TYPES[number];
type EquipmentKey = BrandType | 'hand' | 'gloveSize' | 'shirtSize' | 'pantSize' | 'shoeSize' | 'hatSize';

interface OptionItem {
  id: string;
  name: string;
  logo?: ImageSourcePropType; 
}

interface EquipmentItem {
  label: string;
  value: string;
  logo?: ImageSourcePropType;
}

// --- 2. ĐƯA DỮ LIỆU TĨNH RA NGOÀI COMPONENT ---
const BRANDS: OptionItem[] = [
  { id: 'bridgestone', name: 'Bridgestone', logo: BridgestoneLogo },
  { id: 'ping', name: 'Ping', logo: PingLogo },
  { id: 'katana', name: 'Katana Golf', logo: KatanaGolfLogo },
];

const toOptionList = (arr: string[]): OptionItem[] => arr.map(item => ({ id: item, name: item }));

// Object Map giúp lấy data cho Bottom Sheet mà không cần if-else
const OPTIONS_MAP: Record<string, OptionItem[]> = {
  hand: [{ id: 'left', name: 'Tay trái' }, { id: 'right', name: 'Tay phải' }],
  gloveSize: toOptionList(['18', '19', '20', '21', 'M', 'L', 'XL']),
  shirtSize: toOptionList(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  pantSize: toOptionList(['30', '32', '34', '36', '38', '40', '42', '44']),
  shoeSize: toOptionList(['36', '37', '38', '39', '40', '41', '42']),
  hatSize: toOptionList(['56', '57', '58', '59', '60']),
};

export const EquipmentSettingsScreen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedType, setSelectedType] = useState<EquipmentKey | null>(null);
  const [equipmentData, setEquipmentData] = useState<Record<EquipmentKey, EquipmentItem>>({
    driver: { label: 'Gậy driver', value: 'Bridgestone', logo: BridgestoneLogo },
    wood: { label: 'Gậy gỗ', value: 'Bridgestone', logo: BridgestoneLogo },
    hybrid: { label: 'Gậy hybrid', value: 'Bridgestone', logo: BridgestoneLogo },
    iron: { label: 'Gậy bộ gậy sắt', value: 'Katana', logo: KatanaGolfLogo },
    technical: { label: 'Gậy kỹ thuật', value: 'Katana', logo: KatanaGolfLogo },
    putter: { label: 'Putter', value: 'Ping', logo: PingLogo },
    ball: { label: 'Hãng bóng', value: 'Ping', logo: PingLogo },
    hand: { label: 'Tay thuận', value: 'Tay trái' },
    gloveSize: { label: 'Size găng tay', value: '30' },
    shirtSize: { label: 'Size áo', value: 'XL' },
    pantSize: { label: 'Size quần', value: '40' },
    shoeSize: { label: 'Size giày', value: '42' },
    hatSize: { label: 'Size mũ', value: '30' },
  });

  const snapPoints = useMemo(() => ['40%'], []);

  // --- 3. TỐI ƯU LOGIC TÌM DATA CHO BOTTOM SHEET ---
  const isBrandType = selectedType ? (BRAND_TYPES as readonly string[]).includes(selectedType) : false;
  const bottomSheetData = selectedType 
    ? (isBrandType ? BRANDS : OPTIONS_MAP[selectedType] || []) 
    : [];

  const openBottomSheet = (key: EquipmentKey) => {
    setSelectedType(key);
    bottomSheetRef.current?.expand();
  };

  const handleSelectOption = (option: OptionItem) => {
    if (!selectedType) return;
    
    setEquipmentData(prev => ({
      ...prev,
      [selectedType]: { 
        ...prev[selectedType], 
        value: option.name, 
        ...(isBrandType && { logo: option.logo }) 
      }
    }));
    bottomSheetRef. current?.close();
  };
  
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trang bị</Text>
        <View style={styles.placeholder} />
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {Object.entries(equipmentData).map(([key, item], index, arr) => {
            const eqKey = key as EquipmentKey;
            const isBlueText = !(BRAND_TYPES as readonly string[]).includes(eqKey);

            return (
              <TouchableOpacity 
                key={eqKey} 
                style={[styles.row, index !== arr.length - 1 && styles.borderBottom]}
                onPress={() => openBottomSheet(eqKey)}
              >
                <Text style={styles.rowLabel}>{item.label}</Text>
                <View style={styles.rowRight}>
                  {item.logo ? (
                    <Image 
                      source={typeof item.logo === 'string' ? { uri: item.logo } : item.logo} 
                      style={styles.brandLogoSmall} 
                      resizeMode="contain" 
                    />
                  ) : (
                    <Text style={[styles.rowValue, isBlueText && styles.textBlue]}>
                      {item.value}
                    </Text>
                  )}
                  <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* BOTTOM SHEET */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.sheetContent}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={() => bottomSheetRef.current?.close()}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>
              {selectedType ? equipmentData[selectedType].label : ''}
            </Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Thay View bằng ScrollView để đề phòng danh sách dài bị khuất trên màn hình nhỏ */}
          <ScrollView style={styles.brandList} showsVerticalScrollIndicator={false}>
            {bottomSheetData.map((option) => (
              <TouchableOpacity 
                key={option.id} 
                style={styles.brandItem}
                onPress={() => handleSelectOption(option)}
              >
                {isBrandType && option.logo ? (
                   <Image 
                     source={typeof option.logo === 'string' ? { uri: option.logo } : option.logo} 
                     style={styles.brandLogoLarge} 
                     resizeMode="contain" 
                   />
                ) : (
                  <Text style={styles.brandNameFallback}>{option.name}</Text>
                )}
                {selectedType && equipmentData[selectedType].value === option.name && (
                  <Ionicons name="checkmark-circle" size={22} color="#004FA1" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F6F9" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, borderColor: "#E5E7EB", alignItems: "center", justifyContent: "center"},
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1A1A1A" },
  placeholder: { width: 36 },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 16 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  rowLabel: { fontSize: 15, color: '#333' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 15, color: '#666', marginRight: 8 },
  textBlue: { color: Colors.primary, fontWeight: 'bold' },
  brandLogoSmall: { width: 100, height: 25, marginRight: 8 },
  
  // Sheet Styles
  sheetContent: { flex: 1, paddingHorizontal: 16 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '600' },
  brandList: { marginTop: 10, marginBottom: 20 }, // Thêm padding dưới
  brandItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
  brandLogoLarge: { width: 90, height: 15 },
  brandNameFallback: { fontSize: 16, fontWeight: '500' }
});