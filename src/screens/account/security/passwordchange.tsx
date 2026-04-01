import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Colors } from '../../../constants/colors';

export const PasswordChangeScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleContinue = () => {
    if (oldPassword.trim().length > 0) {
      // Logic chuyển sang bước tiếp theo (Nhập mật khẩu mới)
      console.log('Tiếp tục với mật khẩu:', oldPassword);
    }
  };

  const isButtonDisabled = oldPassword.trim().length === 0;

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            
            {/* HEADER */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={20} color="#333" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Thay đổi mật khẩu</Text>
              <View style={styles.placeholder} />
            </View>

            {/* MAIN CONTENT */}
            <View style={styles.content}>
              <Text style={styles.title}>Nhập mật khẩu cũ</Text>
              <Text style={styles.subtitle}>
                Nhập lại mật khẩu cũ để chắc chắn tài khoản này là của bạn.
              </Text>

              {/* INPUT LABLE */}
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Mật khẩu cũ </Text>
                <Text style={styles.asterisk}>*</Text>
              </View>

              {/* INPUT FIELD */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu cũ"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!isPasswordVisible}
                  value={oldPassword}
                  onChangeText={setOldPassword}
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
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* BOTTOM BUTTON */}
            <View style={styles.bottomContainer}>
              <TouchableOpacity 
                style={[
                  styles.continueBtn, 
                  isButtonDisabled ? styles.continueBtnDisabled : styles.continueBtnActive
                ]}
                disabled={isButtonDisabled}
                onPress={handleContinue}
              >
                <Text style={[
                  styles.continueText,
                  isButtonDisabled ? styles.continueTextDisabled : styles.continueTextActive
                ]}>
                  Tiếp tục
                </Text>
              </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#FFFFFF" 
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
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
    color: "#1A1A1A" 
  },
  placeholder: { 
    width: 36 
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
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
  bottomContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 30, 
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  continueBtn: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnDisabled: {
    backgroundColor: '#F3F4F6',
  },
  continueBtnActive: {
    backgroundColor: '#0061AF', 
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueTextDisabled: {
    color: '#9CA3AF',
  },
  continueTextActive: {
    color: '#FFFFFF',
  },
});