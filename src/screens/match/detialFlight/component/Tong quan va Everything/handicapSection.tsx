import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  MOCK_PLAYERS,
  PERSONAL_MATCHUPS,
  TEAM_MATCHUPS,
  HandicapMatchup,
  getPlayer,
} from '../../mock-data';

const OPTIONS = [
  { id: 'di', label: 'Index hố đường đi x2 -1' },
  { id: 've', label: 'Index hố đường về x2 -1' },
];

export default function HandicapSection() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedId, setSelectedId]       = useState('ve');
  const selectedOption = OPTIONS.find((o) => o.id === selectedId);

  const renderMatchupRow = (matchup: HandicapMatchup) => (
    <View key={matchup.id} style={styles.matchupRow}>
      <View style={styles.playersContainer}>
        <View style={styles.playerGroup}>
          {matchup.playersLeft.map((id) => {
            const p = getPlayer(id);
            return (
              <View key={id} style={styles.playerInfo}>
                <Image source={{ uri: p?.avatarUrl }} style={styles.smallAvatar} />
                <Text style={styles.miniName}>{p?.shortName}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.chapBadge}>
          <Text style={styles.chapText}>Chấp</Text>
        </View>

        <View style={styles.playerGroup}>
          {matchup.playersRight.map((id) => {
            const p = getPlayer(id);
            return (
              <View key={id} style={styles.playerInfo}>
                <Image source={{ uri: p?.avatarUrl }} style={styles.smallAvatar} />
                <Text style={styles.miniName}>{p?.shortName}</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.holeList}>
        {matchup.holes.map((h, i) => (
          <View key={i} style={styles.holeCircle}>
            <Text style={styles.holeText}>{h}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.overviewTitle}>Tổng quan</Text>

      {/* HDC header */}
      <View style={styles.hdcHeader}>
        {MOCK_PLAYERS.map((p) => (
          <View key={p.id} style={styles.hdcItem}>
            <Image source={{ uri: p.avatarUrl }} style={styles.topAvatar} />
            <View style={styles.hdcBadge}>
              <Text style={styles.hdcText}>HDC {p.hdc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Chấp cá nhân */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Chấp theo cá nhân</Text>
        {PERSONAL_MATCHUPS.map(renderMatchupRow)}

        <TouchableOpacity style={styles.footerRow} onPress={() => setFilterVisible(true)}>
          <Text style={styles.footerText}>{selectedOption?.label}</Text>
          <Ionicons name="create-outline" size={20} color="#0066B2" />
        </TouchableOpacity>

        {/* Modal chọn index hố */}
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

      {/* Chấp team */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Chấp theo team</Text>
        {TEAM_MATCHUPS.map(renderMatchupRow)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:     { padding: 16 },
  overviewTitle: { marginBottom: 10, fontSize: 14, fontWeight: '500' },

  hdcHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  hdcItem:   { alignItems: 'center' },
  topAvatar: { width: 45, height: 45, borderRadius: 22.5, marginBottom: 8 },
  hdcBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  hdcText: { fontSize: 11, color: '#6B7280' },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 16 },

  matchupRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  playerGroup: { flexDirection: 'row', gap: 8, flex: 1, justifyContent: 'center' },
  playerInfo:  { alignItems: 'center' },
  smallAvatar: { width: 28, height: 28, borderRadius: 14 },
  miniName:    { fontSize: 10, color: '#6B7280', marginTop: 2 },

  chapBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  chapText: { fontSize: 12, color: '#0284C7', fontWeight: '500' },

  holeList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, maxWidth: 120 },
  holeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  holeText: { fontSize: 11, color: '#374151' },

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
    height: '50%',
    paddingTop: 8,
  },
  dragHandleWrap: { alignItems: 'center', marginBottom: 12 },
  dragHandle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2 },
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
  selectedBorder:   { borderColor: '#0066B2', backgroundColor: '#FFFFFF' },
  unselectedBorder: { borderColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  optionRow:  { flexDirection: 'row', alignItems: 'center' },
  optionLabel: { fontSize: 16, color: '#1F2937', fontWeight: '400' },

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