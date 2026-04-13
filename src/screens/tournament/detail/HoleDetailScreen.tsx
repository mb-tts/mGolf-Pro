import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '@/types/navigation.types';
import type { HoleData } from '@/types/golf.types';

type Props = NativeStackScreenProps<AppStackParamList, 'HoleDetailScreen'>;

const HoleDetailScreen = ({ route, navigation }: Props) => {
  const { holeData, scorecard, courseName } = route.params || {};
  const [currentHole, setCurrentHole] = useState(holeData || scorecard?.[0]);

  const renderBottomHoleItem = ({ item }: { item: HoleData }) => {
    const isActive = currentHole?.hole === item.hole;
    
    // Xử lý ảnh cho thanh trượt dưới cùng
    const thumbSource = typeof item.image === 'string' 
      ? { uri: item.image } 
      : (item.image || { uri: 'https://picsum.photos/200' });

    return (
      <TouchableOpacity 
        style={[styles.bottomHoleBtn, isActive && styles.bottomHoleBtnActive]}
        onPress={() => setCurrentHole(item)}
        activeOpacity={0.7}
      >
        <ImageBackground 
          source={thumbSource} 
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

  // Xử lý ảnh cho Hero (Ảnh to trên cùng)
  const heroSource = typeof currentHole.image === 'string'
    ? { uri: currentHole.image }
    : (currentHole.image || { uri: 'https://picsum.photos/600/400' });

  // ĐÃ SỬA: Xử lý ảnh cho Bản đồ hố thông minh hơn
  // Ưu tiên ảnh layoutImage từ data, nếu không có mới dùng ảnh mặc định golfmap1.png
  const mapSource = currentHole.layoutImage 
    ? (typeof currentHole.layoutImage === 'string' 
        ? { uri: currentHole.layoutImage } 
        : currentHole.layoutImage)
    : require("../../../../assets/images/golfmap1.png");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* ─── HEADER ─── */}
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
        
        {/* ─── ẢNH COVER (HERO IMAGE) ─── */}
        <ImageBackground
          source={heroSource}
          style={styles.heroImage}
          imageStyle={{ borderRadius: 16 }}
        >
          <View style={styles.holeNumberBadge}>
            <Text style={styles.holeNumberBadgeText}>{currentHole.hole}</Text>
          </View>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.darkOverlay}
          >
            <Text style={styles.courseInfoText}>
              {courseName || "Sân Golf"} - Lỗ số {currentHole.hole}/{scorecard?.length || 18}
            </Text>
            
            <View style={styles.tagsRow}>
              <View style={styles.tagDark}>
                <Text style={styles.tagTextWhite}>Par {currentHole.par || '-'}</Text>
              </View>
              <View style={styles.tagDark}>
                <Text style={styles.tagTextWhite}>{currentHole.yard || 0} yards</Text>
              </View>
              <View style={styles.tagDark}>
                <Text style={styles.tagTextWhite}>Độ khó {currentHole.strokeIndex || '-'}</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* ─── 2 NÚT BẢN ĐỒ & VIDEO ─── */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            activeOpacity={0.8} 
            onPress={() => navigation.navigate("HoleMapScreen", { currentHole, courseName })}
          >
            <Ionicons name="map-outline" size={16} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Xem bản đồ hố</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}
          onPress={() => navigation.navigate("HoleVideoScreen", { currentHole })}>
            <Ionicons name="videocam-outline" size={16} color="#FFFFFF" />
            <Text style={styles.primaryBtnText}>Xem video hố</Text>
          </TouchableOpacity>
        </View>

        {/* ─── NỘI DUNG CHI TIẾT TEXT ─── */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Lỗ số {currentHole.hole}</Text>
          
          <Text style={styles.boldLabel}>Khoảng cách:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletText}>• Tee Giải Đấu: {currentHole.teeTournament || "Đang cập nhật"}</Text>
            <Text style={styles.bulletText}>• Tee Nam: {currentHole.teeMen || "Đang cập nhật"}</Text>
            <Text style={styles.bulletText}>• Tee Nữ: {currentHole.teeWomen || "Đang cập nhật"}</Text>
          </View>

          <Text style={styles.detailParagraph}>
            <Text style={styles.boldLabel}>Sơ đồ lỗ: </Text>
            {currentHole.layout || "Đang cập nhật dữ liệu sơ đồ lỗ."}
          </Text>

          <Text style={styles.detailParagraph}>
            <Text style={styles.boldLabel}>Chướng ngại vật: </Text>
            {currentHole.obstacles || "Đang cập nhật dữ liệu chướng ngại vật."}
          </Text>

          <Text style={styles.detailParagraph}>
            <Text style={styles.boldLabel}>Chi tiết green: </Text>
            {currentHole.greenDetail || "Đang cập nhật chi tiết green."}
          </Text>
        </View>

        {/* ─── ẢNH SƠ ĐỒ BẢN ĐỒ HỐ (MAP IMAGE) Ở DƯỚI CÙNG ─── */}
        <View style={styles.mapImageContainer}>
          <Image 
            source={mapSource} 
            style={styles.mapImage}
            resizeMode="contain" 
          />
        </View>
        
      </ScrollView>

      {/* ─── THANH TRƯỢT CHỌN HỐ Ở ĐÁY ─── */}
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
  
  headerContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF', zIndex: 10,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
  headerRight: { width: 40 },

  scrollContent: { padding: 16, paddingBottom: 100 },

  heroImage: {
    width: '100%', height: 280, borderRadius: 16, marginBottom: 16,
    overflow: 'hidden', justifyContent: 'space-between',
  },
  holeNumberBadge: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF',
    justifyContent: 'center', alignItems: 'center', margin: 16,
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
  },
  holeNumberBadgeText: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  
  darkOverlay: {
    padding: 16, paddingTop: 40, justifyContent: 'flex-end',
  },
  courseInfoText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 10 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tagDark: {
    backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  tagTextWhite: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },

  actionButtonsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  primaryBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#0066FF', paddingVertical: 12, borderRadius: 8, gap: 6,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },

  detailsContainer: { paddingHorizontal: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 16 },
  boldLabel: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 6 },
  bulletList: { marginLeft: 8, marginBottom: 16 },
  bulletText: { fontSize: 15, color: '#4B5563', lineHeight: 26 },
  detailParagraph: { fontSize: 15, color: '#4B5563', lineHeight: 24, marginBottom: 16 },

  mapImageContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 480, 
    borderRadius: 12,
  },

  bottomSliderContainer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFFFFF', paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: '#F3F4F6',
    elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.05, shadowRadius: 5,
  },
  bottomSliderList: { paddingHorizontal: 16, gap: 12, alignItems: 'center' },
  bottomHoleBtn: { width: 44, height: 44, borderRadius: 22 },
  bottomHoleBtnActive: { borderWidth: 2, borderColor: '#0066FF' },
  bottomHoleImage: { width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden' },
  bottomHoleOverlay: {
    ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center', alignItems: 'center', borderRadius: 22,
  },
  bottomHoleText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});

export default HoleDetailScreen;