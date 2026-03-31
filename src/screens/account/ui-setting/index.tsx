import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const UISettingsScreen = () => {
  const navigation = useNavigation();
  // State để lưu cấu hình: 'light' hoặc 'dark'
  const [theme, setTheme] = useState('light');

  const handleBack = () => {
    navigation.goBack();
  };

  const options = [
    { id: 'light', label: 'Giao diện sáng' },
    { id: 'dark', label: 'Giao diện tối' },
  ];

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cấu hình giao diện</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                index !== options.length - 1 && styles.borderBottom
              ]}
              activeOpacity={0.7}
              onPress={() => setTheme(option.id)}
            >
              <Text style={styles.optionText}>{option.label}</Text>
              <View style={[
                styles.checkbox,
                theme === option.id ? styles.checkboxSelected : styles.checkboxUnselected
              ]}>
                {theme === option.id && (
                  <Ionicons name="checkmark" size={16} color="#FFF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#F4F6F9" 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    backgroundColor: "#F4F6F9"
  },
  backBtn: { 
    width: 36, 
    height: 36, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#E5E7EB", 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: '#FFF'
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#1A1A1A" 
  },
  placeholder: { 
    width: 36 
  },
  scrollContent: { 
    paddingHorizontal: 16,
    paddingTop: 20 
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden', // Để bo góc các item bên trong
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#0055D4', // Màu xanh đặc trưng
    borderColor: '#0055D4',
  },
  checkboxUnselected: {
    backgroundColor: '#FFF',
    borderColor: '#D1D5DB',
  },
});