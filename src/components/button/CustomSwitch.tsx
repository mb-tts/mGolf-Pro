import { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const CustomSwitch = ({ value, onValueChange }) => {
  const switchTranslate = useSharedValue(value ? 24 : 0);

  useEffect(() => {
    switchTranslate.value = withTiming(value ? 24 : 0, { duration: 250 });
  }, [value, switchTranslate]);

  const trackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      switchTranslate.value,
      [0, 24],
      ['#FFF', '#004FA1'] // Nền trắng khi tắt, nền xanh khi bật
    );
    const borderColor = interpolateColor(
      switchTranslate.value,
      [0, 24],
      ['#D1D5DB', '#004FA1'] // Viền xám khi tắt, viền xanh khi bật
    );

    return {
      backgroundColor,
      borderColor,
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      switchTranslate.value,
      [0, 24],
      ['#D1D5DB', '#FFF'] // Cục tròn xám khi tắt, trắng khi bật
    );

    return {
      transform: [{ translateX: switchTranslate.value }],
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
    >
      <Animated.View style={[styles.switchTrack, trackStyle]}>
        <Animated.View style={[styles.switchThumb, thumbStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchTrack: {
    width: 50,
    height: 26,
    borderRadius: 15,
    borderWidth: 1,
    padding: 2,
    justifyContent: 'center',
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CustomSwitch;