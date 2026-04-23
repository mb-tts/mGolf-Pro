import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import { SelectionBottomSheet } from "../../../components/account/SelectionBottomSheet";
import type { SelectionOption } from "../../../components/account/SelectionBottomSheet";
import { useAuth } from "@/providers/auth.provider";

import { BackHeader } from "@/components/common/BackHeader";
import { FieldBox } from "@/components/common/FieldBox";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useNavigation } from "@react-navigation/native";

import { useUser } from "@/providers/user.provider";

export const AccountInformationScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { profile, updateProfile } = useUser();
  
  const [fullName, setFullName] = useState(profile.fullName);
  const [vgaCode, setVgaCode] = useState(profile.vgaCode);
  const [handicap, setHandicap] = useState(profile.handicap);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [memberShip, setMemberShip] = useState(profile.memberShip);
  const [teeBox, setTeeBox] = useState(profile.teeBox);

  const [membershipModal, setMembershipModal] = useState(false);
  const [teeBoxModal, setTeeBoxModal] = useState(false);

  const membershipOptions: SelectionOption[] = [
    { id: "Basic", label: "Basic" },
    { id: "Advance", label: "Advance", isUpgrade: true },
    { id: "VIP", label: "VIP", isUpgrade: true },
  ];

  const teeBoxOptions: SelectionOption[] = [
    { id: "Blue", label: "Blue" },
    { id: "Red", label: "Red" },
    { id: "White", label: "White" },
    { id: "Yellow", label: "Yellow" },
  ];

  const handleMembershipUpgrade = (membership: string) => {
    Alert.alert("Nâng cấp hội viên", `Bạn muốn nâng cấp lên ${membership}?`, [
      { text: "Hủy", onPress: () => {} },
      {
        text: "Xác nhận",
        onPress: () => {
          setMemberShip(membership);
          setMembershipModal(false);
        },
      },
    ]);
  };

  const handleUpdate = () => {
    updateProfile({
      fullName,
      vgaCode,
      handicap,
      phone,
      email,
      memberShip,
      teeBox,
    });
    Alert.alert("Thành công", "Cập nhật thông tin tài khoản thành công!");
  };

  return (
    <View style={styles.screenWrapper}>
      <SafeAreaView edges={["top"]} style={{flex: 1, backgroundColor: "#F2F4F7"}}>
        {/* Vùng chứa nội dung cuộn */}
        <View style={{ flex: 1 }}>
          <BackHeader 
            title="Thông tin tài khoản" 
            onBack={() => navigation.goBack()} 
            variant="white"
            tintColor={Colors.text}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=3" }}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.editAvatarBtn}>
                  <Ionicons name="camera" size={18} color={Colors.black} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              <FieldBox 
                label="Họ và tên" 
                value={fullName} 
                onChangeText={setFullName} 
                placeholder="Nhập họ và tên" 
              />

              <FieldBox 
                label="Mã VGA" 
                value={vgaCode} 
                editable={false} 
              />

              <FieldBox 
                label="HDC Index" 
                value={handicap} 
                onChangeText={setHandicap} 
                placeholder="Nhập HDC Index" 
                keyboardType="numeric" 
              />

              <FieldBox 
                label="Số điện thoại" 
                value={phone} 
                onChangeText={setPhone} 
                placeholder="Nhập số điện thoại" 
                keyboardType="phone-pad" 
              />

              <FieldBox 
                label="Email" 
                value={email} 
                onChangeText={setEmail} 
                placeholder="Nhập email" 
                keyboardType="email-address" 
              />

              <FieldBox 
                label="Hạng hội viên" 
                value={memberShip} 
                isSelect 
                onPress={() => setMembershipModal(true)} 
              />

              <FieldBox 
                label="Tee box" 
                value={teeBox} 
                isSelect 
                onPress={() => setTeeBoxModal(true)} 
              />
            </View>
          </ScrollView>
        </View>

        {/* Update Button */}
        <View style={styles.bottomContainer}>
          <PrimaryButton title="Cập nhật" onPress={handleUpdate} />
        </View>
      </SafeAreaView>

      {/* Membership Selection Bottom Sheet - OUTSIDE SafeAreaView */}
      <SelectionBottomSheet
        isVisible={membershipModal}
        selectedValue={memberShip}
        title="Hội viên"
        options={membershipOptions}
        onSelect={setMemberShip}
        onClose={() => setMembershipModal(false)}
        onUpgradePress={handleMembershipUpgrade}
      />

      {/* Tee Box Selection Bottom Sheet - OUTSIDE SafeAreaView */}
      <SelectionBottomSheet
        isVisible={teeBoxModal}
        selectedValue={teeBox}
        title="Tee box"
        options={teeBoxOptions}
        onSelect={setTeeBox}
        onClose={() => setTeeBoxModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#F2F4F7",
    marginBottom: 15,
    marginTop: 60, // Bù đắp cho BackHeader absolute
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.finishedLight,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24, 
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});