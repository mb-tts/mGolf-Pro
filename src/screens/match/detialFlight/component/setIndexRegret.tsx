import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OPTIONS = [
  { id: 'di', label: 'Index hố đường đi x2 -1' },
  { id: 've', label: 'Index hố đường về x2 -1' },
];

export default function SetIndexRegret() {
  // ✅ useState phải nằm bên trong function component
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedId, setSelectedId]       = useState('ve');
  const selectedOption = OPTIONS.find((o) => o.id === selectedId);

  return (
    <View>
      <TouchableOpacity style={styles.footerRow} onPress={() => setFilterVisible(true)}>
        <Text style={styles.footerText}>{selectedOption?.label}</Text>
        <Ionicons name="create-outline" size={20} color="#0066B2" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setFilterVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.bottomSheet}>
            <View style={styles.dragHandleWrap}>
              <View style={styles.dragHandle} />
            </View>

            <View style={styles.sheetHeader}>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.sheetTitle}>Cập nhật Index hố</Text>
              <View style={{ width: 24 }} />
            </View>

            <View style={styles.sheetBody}>
              {OPTIONS.map((item) => {
                const isSelected = selectedId === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.8}
                    style={[
                      styles.optionItem,
                      isSelected ? styles.selectedBorder : styles.unselectedBorder,
                    ]}
                    onPress={() => setSelectedId(item.id)}
                  >
                    <View style={styles.optionRow}>
                      <Text style={styles.optionLabel}>{item.label}</Text>
                      <Ionicons name="help-circle-outline" size={20} color="#9CA3AF" style={{ marginLeft: 6 }} />
                    </View>
                    <Ionicons
                      name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                      size={24}
                      color={isSelected ? '#0066B2' : '#9CA3AF'}
                    />
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity style={styles.updateButton} onPress={() => setFilterVisible(false)}>
                <Text style={styles.updateButtonText}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerText: { fontSize: 13, color: '#4B5563' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '55%',
    paddingTop: 8,
  },
  dragHandleWrap: { alignItems: 'center', marginBottom: 12 },
  dragHandle:     { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2 },

  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sheetTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
  sheetBody:  { padding: 20 },

  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 16,
  },
  selectedBorder:   { borderColor: '#0066B2' },
  unselectedBorder: { borderColor: '#E5E7EB' },
  optionRow:    { flexDirection: 'row', alignItems: 'center' },
  optionLabel:  { fontSize: 16, color: '#1F2937' },

  updateButton: {
    backgroundColor: '#0066B2',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});
