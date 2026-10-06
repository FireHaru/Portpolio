# Báo cáo nâng cấp portfolio Nguyễn Nhật Đăng

Ngày thực hiện: 06/10/2026.

## 1. Tổng quan

Dự án sử dụng HTML, CSS và JavaScript thuần. Giữ lại ảnh chân dung, tên chủ sở hữu và sáu dự án có sẵn. Không thêm thư viện hoặc bước build.

Giao diện mới dùng nền trắng ngà/xanh đậm, typography lớn, điểm nhấn xanh lá, khung ảnh chân dung và thẻ dự án có hình minh họa bằng CSS. Bố cục được thiết kế cho desktop, tablet và điện thoại.

## 2. Chức năng thêm mới và cải tiến

| Chức năng | Cách sử dụng / hành vi |
| --- | --- |
| Chi tiết dự án | Bấm “Khám phá dự án” trên thẻ để mở hộp thoại có mô tả, công nghệ và liên kết hồ sơ GitHub. Đóng bằng nút ×, Escape hoặc bấm ngoài hộp thoại. |
| Tìm kiếm mở rộng | Tìm theo tên, mô tả, chủ đề và công nghệ. Hỗ trợ tiếng Việt không dấu, ví dụ `ran san moi`. |
| Phím tắt tìm kiếm | Nhấn `/` khi không nhập liệu và không mở chi tiết để đưa con trỏ vào ô tìm kiếm. |
| Sắp xếp | Chọn thứ tự mặc định hoặc tên A–Z. Có thể kết hợp tìm kiếm và lọc công nghệ. |
| Số lượng kết quả | Hiển thị số dự án phù hợp trên tổng số dự án. |
| Trạng thái không có kết quả | Hiển thị hướng dẫn và nút “Xóa bộ lọc” để đặt lại tìm kiếm, công nghệ và sắp xếp. |
| Menu di động | Menu thu gọn trên màn hình nhỏ; đóng khi chọn liên kết hoặc nhấn Escape. |
| Điều hướng theo khu vực | Đánh dấu mục điều hướng tương ứng với phần đang xuất hiện trên màn hình. |
| Về đầu trang | Nút ↑ xuất hiện sau khi cuộn hơn 500px. |
| Lưu nháp lời nhắn | Tên, email và nội dung được lưu trong localStorage khi nhập; khôi phục khi mở lại trang. Có nút xóa nháp. |
| Sao chép lời nhắn | Kiểm tra dữ liệu rồi sao chép nội dung có định dạng để gửi qua mạng xã hội. Nếu clipboard không khả dụng, hướng dẫn tải file. |
| Tải lời nhắn | Tạo file UTF-8 `loi-nhan-nhat-dang.txt` sau khi dữ liệu hợp lệ. |
| Kiểm tra form | Tên và email bắt buộc; email đúng định dạng; lời nhắn ít nhất 10 ký tự sau khi bỏ khoảng trắng và tối đa 3000 ký tự. |
| Giao diện sáng/tối | Cải thiện phối màu cho toàn trang. Giữ lựa chọn của người dùng; lấy giao diện hệ thống khi chưa có lựa chọn. |
| Năm bản quyền | Tự cập nhật theo năm của trình duyệt. |

## 3. Cải thiện chất lượng

- Sửa nhãn GitHub/LinkedIn bị đảo trong bản cũ.
- Sửa thuộc tính `name` bị lặp ở trường họ tên.
- Chuẩn hóa tag `Python` bị dư khoảng trắng.
- Tách logic đổi theme từ HTML sang `app.js`.
- Thêm meta description, liên kết bỏ qua điều hướng, focus bàn phím rõ ràng, nhãn nút và thông báo live cho kết quả/form.
- Hỗ trợ tùy chọn giảm chuyển động của hệ điều hành.
- Nội dung dự án được đưa vào DOM bằng `textContent`, không nội suy thành HTML.
- Xử lý lỗi localStorage/clipboard để các thao tác còn lại vẫn dùng được.

## 4. Các file thay đổi

