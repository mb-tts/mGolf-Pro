import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Linking,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import PhoneSvg from '../../../../assets/icons/phone.svg';
import MessageSvg from '../../../../assets/icons/message.svg';
import WebsiteSvg from '../../../../assets/icons/website.svg';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';

export const ContactScreen = () => {
const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  // Hàm xử lý gọi điện
  const handleCallHotline = async () => {
    const phoneNumber = '0936110116';
    const url = `tel:${phoneNumber}`;
    
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Lỗi', 'Thiết bị của bạn không hỗ trợ chức năng gọi điện.');
      }
    } catch (error) {
      console.error('Lỗi khi mở cuộc gọi:', error);
    }
  };

  // Các hàm stub để bạn phát triển sau
  const handleSendEmail = () => {
    console.log('Chức năng gửi email sẽ phát triển sau');
    // Gợi ý sau này: Linking.openURL('mailto:support.cntt@mobifone.vn');
  };

  const handleOpenWebsite = () => {
    console.log('Chức năng mở website sẽ phát triển sau');
    // Gợi ý sau này: Linking.openURL('https://mgolf.vn');
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liên hệ với chúng tôi</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* CARD 1: HOTLINE */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <PhoneSvg width={44} height={44} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Hỗ trợ qua Hotline</Text>
            <Text style={styles.subtitle}>0936110116</Text>
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCallHotline}>
            <Text style={styles.actionText}>Liên hệ</Text>
          </TouchableOpacity>
        </View>

        {/* CARD 2: EMAIL */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <MessageSvg width={44} height={44} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Hỗ trợ qua Email</Text>
            <Text style={styles.subtitle}>support.cntt@mobifone.vn</Text>
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={handleSendEmail}>
            <Text style={styles.actionText}>Gửi Email</Text>
          </TouchableOpacity>
        </View>

        {/* CARD 3: WEBSITE */}
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <WebsiteSvg width={44} height={44} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>Hỗ trợ qua Website</Text>
            <Text style={[styles.subtitle, styles.textBlueLink]}>mgolf.vn</Text>
          </View>
          <TouchableOpacity style={styles.actionBtn} onPress={handleOpenWebsite}>
            <Text style={styles.actionText}>Truy cập</Text>
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
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
  },
  textBlueLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  actionBtn: {
    backgroundColor: '#F0F5FF', // Nền xanh nhạt cho nút
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary, // Chữ xanh đậm
  },
});
