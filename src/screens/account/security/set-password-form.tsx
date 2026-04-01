import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../../../../App';

type SetPasswordFormNavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const SetPasswordFormScreen = () => {
  const navigation = useNavigation<SetPasswordFormNavigationProp>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Validation requirements
  const [requirements, setRequirements] = useState({
    minLength: false,      // >= 6 characters
    hasUpperCase: false,   // A-Z
    hasLowerCase: false,   // a-z
    hasSpecialOrNumber: false, // số hoặc ký tự đặc biệt
  });

  const handleBack = () => {
    navigation.goBack();
  };

  // Validate password
  useEffect(() => {
    const validatePassword = (password: string) => {
      setRequirements({
        minLength: password.length >= 6,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasSpecialOrNumber: /[\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
      });
    };

    validatePassword(newPassword);
  }, [newPassword]);

  // Check if all requirements are met and passwords match
  const allRequirementsMet =
    requirements.minLength &&
    requirements.hasUpperCase &&
    requirements.hasLowerCase &&
    requirements.hasSpecialOrNumber;

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isButtonEnabled = allRequirementsMet && passwordsMatch;

  const handleComplete = () => {
    if (!isButtonEnabled) {
      Alert.alert('Lỗi', 'Vui lòng đảm bảo mật khẩu đáp ứng tất cả yêu cầu và trùng khớp');
      return;
    }
    Alert.alert('Thành công', 'Mật khẩu đã được thiết lập!', [
      {
        text: 'OK',
        onPress: () => navigation.popToTop(),
      },
    ]);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
              <View style={styles.placeholder} />
            </View>

            {/* MAIN CONTENT */}
            <View style={styles.contentBody}>
              <Text style={styles.title}>Thiết lập mật khẩu</Text>
              <Text style={styles.subtitle}>
                Hãy đảm bảo mật khẩu mới của bạn đảm bảo các yêu tố bảo mật mà chúng tôi đưa ra.
              </Text>

              {/* INPUT LABEL - Mật khẩu */}
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Mật khẩu</Text>
                <Text style={styles.asterisk}>*</Text>
              </View>

              {/* INPUT FIELD - Mật khẩu */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>

              {/* PASSWORD REQUIREMENTS */}
              <View style={styles.requirementsBox}>
                <RequirementItem
                  label="Có tối thiểu 6 ký tự"
                  isMet={requirements.minLength}
                />
                <RequirementItem
                  label="Có chữ cái viết hoa (A-Z)"
                  isMet={requirements.hasUpperCase}
                />
                <RequirementItem
                  label="Có chữ cái viết thường (a-z)"
                  isMet={requirements.hasLowerCase}
                />
                <RequirementItem
                  label="Có số hoặc ký tự đặc biệt"
                  isMet={requirements.hasSpecialOrNumber}
                />
              </View>

              {/* INPUT LABEL - Nhập lại mật khẩu */}
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Nhập lại mật khẩu</Text>
                <Text style={styles.asterisk}>*</Text>
              </View>

              {/* INPUT FIELD - Nhập lại mật khẩu */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isConfirmPasswordVisible}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  style={styles.eyeIcon}
                >
                  <Ionicons
                    name={
                      isConfirmPasswordVisible ? "eye-outline" : "eye-off-outline"
                    }
                    size={20}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>

              {/* Password Match Indicator */}
              {confirmPassword.length > 0 && !passwordsMatch && (
                <Text style={styles.errorText}>Mật khẩu không trùng khớp</Text>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* BOTTOM BUTTON */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.completeBtn,
              isButtonEnabled
                ? styles.completeBtnActive
                : styles.completeBtnDisabled,
            ]}
            disabled={!isButtonEnabled}
            onPress={handleComplete}
          >
            <Text
              style={[
                styles.completeText,
                isButtonEnabled
                  ? styles.completeTextActive
                  : styles.completeTextDisabled,
              ]}
            >
              Hoàn tất
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Component hiện thị từng yêu cầu
interface RequirementItemProps {
  label: string;
  isMet: boolean;
}

const RequirementItem: React.FC<RequirementItemProps> = ({ label, isMet }) => {
  return (
    <View style={styles.requirementRow}>
      {isMet ? (
        <View style={styles.checkmarkCircle}>
          <Ionicons name="checkmark" size={14} color="#10B981" />
        </View>
      ) : (
        <View style={styles.emptyCircle} />
      )}
      <Text style={[styles.requirementText, isMet && styles.requirementMet]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  contentBody: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  placeholder: {
    width: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 32,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  asterisk: {
    fontSize: 14,
    color: '#EF4444',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1F2937',
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  requirementsBox: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
  },
  checkmarkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D1F4E6',
    borderWidth: 2,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  requirementText: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },
  requirementMet: {
    color: '#10B981',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 8,
  },
  bottomContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  completeBtn: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeBtnDisabled: {
    backgroundColor: '#F3F4F6',
  },
  completeBtnActive: {
    backgroundColor: '#0061AF',
  },
  completeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  completeTextDisabled: {
    color: '#9CA3AF',
  },
  completeTextActive: {
    color: '#FFFFFF',
  },
});
