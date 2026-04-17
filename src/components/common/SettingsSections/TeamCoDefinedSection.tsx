import { FC } from 'react';
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import type { SettingsSectionProps } from '@/types/golf.types';

export const TeamCoDefinedSection: FC<SettingsSectionProps> = ({
  settings = {},
  onSettingsChange,
}) => {

  // So sánh chỉ còn 2 option theo như ảnh
  const comparisonOptions: { label: string; value: 'best' | 'all' | 'weakest' }[] = [
    { label: 'Golfer tốt nhất', value: 'best' },
    { label: 'Tất cả', value: 'all' },
  ];

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>Số skins thắng up</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder=""
          value={settings.skinsUp || ''}
          onChangeText={(text) => onSettingsChange({ ...settings, skinsUp: text })}
        />
      </View>

      {/* So sánh (Segmented Control) */}
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>So sánh</Text>
        <View style={styles.segmentedWrapper}>
          {comparisonOptions.map((option, index) => {
            const isLast = index === comparisonOptions.length - 1;
            const isActive = settings.comparison === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => onSettingsChange({ ...settings, comparison: option.value })}
                style={[
                  styles.segmentItem,
                  isLast && styles.segmentItemLast,
                ]}
              >
                <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Toggle 1: So sánh và tính cả tổng gậy */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleRow}>
          <View style={styles.labelWithIcon}>
            <Text style={[
              styles.toggleLabel, 
              settings.compareTotalScore && styles.textBlue // Đổi màu xanh khi active
            ]}>
              So sánh và tính cả tổng gậy
            </Text>
            <Text style={styles.iconQuestion}>ⓘ</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, settings.compareTotalScore && styles.toggleActive]}
            onPress={() => onSettingsChange({ ...settings, compareTotalScore: !settings.compareTotalScore })}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, settings.compareTotalScore && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conditional Input: Chỉ hiển thị khi Toggle "So sánh và tính cả tổng gậy" bật */}
      {settings.compareTotalScore && (
        <View style={styles.settingBlock}>
          <Text style={styles.sectionTitle}>Số skins mỗi gậy thắng</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder=""
            value={settings.skinsPerScore || ''}
            onChangeText={(text) => onSettingsChange({ ...settings, skinsPerScore: text })}
          />
        </View>
      )}

      {/* Toggle 2: Cộng dồn */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleRow}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.toggleLabel}>Cộng dồn</Text>
            <Text style={styles.iconQuestion}>ⓘ</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, settings.accumulate && styles.toggleActive]}
            onPress={() => onSettingsChange({ ...settings, accumulate: !settings.accumulate })}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, settings.accumulate && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Colors = {
  primary: '#0052CC',
  border: '#E0E0E0',
  text: '#333333',
  textMuted: '#666666',
  white: '#FFFFFF',
  toggleOffBg: '#A8A8A8',
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 12,
    backgroundColor: Colors.white,
    marginBottom: 16,
  },


  // Khối setting & Tiêu đề
  settingBlock: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
    fontWeight: '400',
  },

  // Input text
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    color: Colors.text,
  },

  // So sánh (Segmented Control)
  segmentedWrapper: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    overflow: 'hidden',
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    backgroundColor: Colors.white,
  },
  segmentItemLast: {
    borderRightWidth: 0,
  },
  segmentText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '400',
  },
  segmentTextActive: {
    color: Colors.text,
    fontWeight: '500',
  },

  // Toggles
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text,
  },
  textBlue: {
    color: Colors.primary,
    fontWeight: '500',
  },
  iconQuestion: {
    color: '#888',
    fontSize: 16,
  },
  toggle: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.toggleOffBg,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
});