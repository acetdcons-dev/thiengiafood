# Kiểm kê hình ảnh Thiên Gia Food

Ngày cập nhật: 2026-09-08
Trạng thái: bộ ảnh AI minh họa Giai đoạn 2 đã được tạo, kiểm tra trực quan và tích hợp. Các ảnh này không đại diện cho khách hàng thật hoặc tiệc thật của Thiên Gia Food.

## Quy ước

- Công cụ tạo: built-in `image_gen`.
- Bản PNG là bản gốc chất lượng cao do công cụ tạo ra.
- Bản WebP là bản website, xuất bằng FFmpeg/libwebp ở quality 82.
- Không ảnh nào chứa chữ, logo hoặc watermark nhìn thấy được.
- Không phát hiện lỗi tay, gương mặt, món ăn hay dụng cụ cần tạo lại.
- 22 ảnh cũ vẫn được giữ nguyên tại `assets/img/`, không bị ghi đè hoặc xóa.

## Ảnh đã tạo và tích hợp

| Ảnh | Vị trí sử dụng | PNG gốc | WebP website | Dung lượng WebP | Trạng thái |
|---|---|---:|---:|---:|---|
| `hero-thien-gia-food-ai-v1` | Hero | 1448×1086 | 1600×1200, 4:3 | 265,850 B | Đạt |
| `service-family-party-ai-v1` | Tiệc gia đình | 1448×1086 | 1200×900, 4:3 | 152,036 B | Đạt |
| `service-birthday-ai-v1` | Sinh nhật | 1448×1086 | 1200×900, 4:3 | 92,254 B | Đạt |
| `service-housewarming-ai-v1` | Tân gia | 1448×1086 | 1200×900, 4:3 | 184,074 B | Đạt |
| `service-wedding-ai-v1` | Cưới hỏi | 1448×1086 | 1200×900, 4:3 | 123,988 B | Đạt |
| `service-memorial-ai-v1` | Giỗ/lễ gia đình | 1448×1086 | 1200×900, 4:3 | 96,248 B | Đạt |
| `service-corporate-buffet-ai-v1` | Buffet/công ty | 1448×1086 | 1200×900, 4:3 | 145,214 B | Đạt |
| `concept-standard-table-ai-v1` | Phong cách bàn gọn gàng | 1536×1024 | 1200×800, 3:2 | 83,072 B | Đạt |
| `concept-vip-table-ai-v1` | Phong cách bàn chỉn chu | 1536×1024 | 1200×800, 3:2 | 126,114 B | Đạt |
| `concept-wedding-setup-ai-v1` | Setup cưới hỏi | 1536×1024 | 1200×800, 3:2 | 170,402 B | Đạt |
| `concept-birthday-setup-ai-v1` | Setup sinh nhật | 1536×1024 | 1200×800, 3:2 | 87,404 B | Đạt |
| `concept-buffet-setup-ai-v1` | Setup buffet | 1536×1024 | 1200×800, 3:2 | 131,122 B | Đạt |
| `concept-bbq-setup-ai-v1` | Setup BBQ | 1536×1024 | 1200×800, 3:2 | 103,040 B | Đạt |
| `process-preparation-ai-v1` | Quy trình chuẩn bị; lý do lựa chọn | 1448×1086 | 1200×900, 4:3 | 92,328 B | Đạt |
| `process-service-cleanup-ai-v1` | Quy trình thu dọn; lý do lựa chọn | 1448×1086 | 1200×900, 4:3 | 96,834 B | Đạt |
| `og-thien-gia-food-ai-v1` | Open Graph | 1726×911 | 1200×630, 40:21 | 73,676 B | Đạt |

## Prompt hệ thống hình ảnh

Prompt chung: ảnh thương mại chân thực trong nhà phố hoặc sân nhà Việt Nam; người Việt Nam tự nhiên; phong cách sang trọng vừa phải, ấm cúng; đỏ rượu vang, vàng champagne và kem ngà; nhân viên áo sơ mi kem và tạp dề đỏ rượu không logo; món Việt và khẩu phần tự nhiên; ánh sáng ấm; không chữ, logo, watermark hoặc thương hiệu khác; không bối cảnh khách sạn nước ngoài; tay, mặt, chén đĩa, dụng cụ và món ăn phải đúng cấu trúc.

Mỗi prompt riêng bổ sung đúng chủ thể tương ứng: tiệc gia đình, sinh nhật, tân gia, cưới hỏi, giỗ truyền thống, buffet công ty, sáu phong cách setup, chuẩn bị nguyên liệu, thu dọn và bố cục Open Graph. Hero và Open Graph yêu cầu khoảng thở thị giác; ảnh setup không được mô tả như sự kiện thật.

## Lưu ý triển khai

- Hero dùng WebP 1600×1200, tải ưu tiên và không lazy-load.
- Tất cả ảnh nội dung dưới hero có `loading="lazy"`, `decoding="async"`, `width`, `height` và alt tiếng Việt.
- Open Graph đang dùng đường dẫn tương đối. Khi có domain production, cần đổi sang URL tuyệt đối để crawler mạng xã hội hoạt động ổn định.
- Khi có ảnh chính chủ đã được phép sử dụng, nên thay ảnh AI ở các khu vực cần tạo niềm tin và giữ chú thích minh bạch trong thời gian chuyển tiếp.

## Bộ ảnh 38 thực đơn - Giai đoạn 4

- Công cụ tạo: built-in `image_gen`, 38 lượt tạo riêng, không dùng ảnh nguồn hoặc ảnh tham chiếu.
- File: `assets/images/ai/menus/menu-01-thien-gia-ai-v1` đến `menu-38-thien-gia-ai-v1`, mỗi ảnh có PNG 1200×900 và WebP 1200×900.
- Nội dung: mỗi ảnh tập trung vào 2-3 món đại diện lấy từ đúng thực đơn tương ứng; bối cảnh bàn tiệc tại nhà Việt Nam.
- Kiểm tra trực quan: đã xem riêng cả 38 WebP; không phát hiện chữ, logo, watermark, tay người lỗi, dụng cụ biến dạng nghiêm trọng hoặc hai ảnh trùng nguyên bản.
- Ảnh cần tạo lại sau kiểm tra: không có.
- Dung lượng 38 WebP: 3.891.724 byte (khoảng 3,71 MiB); nhỏ nhất 68.264 byte, lớn nhất 140.026 byte. Ảnh dưới màn hình đầu dùng lazy-load.
- Ảnh được chú thích rõ là minh họa AI, không được trình bày như hình tiệc hoặc món giao thực tế.
- Bản sinh trực tiếp 1448×1086 được giữ cục bộ trong thư mục `originals/` và không đưa vào Git; PNG bàn giao trong dự án đã chuẩn hóa đúng 1200×900 theo yêu cầu.
