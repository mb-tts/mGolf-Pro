import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LoadingScreen } from "./LoadingScreen";

interface ScreenWrapperProps {
  children: React.ReactNode;
  loadingDelay?: number;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  loadingDelay = 400, // Giảm nhẹ delay cho mượt hơn
}) => {
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false); // Theo dõi việc đã từng load thành công chưa
  const fadeOutAnim = React.useRef(new Animated.Value(1)).current; 
  const slideAnim = React.useRef(new Animated.Value(30)).current; 

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      if (!hasLoadedOnce) {
        // --- LẦN ĐẦU TIÊN: Có hiện Loading xoay xoay ---
        setShowLoading(true);
        fadeOutAnim.setValue(1); 
        slideAnim.setValue(30);

        const timer = setTimeout(() => {
          Animated.parallel([
            Animated.timing(fadeOutAnim, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
              toValue: 0,
              tension: 50,
              friction: 7,
              useNativeDriver: true,
            }),
          ]).start(({ finished }) => {
            if (finished) {
              setShowLoading(false);
              setHasLoadedOnce(true); // Đánh dấu đã load xong lần đầu
            }
          });
        }, loadingDelay);
        return () => clearTimeout(timer);
      } else {
        // --- CÁC LẦN SAU: Không hiện Loading nữa, chỉ chạy Animation trồi lên cực nhanh ---
        setShowLoading(false); // Ẩn hoàn toàn spinner
        slideAnim.setValue(15); // Hạ thấp độ cao đẩy lên cho mượt nhẹ
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 80,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [isFocused, hasLoadedOnce]);

  return (
    <View style={styles.container}>
      {/* Nội dung thực đã nằm sẵn ở dưới, chỉ việc trồi lên */}
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {children}
      </Animated.View>

      {/* Lớp Loading nằm ĐÈ lên trên và MỜ DẦN đi để lộ Content */}
      {showLoading && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFillObject, { opacity: fadeOutAnim, zIndex: 99 }]}
        >
          <LoadingScreen />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
