import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface HoleOrder {
  id: number;
}

const initialData: HoleOrder[] = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
}));

export default function OrderRegret({ navigation }: any) {
  const [holes, setHoles] = useState<HoleOrder[]>(initialData);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation?.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Chỉnh sửa thứ tự hố chơi</Text>
      <View style={{ width: 40 }} />
    </View>
  );

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Thứ tự hố</Text>
      <Text style={styles.tableHeaderText}>Sắp xếp</Text>
    </View>
  );

  const renderItem = ({ item }: { item: HoleOrder }) => (
    <View style={styles.row}>
      <View style={styles.holeCol}>
        <View style={styles.holeCircle}>
          <Text style={styles.holeNumber}>{item.id}</Text>
        </View>
      </View>

      <View style={styles.middleCol} />

      <View style={styles.actionCol}>
        <TouchableOpacity style={styles.iconBtn}>
          <MaterialCommunityIcons name="format-vertical-align-top" size={22} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="menu" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}

      <View style={styles.container}>
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={holes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Đặt lại</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveBtnText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  tableContainer: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0F7FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFF',
  },
  holeCol: {
    width: 60,
    alignItems: 'center',
  },
  holeCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holeNumber: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  middleCol: {
    flex: 1,
  },
  actionCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconBtn: {
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginBottom: 40,
  },
  resetBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0066B2',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  resetBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066B2',
  },
  saveBtn: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0066B2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
