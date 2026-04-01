import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { PlayerList } from '../PlayerCard';
import { MOCK_PLAYERS } from '../../../constants/mock-data';

export const QuyGaSection: React.FC<any> = ({ settings = {}, onSettingsChange }) => {
  const [isChecked, setIsChecked] = useState(true);

  const conditions = [
    { label: 'Birdie', value: 'birdie' },
    { label: 'Eagle', value: 'eagle' },
    { label: 'Par', value: 'par' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.settingBlock}>
        <Text style={styles.label}>Skins đóng mỗi hố</Text>
        <TextInput
          style={styles.input}
          value={settings.skinsPerHole || ''}
          onChangeText={(text) => onSettingsChange({ ...settings, skinsPerHole: text })}
        />
      </View>

      <View style={styles.settingBlock}>
        <Text style={styles.label}>Điều kiện ăn quỹ</Text>
        <View style={styles.buttonRow}>
          {conditions.map((option) => {
            const isActive = settings.condition === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => onSettingsChange({ ...settings, condition: option.value })}
                style={[
                  styles.pillButton,
                  isActive && styles.pillButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    isActive && styles.pillButtonTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={[styles.settingBlock, { marginBottom: 16 }]}>
        <View style={styles.toggleRow}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.toggleLabel}>Chia đều quỹ cho Golfer đạt</Text>
            <Text style={styles.iconQuestion}>ⓘ</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, settings.splitFund && styles.toggleActive]}
            onPress={() => onSettingsChange({ ...settings, splitFund: !settings.splitFund })}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, settings.splitFund && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.playerListWrapper}>
        <PlayerList
          players={MOCK_PLAYERS}
          onPlayerPress={(player) => console.log(player.name)}
        />
      </View>
    </View>
  );
};

const Colors = {
  primary: '#0052CC',
  primaryLight: '#F0F5FF',
  border: '#E0E0E0',
  text: '#333333',
  textMuted: '#4F4F4F',
  white: '#FFFFFF',
  toggleOffBg: '#A8A8A8',
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
  },
  checkMark: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingBlock: {
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 8,
    fontWeight: '400',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  
  // Nút bấm (Pill Buttons)
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pillButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  pillButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  pillButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '400',
  },
  pillButtonTextActive: {
    color: Colors.primary,
    fontWeight: '500',
  },

  // Toggle Switch
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toggleLabel: {
    fontSize: 14,
    color: Colors.text,
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

  playerListWrapper: {
    borderRadius: 12,
    padding: 8,
    backgroundColor: Colors.white,
  },
});