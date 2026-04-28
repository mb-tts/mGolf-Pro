
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  DimensionValue
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from "@/hooks/useNavigation";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Line, Text as SvgText } from 'react-native-svg';
import { BackHeader } from '@/components/common/BackHeader';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── TỌA ĐỘ CÁC HỐ (1-18) CHUẨN MẪU FIGMA ───
const HOLE_LOCATIONS = [
  { id: 1, top: '27%', left: '16%', label: '1' },
  { id: 2, top: '15%', left: '35%', label: '2' },
  { id: 3, top: '16%', left: '68%', label: '3' },
  { id: 4, top: '28%', left: '88%', label: '4' },
  { id: 5, top: '35%', left: '72%', label: '5' },
  { id: 6, top: '40%', left: '46%', label: '6' },
  { id: 7, top: '43%', left: '20%', label: '7' },
  { id: 8, top: '53%', left: '10%', label: '8' },
  { id: 9, top: '56%', left: '85%', label: '9' },
  { id: 10, top: '58%', left: '60%', label: '10' },
  { id: 11, top: '65%', left: '35%', label: '11' },
  { id: 12, top: '74%', left: '12%', label: '12' },
  { id: 13, top: '78%', left: '38%', label: '13' },
  { id: 15, top: '83%', left: '70%', label: '15' }, 
  { id: 16, top: '90%', left: '85%', label: '16' },
  { id: 17, top: '92%', left: '50%', label: '17' },
  { id: 18, top: '88%', left: '15%', label: '18' },
];

// ─── TỌA ĐỘ CÁC ICON AVATAR ───
const AVATAR_LOCATIONS = [
  { id: 'a1', top: '15%', left: '42%', color: '#3B82F6' },
  { id: 'a2', top: '18%', left: '38%', color: '#22C55E' },
  { id: 'a3', top: '20%', left: '68%', color: '#F59E0B' },
  { id: 'a4', top: '28%', left: '12%', color: '#3B82F6' },
];

const HoleMapScreen = () => {
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const localMapImage = require("../../../../assets/images/golfmap2.jpg");

  // Hàm tính tọa độ X, Y tuyệt đối để vẽ đường SVG
  const getAbsoluteCoord = (percentString: string, dimension: number) => {
    const percent = parseFloat(percentString.replace('%', ''));
    return (percent / 100) * dimension;
  };

  const hole1X = getAbsoluteCoord('16%', SCREEN_WIDTH);
  const hole1Y = getAbsoluteCoord('27%', SCREEN_HEIGHT);
  const hole2X = getAbsoluteCoord('35%', SCREEN_WIDTH);
  const hole2Y = getAbsoluteCoord('15%', SCREEN_HEIGHT);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* ─── NỀN BẢN ĐỒ TOÀN MÀN HÌNH ─── */}
      <ImageBackground 
        source={localMapImage} 
        style={styles.mapBackground}
        resizeMode="cover"
      >
        {/* LỚP SVG ĐỂ VẼ ĐƯỜNG NỐI VÀ CHỮ 200m */}
        <View style={StyleSheet.absoluteFill}>
          <Svg height="100%" width="100%">
            <Line
              x1={hole1X}
              y1={hole1Y}
              x2={hole2X}
              y2={hole2Y}
              stroke="white"
              strokeWidth="2"
            />
            <SvgText
              x={(hole1X + hole2X) / 2 - 15}
              y={(hole1Y + hole2Y) / 2 - 10}
              fill="white"
              fontSize="14"
              fontWeight="bold"
              transform={`rotate(-35, ${(hole1X + hole2X) / 2}, ${(hole1Y + hole2Y) / 2})`}
            >
              200m
            </SvgText>
          </Svg>
        </View>

        {/* ─── VẼ 18 CHẤM SỐ HỐ (MÀU TRẮNG, CHỮ ĐEN) ─── */}
        {HOLE_LOCATIONS.map((point) => (
          <View 
            key={`hole-${point.id}`} 
            style={[
              styles.mapPoint, 
              { top: point.top as DimensionValue, left: point.left as DimensionValue }
            ]}
          >
            <Text style={styles.mapPointText}>{point.label}</Text>
          </View>
        ))}

        {/* ─── VẼ CÁC ICON AVATAR ─── */}
        {AVATAR_LOCATIONS.map((avatar) => (
          <View 
            key={avatar.id} 
            style={[
              styles.avatarContainer, 
              { top: avatar.top as DimensionValue, left: avatar.left as DimensionValue, backgroundColor: avatar.color }
            ]}
          >
            <Ionicons name="person" size={10} color="#FFFFFF" />
          </View>
        ))}
      </ImageBackground>

      {/* ─── HEADER ĐIỀU HƯỚNG TRONG SUỐT Ở TRÊN CÙNG ─── */}
      <BackHeader 
        title="Thông tin sân đấu"
        onBack={() => navigation.goBack()}
        variant="blur"
        rightAction={
          <TouchableOpacity style={styles.overlayButton} activeOpacity={0.7}>
            <Ionicons name="share-social" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  mapBackground: {
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT,
    position: 'relative',
  },
  overlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Nền đen mờ 
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Style chấm số hố (Chuẩn mẫu: Trắng, chữ đen)
  mapPoint: {
    position: 'absolute', 
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF', // Nền trắng
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    transform: [{ translateX: -12 }, { translateY: -12 }], // Căn giữa tọa độ
  },
  mapPointText: {
    color: '#1F2937', // Chữ màu đen
    fontSize: 12,
    fontWeight: '700',
  },

  // Style Avatar
  avatarContainer: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    transform: [{ translateX: -8 }, { translateY: -8 }], 
  }
});

export default HoleMapScreen;