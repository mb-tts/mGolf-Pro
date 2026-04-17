import { useState, FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

interface SelectionCardProps {
  label?: string;
  initialChecked?: boolean;
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: React.ReactNode;
}

const SelectionCard: FC<SelectionCardProps> = ({ 
  label = "Everything", 
  initialChecked = false,
  isChecked: isCheckedProp,
  onChange,
  style,
  onPress,
  children
}) => {
  const [isCheckedLocal, setIsCheckedLocal] = useState(initialChecked);
  
  // Nếu isChecked được truyền từ parent, dùng nó. Nếu không, dùng local state
  const isChecked = isCheckedProp !== undefined ? isCheckedProp : isCheckedLocal;

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      const newState = !isChecked;
      setIsCheckedLocal(newState);
      if (onChange) {
        onChange(newState);
      }
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={[styles.card, style]}
    >
      {children ? (
        <>
          {children}
          {/* Custom Checkbox - Luôn hiển thị */}
          <View 
            style={[
              styles.checkbox, 
              isChecked ? styles.checkboxChecked : styles.checkboxUnchecked
            ]}
          >
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </>
      ) : (
        <>
          {/* Label Text */}
          <Text style={styles.label}>{label}</Text>

          {/* Custom Checkbox */}
          <View 
            style={[
              styles.checkbox, 
              isChecked ? styles.checkboxChecked : styles.checkboxUnchecked
            ]}
          >
            {isChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  cardUnchecked: {
    borderColor: '#E5E7EB', // Màu xám nhạt
  },
  label: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxUnchecked: {
    borderColor: '#95CFFF', // Viền xanh như trong hình bạn gửi
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    borderColor: '#0061AF',
    backgroundColor: '#0061AF', // Đổ nền xanh khi được chọn
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    // Căn chỉnh nhẹ để dấu tích nằm ngay giữa
    marginTop: Platform.OS === 'ios' ? 1 : -1, 
  },
});

export default SelectionCard;