import { FC } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { TeamXoaySectionProps } from './types';
import { PlayerList } from '../PlayerCard';
import { MOCK_PLAYERS } from '../../../constants/mock-data';

export const TeamXoaySection: FC<TeamXoaySectionProps> = ({
  settings,
  onSettingsChange,
}) => {

  const holeOptions = [
    { label: '3 hố', value: 3 },
    { label: '6 hố', value: 6 },
    { label: '9 hố', value: 9 },
  ];

  const comparisonOptions: { label: string; value: 'best' | 'all' | 'weakest' }[] = [
    { label: 'Golfer tốt nhất', value: 'best' },
    { label: 'Tất cả', value: 'all' },
    { label: 'Tất cả nếu hoà', value: 'weakest' },
  ];

  return (
    <View style={styles.sectionContainer}>
      {/* Số hố xoay vòng */}
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>Số hố xoay vòng</Text>
        <View style={styles.buttonRow}>
          {holeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => onSettingsChange({ ...settings, holeCount: option.value })}
              style={[
                styles.outlineButton,
                settings.holeCount === option.value && styles.outlineButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.outlineButtonText,
                  settings.holeCount === option.value && styles.outlineButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* So sánh */}
      <View style={styles.settingBlock}>
        <Text style={styles.sectionTitle}>So sánh</Text>
        <View style={styles.segmentedWrapper}>
          {comparisonOptions.map((option, index) => {
            const isLast = index === comparisonOptions.length - 1;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => onSettingsChange({ ...settings, comparison: option.value })}
                style={[
                  styles.segmentItem,
                  isLast && styles.segmentItemLast,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    settings.comparison === option.value && styles.segmentTextActive,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Số skins thắng team (Chỉ hiện khi tắt "Tính theo số hố thắng") */}
      {!settings.byMonth && (
        <View style={styles.settingBlock}>
          <Text style={styles.sectionTitle}>Số skins thắng team</Text>
          <TextInput style={styles.textInputFull} />
        </View>
      )}

      {/* Toggle: Tính theo số hố thắng */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleRow}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.toggleLabel}>Tính theo số hố thắng</Text>
            <Text style={styles.iconQuestion}>ⓘ</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, settings.byMonth && styles.toggleActive]}
            onPress={() => onSettingsChange({ ...settings, byMonth: !settings.byMonth })}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, settings.byMonth && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách nhập linh hoạt (Chỉ hiện khi bật "Tính theo số hố thắng") */}
      {settings.byMonth && (
        <View style={styles.settingBlock}>
          <View style={styles.holeHeaderRow}>
            <Text style={styles.holeHeaderText1}>Hố thắng</Text>
            <Text style={styles.holeHeaderText2}>Số skins</Text>
          </View>
          {[1, 2, 3].map((num) => (
            <View key={num} style={styles.holeRow}>
              <View style={styles.holeCircle}>
                <Text style={styles.holeCircleText}>{num}</Text>
              </View>
              <TextInput style={styles.holeInput} />
            </View>
          ))}
        </View>
      )}

      {/* Toggle: Chơi hết hố */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleRow}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.toggleLabel}>Chơi hết hố</Text>
            <Text style={styles.iconQuestion}>ⓘ</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, settings.playBest && styles.toggleActive]}
            onPress={() => onSettingsChange({ ...settings, playBest: !settings.playBest })}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, settings.playBest && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Toggle: Cộng dồn */}
      <View style={styles.settingBlock}>
        <View style={styles.toggleRow}>
          <View style={styles.labelWithIcon}>
            <Text style={styles.toggleLabel}>Cộng dồn</Text>
            <Text style={styles.iconQuestion}>ⓘ</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggle, settings.restrictions && styles.toggleActive]}
            onPress={() => onSettingsChange({ ...settings, restrictions: !settings.restrictions })}
            activeOpacity={0.8}
          >
            <View style={[styles.toggleThumb, settings.restrictions && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách người chơi */}
      <View style={styles.playerListWrapper}>
        <PlayerList
          players={MOCK_PLAYERS}
          onPlayerPress={(player) => console.log(player.name)}
        />
      </View>
    </View>
  );
};