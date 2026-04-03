import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import CustomSwitch from '../../../components/button/CustomSwitch';
import type { AppStackParamList } from '../../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NotificationNavigationProp = NativeStackNavigationProp<AppStackParamList>;
export const SecurityScreen = () => {
  const navigation = useNavigation<NotificationNavigationProp>();
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(true);
  const [isHiddenMatches, setIsHiddenMatches] = useState(true);

  const handleBack = () => {
    navigation.goBack();
  };
    
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
        
        {/* HEADER ĐỒNG BỘ */}
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bảo mật và Quyền riêng tư</Text>
            <View style={styles.placeholder} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.sectionTitle}>Bảo mật</Text>
            
            {/* Card 1: Đăng nhập sinh trắc học (Nằm rời) */}
            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.rowLabel}>Đăng nhập sinh trắc học</Text>
                    <CustomSwitch 
                    value={isBiometricEnabled} 
                    onValueChange={setIsBiometricEnabled} 
                    />
                </View>
            </View>

            {/* Card 2: Các cài đặt tài khoản */}
            <View style={[styles.card, styles.marginTop12]}>
                <TouchableOpacity style={[styles.row, styles.borderBottom]} onPress={() => navigation.navigate('PasswordChange')}>
                    <Text style={styles.rowLabel}>Thay đổi mật khẩu</Text>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.row, styles.borderBottom]}>
                    <Text style={styles.rowLabel}>Quên mật khẩu</Text>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.row}>
                    <Text style={[styles.rowLabel, styles.textDanger]}>Xoá tài khoản</Text>
                    <Ionicons name="chevron-forward" size={18} color="#999" />
                </TouchableOpacity>
            </View>

            {/* ================= SECTION: QUYỀN RIÊNG TƯ ================= */}
            <Text style={[styles.sectionTitle, styles.marginTop24]}>Quyền riêng tư</Text>
            
            {/* Card 3: Cài đặt quyền riêng tư */}
            <View style={styles.card}>
            <View style={[styles.row, styles.borderBottom]}>
                <Text style={styles.rowLabel}>Ẩn các trận đã chơi với mọi người</Text>
                <CustomSwitch 
                value={isHiddenMatches} 
                onValueChange={setIsHiddenMatches} 
                />
            </View>

            <TouchableOpacity style={styles.row}>
                <Text style={styles.rowLabel}>Ẩn theo dõi</Text>
                <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>
            </View>

        </ScrollView>
        </SafeAreaView>
    );
    }

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
    paddingTop: 10,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A4A4A',
    marginLeft: 4,
    marginBottom: 8,
  },
  marginTop12: {
    marginTop: 12,
  },
  marginTop24: {
    marginTop: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  row: {
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
  rowLabel: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  textDanger: {
    color: '#FF3B30', 
  },
});