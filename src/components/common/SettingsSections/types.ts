// ============ EVERYTHING SECTION ============
export interface FilterOption {
  id: string;
  label: string;
}

export interface EverythingSectionProps {
  selectedFilter: string;
  onFilterChange: (id: string) => void;
}

// ============ TEAM XOAY SECTION ============
export interface TeamXoaySettings {
  holeCount: number;
  comparison: 'best' | 'all' | 'weakest';
  byMonth: boolean;
  playBest: boolean;
  restrictions: boolean;
}

export interface TeamXoaySectionProps {
  settings: TeamXoaySettings;
  onSettingsChange: (settings: TeamXoaySettings) => void;
}

// ============ TEAM CỐ ĐỊNH SECTION ============
export interface TeamCoDefinedSettings {
  holeCount: number;
  comparison: 'best' | 'all' | 'weakest';
}

export interface TeamCoDefinedSectionProps {
  settings: TeamCoDefinedSettings;
  onSettingsChange: (settings: TeamCoDefinedSettings) => void;
}

// ============ TOGGLE OPTION ============
export interface ToggleOptionProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}