- `index.html`: bố cục, nội dung, form, menu, hộp thoại, metadata.
- `styles.css`: hệ thống màu, responsive, thẻ dự án, trạng thái focus và giao diện tối.
- `app.js`: tìm kiếm, lọc, sắp xếp, chi tiết, điều hướng, theme và soạn lời nhắn.
- `data.js`: dữ liệu sáu dự án với mô tả, nhóm chủ đề và ký hiệu hiển thị.
- `BAO_CAO_NANG_CAP.md`: báo cáo này.

## 5. Kiểm tra đã thực hiện

- Kiểm tra cú pháp ES module cho `app.js` và `data.js`: đạt.
- Kiểm tra ID/thuộc tính HTML không trùng, liên kết nội bộ, nhãn form và file tài nguyên: đạt.
- Kiểm tra dữ liệu sáu dự án, ID duy nhất và tag chuẩn hóa: đạt.
- Kiểm tra tìm kiếm không dấu, tìm theo công nghệ, lọc Python, kết hợp bộ lọc và trường hợp không có kết quả: đạt.
- `git diff --check`: đạt; Git có cảnh báo chuẩn hóa LF/CRLF trên Windows.
- Chưa xác minh bằng trình duyệt hoặc ảnh chụp giao diện. Kiểm tra HTTP cục bộ bị môi trường hạn chế kết nối socket (WinError 10013). Cần kiểm tra thêm giao diện thực tế, menu, dialog, clipboard và tải file trong trình duyệt.

## 6. Chạy dự án

Tại thư mục dự án, chạy:

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Mở `http://127.0.0.1:5173` bằng trình duyệt. Dùng HTTP thay vì mở trực tiếp `index.html` để ES module được tải đúng. Clipboard yêu cầu môi trường an toàn và quyền của trình duyệt; localhost thường được hỗ trợ. Nếu sao chép thất bại, dùng “Tải .txt”.

## 7. Giới hạn và dữ liệu cần bổ sung

Form hiện là công cụ soạn lời nhắn, **không gửi email hoặc gửi tin tự động**. Dự án chưa có backend, email nhận tin hoặc dịch vụ gửi form. Người dùng cần tự gửi nội dung qua GitHub/LinkedIn.

Nháp được lưu trên trình duyệt đang sử dụng và có thể còn trên máy dùng chung. Dùng “Xóa nháp” để xóa thông tin sau khi dùng.

Mô tả dự án được tóm tắt từ tên và công nghệ có sẵn; chưa xác minh mã nguồn, kết quả hoặc mức độ hoàn thành từng dự án. Liên kết trong hộp thoại dẫn đến hồ sơ GitHub, chưa phải repository riêng. Có thể cập nhật dữ liệu trong `data.js` khi có mô tả chính xác, ảnh chụp, repo và demo thực tế.

## 8. Bổ sung hoạt động Hội, kỹ năng mềm và thành tích

Theo thông tin chủ sở hữu cung cấp, đã bổ sung:

- Vai trò **nguyên Liên chi Hội trưởng Khoa Vật lý – Vật lý kỹ thuật**.
- Hoạt động: **Xuân tình nguyện**, **GreenDay**, **thi thử TOEIC**, **lễ tuyên dương Sinh viên 5 Tốt**, cùng nội dung giới thiệu các hoạt động khác.
- Kỹ năng mềm gắn với kinh nghiệm công tác Hội: lãnh đạo và làm việc nhóm; lập kế hoạch và tổ chức; giao tiếp và kết nối; giải quyết vấn đề, quản lý thời gian và trách nhiệm.
- Ba thành tích: giấy chứng nhận **Thanh niên tiên tiến làm theo lời Bác**; bằng khen **Hội Sinh viên Thành phố** về thành tích xuất sắc trong chiến dịch Xuân tình nguyện; giấy khen **Hội Sinh viên Thành phố** về hoàn thành xuất sắc nhiệm vụ.
- Thêm mục điều hướng **Hoạt động** và **Thành tích**, tương thích với menu di động và đánh dấu khu vực đang xem.
- Bảy khung ảnh: bốn khung hoạt động và ba khung giấy khen/chứng nhận. Chưa có ảnh hoặc ảnh tải lỗi sẽ hiển thị khung chờ. Ảnh giấy khen dùng `object-fit: contain` để không cắt nội dung; ảnh hoạt động dùng `cover`.

