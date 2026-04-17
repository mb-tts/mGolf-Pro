import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export const PaymentSettingsScreen = () => {

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt thanh toán</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.content}>
        <Image source={require('../../../../assets/images/incoming.png') } style={{ width: 260, height: 170}} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={{ fontSize: 14, color: '#666' }}>Tính năng đang được phát triển</Text>
      </View>
    </SafeAreaView>
  )
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
    content: {
    paddingTop: 70,
    alignItems: 'center',
  },
})