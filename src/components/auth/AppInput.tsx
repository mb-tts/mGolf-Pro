import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  password?: boolean;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  required,
  password,
  style,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor="#BDBDBD"
          secureTextEntry={password && !show}
          {...rest}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setShow((s) => !s)}
            style={styles.eyeBtn}
          >
            <Ionicons
              name={show ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#BDBDBD"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400", // Regular
    color: "#333",
    lineHeight: 20, // 14 * 1.4 = 19.6 ≈ 20
    letterSpacing: -0.14, // -1% của 14 ≈ -0.14
    marginBottom: 6,
  },
  required: { color: Colors.error },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    height: 48,
  },
  input: { flex: 1, height: "100%", fontSize: 15, color: "#333" },
  inputError: { borderColor: Colors.error },
  eyeBtn: { paddingLeft: 12 },
  errorText: { fontSize: 12, color: Colors.error, marginTop: 4 },
});
