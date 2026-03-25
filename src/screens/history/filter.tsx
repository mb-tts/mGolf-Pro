import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface FilterBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: () => void;
  onClear: () => void;
}

const FilterBottomSheet: React.FC<FilterBottomSheetProps> = ({
  visible,
  onClose,
  onApply,
  onClear,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

     
      <View style={styles.bottomSheetContainer}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color={Colors.text || '#1A1A1A'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Bộ lọc</Text>
          <View style={{ width: 24 }} /> 
        </View>

        
        <View style={styles.content}>
         
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mùa giải</Text>
            
            <TouchableOpacity style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>Chọn mùa giải</Text>
              <Ionicons name="chevron-down" size={20} color={Colors.textSecondary || '#6B7280'} />
            </TouchableOpacity>
          </View>

          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Khoảng thời gian</Text>
            <View style={styles.dateRow}>
              
              <View style={styles.dateInputWrapper}>
                <Text style={styles.dateLabel}>Từ</Text>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateText}>20/10/2023</Text>
                  <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary || '#6B7280'} />
                </View>
              </View>

              
              <View style={{ width: 12 }} />

              
              <View style={styles.dateInputWrapper}>
                <Text style={styles.dateLabel}>Đến</Text>
                <View style={styles.dateInputContainer}>
                  <Text style={styles.dateText}>20/10/2023</Text>
                  <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary || '#6B7280'} />
                </View>
              </View>
            </View>
          </View>
        </View>

        
        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearButton} onPress={onClear}>
            <Text style={styles.clearButtonText}>Xóa tất cả</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
            <Text style={styles.applyButtonText}>Áp dụng bộ lọc</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  bottomSheetContainer: {
    backgroundColor: Colors.white || '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 32, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6', 
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text || '#1A1A1A',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text || '#1A1A1A',
    marginBottom: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.textSecondary || '#6B7280',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateInputWrapper: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: Colors.textSecondary || '#6B7280',
    marginBottom: 4,
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dateText: {
    fontSize: 14,
    color: Colors.text || '#1A1A1A',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 8,
  },
  clearButton: {
    paddingVertical: 12,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.textSecondary || '#6B7280',
  },
  applyButton: {
    backgroundColor: Colors.primary || '#0066FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 24,
    alignItems: 'center',
  },
  applyButtonText: {
    color: Colors.white || '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default FilterBottomSheet;