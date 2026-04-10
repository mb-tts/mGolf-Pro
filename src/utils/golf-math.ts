/**
 * Tiện ích tính toán liên quan đến Golf
 */

/**
 * Tính điểm Net dựa trên điểm Gross và Handicap (HDC)
 * @param gross Điểm gậy thực tế
 * @param hdc Chỉ số Handicap
 * @returns Điểm Net
 */
export const calculateNetScore = (gross: number, hdc: number): number => {
  return gross - hdc;
};

/**
 * Định dạng mã VGA (đảm bảo đủ 5 chữ số bằng cách thêm số 0 ở đầu)
 * @param vga Mã VGA đầu vào
 * @returns Mã VGA đã định dạng 5 chữ số
 */
export const formatVgaCode = (vga: string): string => {
  if (!vga) return "";
  return vga.padStart(5, "0");
};

/**
 * Tính toán thứ hạng (Rank) dựa trên điểm Net (Net càng thấp hạng càng cao)
 * @param scores Mảng các điểm Net
 * @returns Mảng các thứ hạng tương ứng
 */
export const calculateRanks = (netScores: number[]): number[] => {
  const sorted = [...new Set(netScores)].sort((a, b) => a - b);
  return netScores.map(score => sorted.indexOf(score) + 1);
};
