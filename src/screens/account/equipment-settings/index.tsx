import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

// Import các logo từ assets/icons
const BridgestoneLogo = require('../../../../assets/icons/bridgestone.png');
const PingLogo = require('../../../../assets/icons/ping.png');
const KatanaGolfLogo = require('../../../../assets/icons/katanagolf.png');

export const EquipmentSettingsScreen = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);

  // State quản lý việc đang chọn loại gậy nào và giá trị đã chọn
  const [selectedType, setSelectedType] = useState(null);
  const [equipmentData, setEquipmentData] = useState({
    driver: { label: 'Gậy driver', value: 'Bridgestone', logo: '' },
    wood: { label: 'Gậy gỗ', value: 'Bridgestone', logo: '' },
    hybrid: { label: 'Gậy hybrid', value: 'Bridgestone', logo: '' },
    iron: { label: 'Gậy bộ gậy sắt', value: 'Katana', logo: '' },
    technical: { label: 'Gậy kỹ thuật', value: 'Katana', logo: '' },
    putter: { label: 'Putter', value: 'Ping', logo: '' },
    ball: { label: 'Hãng bóng', value: 'Ping', logo: '' },
    hand: { label: 'Tay thuận', value: 'Tay trái' },
    gloveSize: { label: 'Size găng tay', value: '30' },
    shirtSize: { label: 'Size áo', value: 'XL' },
    pantSize: { label: 'Size quần', value: '40' },
    shoeSize: { label: 'Size giày', value: '42' },
    hatSize: { label: 'Size mũ', value: '30' },
  });

  // Danh sách các thương hiệu
  const brands = [
    { id: 'bridgestone', name: 'Bridgestone', logo: BridgestoneLogo },
    { id: 'ping', name: 'Ping', logo: PingLogo },
    { id: 'katana', name: 'Katana Golf', logo: KatanaGolfLogo },
  ];

  const snapPoints = useMemo(() => ['40%'], []);

  const openBottomSheet = (key) => {
    setSelectedType(key);
    bottomSheetRef.current?.expand();
  };

  const handleSelectBrand = (brand) => {
    setEquipmentData(prev => ({
      ...prev,
      [selectedType]: { ...prev[selectedType], value: brand.name, logo: brand.logo }
    }));
    bottomSheetRef.current?.close();
  };

  const renderBackdrop = useCallback(
    props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trang bị</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {Object.keys(equipmentData).map((key, index) => {
            const item = equipmentData[key];
            return (
              <TouchableOpacity 
                key={key} 
                style={[styles.row, index !== Object.keys(equipmentData).length - 1 && styles.borderBottom]}
                onPress={() => openBottomSheet(key)}
              >
                <Text style={styles.rowLabel}>{item.label}</Text>
                <View style={styles.rowRight}>
                  {item.logo ? (
                    <Image source={typeof item.logo === 'string' ? { uri: item.logo } : item.logo} style={styles.brandLogoSmall} resizeMode="contain" />
                  ) : (
                    <Text style={[styles.rowValue, key === 'hand' && styles.textBlue]}>{item.value}</Text>
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
            <Text style={styles.sheetTitle}>{selectedType ? equipmentData[selectedType].label : ''}</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.brandList}>
            {brands.map((brand) => (
              <TouchableOpacity 
                key={brand.id} 
                style={styles.brandItem}
                onPress={() => handleSelectBrand(brand)}
              >
                {brand.logo ? (
                   <Image source={typeof brand.logo === 'string' ? { uri: brand.logo } : brand.logo} style={styles.brandLogoLarge} resizeMode="contain" />
                ) : (
                  <Text style={styles.brandNameFallback}>{brand.name}</Text>
                )}
                {selectedType && equipmentData[selectedType].value === brand.name && (
                  <Ionicons name="checkmark-circle" size={22} color="#0055D4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F6F9" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 8, borderWidth: 1, borderColor: "#E5E7EB", alignItems: "center", justifyContent: "center", backgroundColor: '#FFF' },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#1A1A1A" },
  placeholder: { width: 36 },
  scrollContent: { padding: 16 },
  card: { backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 16 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  rowLabel: { fontSize: 15, color: '#333' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  rowValue: { fontSize: 15, color: '#666', marginRight: 8 },
  textBlue: { color: '#007AFF' },
  brandLogoSmall: { width: 100, height: 25, marginRight: 8 },
  
  // Sheet Styles
  sheetContent: { flex: 1, paddingHorizontal: 16 },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontWeight: '600' },
  brandList: { marginTop: 10 },
  brandItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#EEE' },
  brandLogoLarge: { width: 90, height: 15 },
  brandNameFallback: { fontSize: 16, fontWeight: '500' }
});