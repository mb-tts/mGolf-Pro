import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";

interface FieldBoxProps {
  label: string;
  value?: string;
  placeholder?: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  isSelect?: boolean;
  keyboardType?: "default" | "numeric" | "phone-pad" | "email-address";
  containerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Component dùng chung cho các trường nhập liệu hoặc hiển thị thông tin
 * thường thấy trong màn hình Account Information, Settings...
 */
export const FieldBox: React.FC<FieldBoxProps> = ({
  label,
  value,
  placeholder,
  editable = true,
  onChangeText,
  onPress,
  isSelect = false,
  keyboardType = "default",
  containerStyle,
  children,
}) => {
  const renderContent = () => {
    if (children) return children;

    if (isSelect) {
      return (
        <TouchableOpacity
          style={styles.selectInput}
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.valueText}>{value}</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.placeholder}
        editable={editable}
        keyboardType={keyboardType}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.box}>
        <Text style={styles.label}>{label}</Text>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: "500",
    marginBottom: 6,
  },
  box: {
    backgroundColor: Colors.white,
    borderWidth: 0.1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    // Add subtle shadow for premium look
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  input: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
    padding: 0,
    margin: 0,
  },
  selectInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  valueText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },
});
