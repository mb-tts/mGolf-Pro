# Quy tắc Commit Git - mGolf-Pro

Chúng ta tuân theo tiêu chuẩn [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Định dạng Commit Message
`<loại>(<phạm vi>): <mô tả ngắn>`

### Các loại Commit (Type)
- **feat**: Một tính năng mới (tương ứng với MINOR trong semantic versioning).
- **fix**: Sửa lỗi (tương ứng với PATCH trong semantic versioning).
- **docs**: Thay đổi chỉ liên quan đến tài liệu (documentation).
- **style**: Các thay đổi không ảnh hưởng đến ý nghĩa của code (định dạng, khoảng trắng, thiếu dấu chấm phẩy, v.v.).
- **refactor**: Thay đổi mã nguồn nhưng không sửa lỗi cũng không thêm tính năng.
- **perf**: Thay đổi mã để cải thiện hiệu suất.
- **test**: Thêm các bài kiểm tra còn thiếu hoặc sửa các bài kiểm tra hiện có.
- **build**: Các thay đổi ảnh hưởng đến hệ thống build hoặc các dependency bên ngoài.
- **ci**: Các thay đổi đối với tệp cấu hình và tập lệnh CI.
- **chore**: Các tác vụ bảo trì khác mà không thay đổi mã nguồn hoặc tệp test (ví dụ: cập nhật node_modules).
- **revert**: Hoàn tác (revert) một commit trước đó.

### Ví dụ
- `feat(ui): thêm màn hình chọn câu lạc bộ golf mới`
- `fix(video): xử lý lỗi văng ứng dụng khi phát video trên Android`
- `docs: cập nhật hướng dẫn cài đặt trong README`
- `chore: cập nhật các thư viện phụ thuộc`

## Quy tắc đặt tên Branch
- `feature/<tên>` cho các tính năng mới
- `bugfix/<tên>` cho việc sửa lỗi
- `hotfix/<tên>` cho các lỗi nghiêm trọng cần sửa gấp trên production
