import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dữ liệu avatar demo
const TOP_PLAYERS = [
  { id: '1', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '3', avatar: 'https://i.pravatar.cc/150?img=13' },
  { id: '4', avatar: 'https://i.pravatar.cc/150?img=14' },
];

export default function RoamingHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarGroup}>
        {TOP_PLAYERS.map((item, index) => (
          <Image 
            key={item.id} 
            source={{ uri: item.avatar }} 
            style={[
              styles.headerAvatar,
            ]} 
          />
        ))}
      </View>

      <View style={styles.actionGroup}>
        <TouchableOpacity style={styles.roamingBtn}>
          <Text style={styles.roamingText}>Roaming</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color="#0066B2" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF', // Viền trắng để phân tách khi xếp chồng
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roamingBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  roamingText: {
    fontSize: 14,
    color: '#0066B2', // Màu xanh đặc trưng của tab đang chọn
    fontWeight: '500',
  },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});