### Cách bổ sung ảnh

Đặt file vào `assets/activities/` hoặc `assets/achievements/`, rồi điền đường dẫn vào `photos.js`. Hướng dẫn và ví dụ đầy đủ nằm ở `assets/README.md`. Để giá trị rỗng nếu chưa có ảnh. Đây là cấu hình ảnh trong mã nguồn, không phải tính năng upload trực tuyến.

Chưa thêm năm, nhiệm kỳ, tên trường, số lượng người tham gia hoặc đơn vị cấp chứng nhận chi tiết vì chưa có thông tin. Các kỹ năng được diễn đạt từ kinh nghiệm công tác Hội, không gán điểm số hoặc mức độ chứng nhận.

### Kiểm tra bổ sung

Đã kiểm tra cú pháp JavaScript, ID và liên kết nội bộ HTML, bảy khóa cấu hình ảnh khớp bảy khung ảnh, tài nguyên hiện có và `git diff --check`. Chưa kiểm tra trực quan bằng trình duyệt.

## 9. Slideshow nhiều ảnh cho hoạt động — cập nhật giao diện

- `photos.js` nhận một đường dẫn hoặc danh sách nhiều đường dẫn cho mỗi khung.
- `gallery.js` quản lý slideshow độc lập cho từng hoạt động/thành tích; `app.js` gọi khởi tạo.
- Từ hai ảnh trở lên: mũi tên trước/sau, các chấm chọn ảnh ở phía dưới, chuyển vòng và tự chuyển mỗi 5 giây.
- Chấm sáng thể hiện ảnh đang xem; bấm chấm để chọn trực tiếp. Đã bỏ nút tạm dừng/tiếp tục và bộ đếm số theo yêu cầu.
- Hiệu ứng trượt ngang khi đổi ảnh; kéo bằng chuột hoặc vuốt ngang trên điện thoại. Kéo chưa đủ ngưỡng hoặc bị hủy sẽ trở về ảnh hiện tại; thao tác dọc vẫn cuộn trang.
- Hỗ trợ phím trái/phải khi focus trong khung. Tạm ngừng tự chuyển khi hover, focus, kéo ảnh, ngoài viewport hoặc tab bị ẩn.
- Khi bật giảm chuyển động: không tự chuyển và không chạy hiệu ứng trượt; điều khiển thủ công vẫn hoạt động.
- Ảnh tải lỗi hiển thị khung chờ riêng cho ảnh đó. Khung một ảnh không hiện mũi tên/chấm.

Kiểm tra: cú pháp module và `git diff --check` đạt. Kiểm tra DOM mô phỏng đạt cho số lượng/trạng thái chấm, chọn chấm, biến đổi trượt ảnh, chu kỳ 5000ms, chuyển vòng, kéo/vuốt hai chiều, kéo ngắn, hủy kéo và thao tác dọc. Chưa kiểm tra trực quan bằng trình duyệt. Hướng dẫn sử dụng đã cập nhật ở `assets/README.md`.

## 10. Sửa khung ảnh và căn giữa mũi tên

- Khung chưa cấu hình ảnh: ẩn thẻ ảnh không có nguồn, hiện một khung chờ duy nhất để tránh chiều cao gấp đôi.
- Track slideshow đặt tuyệt đối trong vùng ảnh tỷ lệ 16:10 để chiều cao không tăng theo nội dung.
- Mũi tên dùng nét vẽ CSS thay ký tự chữ; căn giữa theo hình học trong nút tròn nhỏ, trong suốt.
- Kiểm tra cú pháp, trạng thái khung không ảnh bằng DOM mô phỏng và `git diff --check`: đạt. Chưa kiểm tra trực quan trên trình duyệt.

## 11. Thành tích trong một hàng cuộn ngang

- Các thẻ thành tích luôn nằm trên một hàng, không xuống dòng khi bổ sung thẻ.
- Desktop hiển thị ba thẻ, tablet hai thẻ, điện thoại một thẻ và một phần thẻ tiếp theo.
- Nút trái/phải cuộn theo chiều rộng một thẻ; tự vô hiệu hóa ở đầu/cuối danh sách. Có thể vuốt ngang hoặc dùng phím trái/phải khi focus danh sách.
- Thêm thành tích mới bằng cách chèn `article.achievement-card` bên trong `#achievement-list`; khai báo khóa ảnh tương ứng trong `photos.js` nếu có ảnh.
- Kiểm tra cú pháp JavaScript và `git diff --check`: đạt. Chưa kiểm tra trực quan bằng trình duyệt.

