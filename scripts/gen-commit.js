const { execSync } = require('child_process');

try {
  const args = process.argv.slice(2);
  if (args.includes('--all')) {
    console.log('Đang thực hiện git add . ...');
    execSync('git add .');
  }
  
  const diff = execSync('git diff --cached --name-status').toString().trim();
  if (!diff) {
    console.log('\n--- Chưa có file nào được Stage ---');
    console.log('Bạn có muốn tôi tự động "git add ." giúp bạn không?');
    console.log('Nếu có, hãy gõ: npm run gen-commit -- --all\n');
    process.exit(1);
  }

  console.log('\n--- Các thay đổi đang chờ commit ---');
  console.log(diff);
  console.log('------------------------------------');
  console.log('\n[COPY VÀO Ô CHAT ANTIGRAVITY]:');
  console.log('=> "Viết commit message tiếng Việt cho các thay đổi này và commit luôn giúp tôi"');
  console.log('------------------------------------\n');
} catch (error) {
  console.error('Lỗi khi đọc thay đổi:', error.message);
}
