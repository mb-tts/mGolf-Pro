import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useAuthNavigation } from "@/hooks/useNavigation";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dữ liệu 3 slide Onboarding (thay nội dung thật sau)
const SLIDES = [
  {
    id: "1",
    title: "Quản lý điểm số",
    description: "Theo dõi và quản lý điểm số golf\ncủa bạn một cách dễ dàng.",
  },
  {
    id: "2",
    title: "Đặt sân nhanh chóng",
    description: "Tìm kiếm và đặt sân golf\nchỉ với vài thao tác đơn giản.",
  },
  {
    id: "3",
    title: "Kết nối cộng đồng",
    description: "Kết nối với cộng đồng golf thủ\ntrên khắp Việt Nam.",
  },
];

export const OnboardingScreen = () => {
  const navigation = useAuthNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Xử lý khi vuốt slide
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  // Chuyển sang slide tiếp theo
  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    }
  };

  // Bỏ qua hoặc Bắt đầu → vào Login
  const goToLogin = () => {
    navigation.replace("Login");
  };

  // Render từng slide
  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={styles.slide}>
      {/* Logo mGolf nhỏ ở trên cùng */}
      <View style={styles.logoRow}>
        <Image
          source={require("../../../../assets/icons/icon.png")}
          style={styles.logoSmall}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>mGolf</Text>
      </View>

      {/* Nội dung slide */}
      <View style={styles.contentArea}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideDesc}>{item.description}</Text>
      </View>
    </View>
  );

  // Slide cuối cùng → hiện nút "Bắt đầu ngay"
  const isLastSlide = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Danh sách slide vuốt ngang */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Phần dưới: Dots + Buttons */}
      <View style={styles.bottomSection}>
        {/* Dot indicators */}
        <View style={styles.dotRow}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Nút điều hướng */}
        {isLastSlide ? (
          // Slide cuối: Nút "Bắt đầu ngay" full width
          <TouchableOpacity style={styles.startBtn} onPress={goToLogin} activeOpacity={0.8}>
            <Text style={styles.startBtnText}>Bắt đầu ngay</Text>
          </TouchableOpacity>
        ) : (
          // Slide 1-2: Nút "Bỏ qua" bên trái, mũi tên bên phải
          <View style={styles.navRow}>
            <TouchableOpacity style={styles.skipBtn} onPress={goToLogin} activeOpacity={0.7}>
              <Text style={styles.skipText}>Bỏ qua</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.7}>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Từng slide
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 24,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    gap: 8,
  },
  logoSmall: {
    width: 36,
    height: 36,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0060AF",
  },
  contentArea: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 100,
  },
  slideTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 12,
  },
  slideDesc: {
    fontSize: 15,
    color: "#888",
    lineHeight: 22,
  },
  // Phần dưới cùng
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: "#1A1A1A",
    width: 8,
    height: 8,
  },
  dotInactive: {
    backgroundColor: "#D9D9D9",
  },
  // Nút điều hướng (slide 1-2)
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  nextBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#0060AF",
    alignItems: "center",
    justifyContent: "center",
  },
  // Nút "Bắt đầu ngay" (slide cuối)
  startBtn: {
    backgroundColor: "#0060AF",
    borderRadius: 26,
    paddingVertical: 16,
    alignItems: "center",
  },
  startBtnText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