## 12. Hoạt động trong một hàng cuộn ngang

- Danh sách hoạt động luôn nằm trên một hàng; desktop/tablet hiện hai thẻ, điện thoại hiện một thẻ và một phần thẻ tiếp theo.
- Thêm nút trái/phải, cuộn ngang và điều hướng bàn phím khi focus danh sách. Các nút tự vô hiệu hóa ở đầu/cuối.
- Hai hàng hoạt động/thành tích dùng chung hàm điều khiển nhưng vận hành độc lập. Slideshow trong từng thẻ vẫn hoạt động riêng.
- Thêm hoạt động mới bằng cách chèn `article.activity-card` trong `#activity-list`, rồi khai báo ảnh trong `photos.js`.
- Kiểm tra cú pháp JavaScript và `git diff --check`: đạt. Chưa kiểm tra trực quan bằng trình duyệt.

## 13. Gửi lời nhắn về email bằng FormSubmit

- Form POST đến `https://formsubmit.co/nguyennhatdang89@gmail.com`, dùng dịch vụ backend FormSubmit thay cho backend tự triển khai.
- Nút chính là “Gửi lời nhắn”; giữ các nút sao chép, tải file và xóa nháp riêng.
- Form chuyển sang trang dịch vụ để thực hiện xác minh và xử lý gửi; giữ reCAPTCHA mặc định, không báo thành công từ JavaScript trước khi dịch vụ xử lý.
- Lần gửi đầu tiên yêu cầu chủ hộp thư mở email kích hoạt từ FormSubmit. Sau khi xác nhận, gửi lại để kiểm tra nhận tin. Kiểm tra thư mục Spam nếu chưa thấy email.
- Tên, email và lời nhắn được chuyển đến dịch vụ bên thứ ba; thông tin này được nêu ngay trên form. Email người gửi cho phép chủ hộp thư trả lời.
- Chạy website qua HTTP/HTTPS. Bản nháp vẫn lưu cục bộ; dùng “Xóa nháp” sau khi gửi nếu muốn xóa.
- Kiểm tra cú pháp JavaScript, cấu hình POST, các trường có tên và `git diff --check`: đạt. Chưa gửi tin thực tế hoặc xác minh kích hoạt/nhận email.

Tài liệu dịch vụ: https://formsubmit.co/ . Phần này thay thế giới hạn “form không gửi email” ở mục 7.

## 14. Gửi tại chỗ và làm trống form

- Chuyển sang FormSubmit AJAX theo https://formsubmit.co/ajax-documentation; gửi trong trang, không chuyển sang trang Thanks khi JavaScript hoạt động.
- Chỉ reset form và bộ đếm sau phản hồi HTTP thành công với `success` là true. Lỗi giữ nội dung để thử lại.
- Chặn gửi lặp, hiển thị trạng thái đang gửi, khóa nhập tạm thời và xử lý timeout 30 giây.
- Bỏ sao chép, tải TXT, xóa nháp; ngừng lưu/khôi phục nháp và xóa dữ liệu nháp cũ trên trình duyệt.
- Kiểm tra cú pháp, diff và mô phỏng phản hồi thành công/thất bại: đạt. Chưa thử gửi email thực tế qua AJAX.
- Form POST cũ giữ làm phương án dự phòng khi JavaScript không hoạt động; trường hợp này dịch vụ có thể vẫn chuyển trang.

## 15. Dự án giới hạn hai hàng và cuộn ngang

- Desktop hiện tối đa 6 dự án trong 3 cột × 2 hàng. Các dự án thêm nằm bên phải, dùng thanh cuộn hoặc nút trái/phải để xem.
- Tablet hiện 2 cột × 2 hàng; điện thoại 1 cột × 2 hàng để giữ kích thước thẻ dễ đọc.
- Nút điều hướng chỉ hiện khi danh sách tràn ngang; hỗ trợ bàn phím khi focus danh sách.
- Tìm kiếm/lọc/sắp xếp vẫn áp dụng toàn bộ dữ liệu và đưa danh sách về vị trí đầu.
- Kiểm tra cú pháp JavaScript và `git diff --check`: đạt; chưa kiểm tra trực quan trên trình duyệt.

