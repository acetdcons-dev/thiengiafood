# Kết nối form với Google Sheets

1. Mở Google Apps Script và tạo project mới bằng tài khoản có quyền sửa Spreadsheet đích.
2. Dán nội dung `Code.gs` vào project.
3. Trong **Project Settings > Script properties**, thêm `LEAD_WEBHOOK_SECRET` với một chuỗi bí mật dài, ngẫu nhiên.
4. Chọn **Deploy > New deployment > Web app**.
5. Execute as: **Me**. Who has access: **Anyone**.
6. Sao chép URL Web App dạng `https://script.google.com/macros/s/.../exec`.
7. Trên môi trường Vercel, đặt hai biến:
   - `GOOGLE_APPS_SCRIPT_URL`: URL Web App vừa sao chép.
   - `LEAD_WEBHOOK_SECRET`: đúng chuỗi bí mật ở bước 3.
8. Deploy lại môi trường thử nghiệm và gửi một lead kiểm tra. Xác nhận tab `Leads` được tạo trong Spreadsheet và email thông báo đến `thiengiafood@gmail.com`.

Không đưa chuỗi bí mật vào `site-config.js` hoặc mã JavaScript phía trình duyệt.
