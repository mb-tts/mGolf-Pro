import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { TeamXoaySectionProps } from './types';
import { ToggleOption } from './ToggleOption';
import { PlayerList } from '../PlayerCard';
import { MOCK_PLAYERS } from '../../../constants/mock-data';

export const TeamXoaySection: React.FC<TeamXoaySectionProps> = ({
  settings,
  onSettingsChange,
}) => {
  const holeOptions = [
    { label: '3 hộ', value: 3 },
    { label: '6 hộ', value: 6 },
    { label: '9 hộ', value: 9 },
  ];

  const comparisonOptions: { label: string; value: 'best' | 'all' | 'weakest' }[] = [
    { label: 'Golfer tốt nhất', value: 'best' },
    { label: 'Tất cả', value: 'all' },
    { label: 'Tất cả nếu hỏa', value: 'weakest' },
  ];

  return (
    <View style={styles.sectionContainer}>
      {/* Hole Count */}
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>Số hộ xoay vòng</Text>
        <View style={styles.buttonRow}>
          {holeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() =>
                onSettingsChange({
                  ...settings,
                  holeCount: option.value,
                })
              }
              style={[
                styles.outlineButton,
                settings.holeCount === option.value &&
                  styles.outlineButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.outlineButtonText,
                  settings.holeCount === option.value &&
                    styles.outlineButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Comparison */}
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>So sánh</Text>
        <View style={styles.buttonRow}>
          {comparisonOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() =>
                onSettingsChange({
                  ...settings,
                  comparison: option.value,
                })
              }
              style={[
                styles.outlineButton,
                settings.comparison === option.value &&
                  styles.outlineButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.outlineButtonText,
                  settings.comparison === option.value &&
                    styles.outlineButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Toggles */}
      <View style={styles.settingBlock}>
        <ToggleOption
          label="Tính theo số hộ tháng"
          value={settings.byMonth}
          onChange={(value) =>
            onSettingsChange({ ...settings, byMonth: value })
          }
        />
      </View>

      <View style={styles.settingBlock}>
        <ToggleOption
          label="Chơi hết hộ"
          value={settings.playBest}
          onChange={(value) =>
            onSettingsChange({ ...settings, playBest: value })
          }
        />
      </View>

      <View style={styles.settingBlock}>
        <ToggleOption
          label="Công đón"
          value={settings.restrictions}
          onChange={(value) =>
            onSettingsChange({ ...settings, restrictions: value })
          }
        />
      </View>

      <Text style={styles.subtitle}>Danh sách thành viên (4 người)</Text>
      <PlayerList
        players={MOCK_PLAYERS}
        onPlayerPress={(player) => console.log(player.name)}
      />
    </View>
  );
};