## 16. Bộ công cụ trong một hàng trượt ngang

- “Những gì mình sử dụng” chuyển thành hàng cuộn ngang, có nút trước/sau và vuốt trên điện thoại.
- Desktop hiện 3 thẻ, tablet 2 thẻ, điện thoại 1 thẻ và một phần thẻ tiếp theo. Thẻ thêm mới không xuống dòng.
- Dùng lại điều khiển danh sách, vô hiệu hóa nút tại đầu/cuối; hỗ trợ phím trái/phải khi focus danh sách.
- Kiểm tra cú pháp JavaScript và `git diff --check`: đạt. Chưa kiểm tra trực quan bằng trình duyệt.

## 17. Thử nghiệm bố cục ưu tiên nội dung

- Kỹ năng: hiện ba nhóm trên desktop; chỉ cuộn ngang trên điện thoại. Điều khiển chỉ hiện khi tràn.
- Dự án: lưới 3 cột trên desktop, 2 cột tablet, 1 cột điện thoại; hiển thị 6 mục đầu và nút “Xem thêm” thêm mỗi lần 6 mục. Tìm kiếm/lọc/sắp xếp đặt lại giới hạn về 6. Với dữ liệu hiện tại chỉ có 6 dự án, nút được ẩn.
- Hoạt động/thành tích: giữ một hàng cuộn ngang, hé thẻ tiếp theo; nút chỉ xuất hiện khi có nội dung bị khuất.
- Ảnh trong thẻ là ảnh bìa tĩnh; bấm “Xem ảnh” mở dialog lớn. Chuyển ảnh bằng mũi tên/chấm/phím hoặc vuốt trong dialog; đóng bằng Escape, nút × hoặc bấm bên ngoài. Giấy khen hiển thị trọn ảnh.
- Loại bỏ tự chuyển ảnh trong thẻ để tránh hai lớp thao tác ngang.
- Kiểm tra cú pháp hai module, cấu trúc HTML, ID/liên kết điều khiển và diff: đạt. Chưa kiểm tra trực quan bằng trình duyệt.

## 18. Hoàn tác bản thử nghiệm bố cục

Đã trở về thanh trượt chung cho kỹ năng, hoạt động, thành tích và dự án (hai hàng). Bỏ “Xem thêm” và cửa sổ xem ảnh thử nghiệm; slideshow trở lại ngay trong thẻ với mũi tên, chấm, vuốt và tự chuyển 3 giây như cấu hình trước thử nghiệm. Giữ các sửa lỗi khung ảnh, căn giữa mũi tên và form gửi email tại chỗ. Kiểm tra cú pháp và diff đạt.

## 19. Gom thành phần dùng chung

- Xóa các khai báo slider riêng và các bản `.card-slider` bị lặp; dùng một bộ CSS với biến số cột/hàng/khoảng cách và hai breakpoint responsive.
- Thêm `.surface-card` dùng chung nền, viền, bo góc cho kỹ năng, dự án, hoạt động, thành tích và form.
- Thêm `.arrow-button`, `.arrow-prev`, `.arrow-next` dùng chung hình mũi tên; giữ biến thể màu/kích thước riêng cho danh sách và ảnh.
- Tách khởi tạo thanh trượt sang `slider.js`, tự nhận class/aria-controls, không khai báo riêng từng danh sách trong app.
- Giữ cấu hình hiện tại: dự án hai hàng, slideshow trong thẻ và form gửi email tại chỗ.
- Hướng dẫn thêm thành phần: `CAU_TRUC_CODE.md`.
- Kiểm tra cú pháp module, liên kết 4 slider/8 nút, class thẻ, CSS không còn bố cục slider riêng và mô phỏng cuộn độc lập/trạng thái đầu-cuối: đạt. `git diff --check`: đạt. Chưa kiểm tra trực quan bằng trình duyệt.
