import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

interface PlayerScore {
  name: string;
  avatar: string;
  score: number;
}

interface HoleResult {
  id: string;
  holeNumber: number;
  primaryPlayer: {
    name: string;
    avatar: string;
  };
  otherPlayers: PlayerScore[];
  total: number;
}

const MOCK_DATA: HoleResult[] = [1, 2, 3, 4, 5, 6, 7].map((num) => ({
  id: num.toString(),
  holeNumber: num,
  primaryPlayer: {
    name: 'N.Linh',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  otherPlayers: [
    { name: 'N.Anh', score: 1, avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'N.Nam', score: 2, avatar: 'https://i.pravatar.cc/150?img=13' },
    { name: 'N.Huy', score: -1, avatar: 'https://i.pravatar.cc/150?img=14' },
  ],
  total: 2,
}));

const TABS = ['Tất cả', '1', '2', '3', '4', '5', '6', '7'];

export default function ValueRegret() {
  const [activeTab, setActiveTab] = useState('Tất cả');

  // Logic lọc dữ liệu: Nếu chọn "Tất cả" thì hiện hết, nếu chọn số thì lọc đúng số đó
  const filteredData = useMemo(() => {
    if (activeTab === 'Tất cả') return MOCK_DATA;
    return MOCK_DATA.filter((item) => item.holeNumber.toString() === activeTab);
  }, [activeTab]);

  const renderHoleItem = ({ item }: { item: HoleResult }) => (
    <View style={styles.holeRow}>
      <View style={styles.primaryCol}>
        <View style={styles.holeBadge}>
          <Text style={styles.holeBadgeText}>{item.holeNumber}</Text>
        </View>
        <Image source={{ uri: item.primaryPlayer.avatar }} style={styles.avatar} />
        <Text style={styles.playerName}>{item.primaryPlayer.name}</Text>
      </View>

      <View style={styles.othersContainer}>
        {item.otherPlayers.map((player, index) => (
          <View key={index} style={styles.playerScoreBox}>
            <Image source={{ uri: player.avatar }} style={styles.avatarSmall} />
            <Text style={styles.playerNameSmall}>{player.name}</Text>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>
                {player.score > 0 ? `+${player.score}` : player.score}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalCol}>
        <Text style={styles.totalLabel}>Tổng</Text>
        <View style={styles.totalBadge}>
          <Text style={styles.totalBadgeText}>+{item.total}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kết quả từng hố</Text>

      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            const isAll = tab === 'Tất cả';
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  isAll ? styles.tabPill : styles.tabCircle,
                  isActive ? styles.activeTab : styles.inactiveTab,
                ]}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderHoleItem}
          scrollEnabled={false} 
          ListEmptyComponent={
            <Text style={styles.emptyText}>Không có dữ liệu cho hố này.</Text>
          }
        />
      </View>
    </View>
  );
}

// --- STYLES ---
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFFFFF' },
  title: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 },
  
  // Tabs Style mới
  tabsWrapper: { flexDirection: 'row', marginBottom: 20 },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1.5,
  },
  tabCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabPill: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
  },
  activeTab: {
    borderColor: '#0066B2',
    backgroundColor: '#FFFFFF',
  },
  inactiveTab: {
    borderColor: '#D1D5DB',
    borderStyle: 'dashed', // Tạo viền nét đứt
    backgroundColor: '#FFFFFF',
  },
  tabText: { color: '#6B7280', fontWeight: '500', fontSize: 15 },
  activeTabText: { color: '#0066B2' },

  // List & Row
  listContainer: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  holeRow: { flexDirection: 'row', backgroundColor: '#FFFFFF' },
  primaryCol: {
    width: 85,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#F0F7FF', // Màu nền xanh nhạt cho cột hố
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  holeBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomRightRadius: 12,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  holeBadgeText: { fontSize: 13, fontWeight: 'bold', color: '#374151' },
  
  othersContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16 },
  totalCol: { width: 75, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#E5E7EB' },
  
  avatar: { width: 44, height: 44, borderRadius: 22, marginTop: 10 },
  avatarSmall: { width: 34, height: 34, borderRadius: 17 },
  playerName: { fontSize: 14, color: '#374151', fontWeight: '500', marginTop: 4 },
  playerScoreBox: { alignItems: 'center' },
  playerNameSmall: { fontSize: 12, color: '#6B7280', marginVertical: 4 },
  
  scoreBadge: { paddingHorizontal: 12, paddingVertical: 3, borderRadius: 15, borderWidth: 1, borderColor: '#E5E7EB' },
  scoreText: { fontSize: 13, fontWeight: '600', color: '#0066B2' },
  
  totalLabel: { fontSize: 14, color: '#0066B2', fontWeight: '600', marginBottom: 6 },
  totalBadge: { backgroundColor: '#0066B2', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  totalBadgeText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', padding: 20, color: '#9CA3AF' }
});