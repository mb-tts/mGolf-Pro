import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import CustomSwitch from '../../../components/button/CustomSwitch'; 

export const OutingNotificationScreen = () => {
  const navigation = useNavigation();
  
  const [isMatchNotify, setIsMatchNotify] = useState(true);
  const [isRankNotify, setIsRankNotify] = useState(true);
  const [isBirdieNotify, setIsBirdieNotify] = useState(true);

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
        <Text style={styles.headerTitle}>Thông báo outing</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          
          {/* Thông báo kết quả trận đấu */}
          <View style={[styles.row, styles.borderBottom]}>
            <Text style={styles.rowLabel}>Thông báo kết quả trận đấu</Text>
            <CustomSwitch 
              value={isMatchNotify} 
              onValueChange={setIsMatchNotify} 
            />
          </View>

          {/* Thông báo thứ hạng */}
          <View style={[styles.row, styles.borderBottom]}>
            <Text style={styles.rowLabel}>Thông báo thứ hạng</Text>
            <CustomSwitch 
              value={isRankNotify} 
              onValueChange={setIsRankNotify} 
            />
          </View>

          {/* Thông báo thành viên đạt birdie */}
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Thông báo thành viên đạt birdie</Text>
            <CustomSwitch 
              value={isBirdieNotify} 
              onValueChange={setIsBirdieNotify} 
            />
          </View>

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
});