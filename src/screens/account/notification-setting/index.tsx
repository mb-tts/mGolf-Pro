import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AppStackParamList } from '../../../../App';

type NotificationNavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const NotificationSettingsScreen = () => {

  const navigation = useNavigation<NotificationNavigationProp>();
  const handleBack = () => {
    navigation.goBack();
  };

  const options = [
    { id: 'outing', label: 'Thông báo outing'},
    { id: 'personal', label: 'Thông báo cá nhân'},
  ]
    
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
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
              onPress={() => navigation.navigate(option.id === 'outing' ? 'OutingNotificationScreen' : 'PersonalNotificationScreen')}
            >
            <Text style={styles.optionText}>{option.label}</Text>
            <Ionicons name="chevron-forward" size={22} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
});
