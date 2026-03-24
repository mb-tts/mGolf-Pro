import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import { Colors } from "../../constants/colors";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "outline";
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  loading,
  variant = "primary",
  style,
  disabled,
  ...rest
}) => (
  <TouchableOpacity
    style={[
      styles.base,
      variant === "outline" ? styles.outline : styles.primary,
      (disabled || loading) && styles.disabled,
      style,
    ]}
    disabled={disabled || loading}
    activeOpacity={0.8}
    {...rest}
  >
    {loading ? (
      <ActivityIndicator
        color={variant === "outline" ? Colors.primary : Colors.white}
      />
    ) : (
      <Text style={[styles.text, variant === "outline" && styles.textOutline]}>
        {title}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  primary: { backgroundColor: Colors.primary },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  disabled: { opacity: 0.6 },
  text: { color: Colors.white, fontSize: 16, fontWeight: "700" },

  textOutline: { color: Colors.primary },
});
