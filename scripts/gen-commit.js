const { execSync } = require('child_process');

try {
  const diff = execSync('git diff --cached --name-status').toString().trim();
  if (!diff) {
    console.log('Không có thay đổi nào được stage. Vui lòng chạy "git add" trước.');
    process.exit(1);
  }

  console.log('--- Các thay đổi đã Stage ---');
  console.log(diff);
  console.log('-----------------------------');
  console.log('\nHãy copy nội dung trên và hỏi Antigravity: "Viết commit message cho các thay đổi này"');
  console.log('Hoặc dùng lệnh: npm run commit');
} catch (error) {
  console.error('Lỗi khi đọc thay đổi:', error.message);
}
