import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const AboutUsScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Về chúng tôi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* KHỐI 1: LOGO VÀ PHIÊN BẢN */}
        <View style={styles.logoCard}>
          <Image 
            source={require('../../../../assets/icons/icon.png')} // Ví dụ đường dẫn
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.versionText}>mGolf version 1.0.1</Text>
        </View>

        {/* KHỐI 2: MENU TÙY CHỌN */}
        <View style={styles.menuCard}>
          
          {/* Đánh giá 5 sao */}
          <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
            <Text style={styles.menuText}>Đánh giá 5 sao</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Chia sẻ ứng dụng */}
          <TouchableOpacity style={[styles.menuItem, styles.borderBottom]}>
            <Text style={styles.menuText}>Chia sẻ ứng dụng</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Giới thiệu về ứng dụng */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Giới thiệu về ứng dụng</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

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
    paddingTop: 16,
    paddingBottom: 40,
  },
  
  // Styles cho Khối Logo
  logoCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  versionText: {
    fontSize: 14,
    color: '#4B5563', // Màu chữ xám vừa
    fontWeight: '400',
  },

  // Styles cho Khối Menu
  menuCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6', // Đường viền ngăn cách rất mờ
  },
  menuText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '400',
  },
});