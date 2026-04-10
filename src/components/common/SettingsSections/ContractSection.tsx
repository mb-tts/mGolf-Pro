import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { PlayerList } from '../PlayerCard';
import { MOCK_PLAYERS } from '../../../constants/mock-data';
import type { SettingsSectionProps } from '@/types/golf.types';

export const ContractSection: React.FC<SettingsSectionProps> = ({ settings = {}, onSettingsChange }) => {

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Skins đường đi</Text>
        <TextInput
          style={styles.input}
          value={settings.skinsOut || ''}
          onChangeText={(text) => onSettingsChange({ ...settings, skinsOut: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Skins đường về</Text>
        <TextInput
          style={styles.input}
          value={settings.skinsIn || ''}
          onChangeText={(text) => onSettingsChange({ ...settings, skinsIn: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Skins tổng</Text>
        <TextInput
          style={styles.input}
          value={settings.skinsTotal || ''}
          onChangeText={(text) => onSettingsChange({ ...settings, skinsTotal: text })}
        />
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

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 12,
    backgroundColor: '#FFF',
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
    color: '#333',
  },
  badge: {
    backgroundColor: '#0052CC',
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#0052CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#0052CC',
  },
  checkMark: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputGroup: {
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  input: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    color: '#333',
  },
  playerListWrapper: {
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#FFF',
  },
});