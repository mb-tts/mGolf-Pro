import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HoleDetailScreen = ({ route, navigation }: any) => {
  // Lấy dữ liệu truyền từ màn hình danh sách sang
  const { holeData, scorecard, courseName } = route.params || {};
  
  // Quản lý state để khi bấm thanh trượt ở dưới, dữ liệu sẽ thay đổi
  const [currentHole, setCurrentHole] = useState(holeData || scorecard?.[0]);

  // Dữ liệu giả lập cho các trường chi tiết (do trong file outingData.ts của bạn chưa có)
  const dummyDetails = {
    teeTournament: "450 yards",
    teeMen: "420 yards",
    teeWomen: "380 yards",
    layout: "Hình chữ S, fairway uốn nhẹ sang phải.",
    obstacles: "Bunker phải fairway, hồ nước trước và bên phải green.",
    green: "Green tròn, hơi dốc xuống phía trước.",
  };

  const renderBottomHoleItem = ({ item }: { item: any }) => {
    const isActive = currentHole.hole === item.hole;
    return (
      <TouchableOpacity 
        style={[styles.bottomHoleBtn, isActive && styles.bottomHoleBtnActive]}
        onPress={() => setCurrentHole(item)}
      >
        <ImageBackground 
          source={{ uri: item.image || 'https://picsum.photos/200' }} 
          style={styles.bottomHoleImage}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.bottomHoleOverlay}>
            <Text style={styles.bottomHoleText}>{item.hole}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (!currentHole) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết hố</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* HERO IMAGE SECTION */}
        <ImageBackground
          source={{ uri: currentHole.image || 'https://picsum.photos/600/400' }}
          style={styles.heroImage}
          imageStyle={{ borderRadius: 16 }}
        >
          {/* Cục số hố ở góc trái trên */}
          <View style={styles.holeNumberBadge}>
            <Text style={styles.holeNumberBadgeText}>{currentHole.hole}</Text>
          </View>

          {/* Lớp phủ màu đen gradient ở dưới để nổi chữ */}
          <View style={styles.darkOverlay}>
            <Text style={styles.courseInfoText}>
              {courseName || "Sân Golf"} - Lỗ số {currentHole.hole}/{scorecard?.length || 18}
            </Text>
            
            <View style={styles.tagsRow}>
              <View style={styles.tagDark}>
                <Text style={styles.tagTextWhite}>Par {currentHole.par}</Text>
              </View>
              <View style={styles.tagDark}>
                <Text style={styles.tagTextWhite}>{currentHole.yard || 0} yards</Text>
              </View>
              <View style={styles.tagDark}>
                <Text style={styles.tagTextWhite}>Độ khó {currentHole.strokeIndex || '?'}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* NÚT BẤM BẢN ĐỒ & VIDEO */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
            <Ionicons name="map-outline" size={16} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Xem bản đồ hố</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
            <Ionicons name="videocam-outline" size={16} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Xem video hố</Text>
          </TouchableOpacity>
        </View>

        {/* THÔNG TIN CHI TIẾT */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Lỗ số {currentHole.hole}</Text>
          
          <Text style={styles.boldLabel}>Khoảng cách:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletText}>• Tee Giải Đấu: {currentHole.teeTournament || dummyDetails.teeTournament}</Text>
            <Text style={styles.bulletText}>• Tee Nam: {currentHole.teeMen || dummyDetails.teeMen}</Text>
            <Text style={styles.bulletText}>• Tee Nữ: {currentHole.teeWomen || dummyDetails.teeWomen}</Text>
          </View>

          <Text style={styles.detailParagraph}>
            <Text style={styles.boldLabel}>Sơ đồ lỗ: </Text>
            {currentHole.layout || dummyDetails.layout}
          </Text>

          <Text style={styles.detailParagraph}>
            <Text style={styles.boldLabel}>Chướng ngại vật: </Text>
            {currentHole.obstacles || dummyDetails.obstacles}
          </Text>

          <Text style={styles.detailParagraph}>
            <Text style={styles.boldLabel}>Chi tiết green: </Text>
            {currentHole.green || dummyDetails.green}
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM SLIDER CHỌN HỐ */}
      <View style={styles.bottomSliderContainer}>
        <FlatList
          data={scorecard}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.hole.toString()}
          renderItem={renderBottomHoleItem}
          contentContainerStyle={styles.bottomSliderList}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  
  // Header
  headerContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  headerRight: { width: 40 },

  scrollContent: { padding: 16, paddingBottom: 100 }, // Padding bottom để không bị đè bởi thanh slider

  // Hero Image
  heroImage: {
    width: '100%', height: 280, borderRadius: 16, marginBottom: 16,
    overflow: 'hidden', justifyContent: 'space-between',
  },
  holeNumberBadge: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center', margin: 16,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
  },
  holeNumberBadgeText: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  darkOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)', padding: 16, paddingTop: 30, // Tạo hiệu ứng gradient mờ đen
  },
  courseInfoText: { color: '#FFFFFF', fontSize: 13, fontWeight: '500', marginBottom: 8 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagDark: {
    backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
  },
  tagTextWhite: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },

  // Buttons
  actionButtonsContainer: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0066FF',
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, gap: 6,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },

  // Details
  detailsContainer: { paddingHorizontal: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  boldLabel: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  bulletList: { marginLeft: 8, marginBottom: 12 },
  bulletText: { fontSize: 14, color: '#4B5563', lineHeight: 24 },
  detailParagraph: { fontSize: 14, color: '#4B5563', lineHeight: 22, marginBottom: 12 },

  // Bottom Slider
  bottomSliderContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: '#F3F4F6',
    elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.05, shadowRadius: 5,
  },
  bottomSliderList: { paddingHorizontal: 16, gap: 12, alignItems: 'center' },
  bottomHoleBtn: { width: 40, height: 40, borderRadius: 20 },
  bottomHoleBtnActive: { borderWidth: 2, borderColor: '#0066FF' },
  bottomHoleImage: { width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden' },
  bottomHoleOverlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center', borderRadius: 20,
  },
  bottomHoleText: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
});

export default HoleDetailScreen;