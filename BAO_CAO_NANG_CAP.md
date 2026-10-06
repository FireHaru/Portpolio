# Báo cáo chức năng và cải tiến portfolio Nguyễn Nhật Đăng

**Ngày cập nhật:** 06/10/2026

**Phiên bản code tham chiếu:** `a0c8022` trên nhánh `main`

**Repository:** https://github.com/FireHaru/Portpolio

Báo cáo này mô tả trạng thái hiện tại và các thay đổi so với bản dự án được đọc ở đầu quá trình chỉnh sửa. Thay thế báo cáo lịch sử trước đây để tránh nhầm giữa tính năng hiện có và các thử nghiệm đã bỏ.

## 1. So sánh tổng quan với bản ban đầu

Bản ban đầu là website HTML/CSS/JavaScript thuần, có giới thiệu cá nhân, danh sách kỹ năng, sáu dự án, tìm kiếm theo tên, lọc công nghệ và đổi giao diện sáng/tối. Form liên hệ chỉ có trường nhập, chưa kết nối gửi lời nhắn.

| Hạng mục | Bản ban đầu | Phiên bản hiện tại |
| --- | --- | --- |
| Giao diện | Bố cục cơ bản, danh sách kỹ năng dạng tag | Bố cục phân khu rõ, hero lớn, ảnh chân dung, thẻ nội dung, màu sáng/tối đồng bộ |
| Kỹ năng | Danh sách công nghệ | Ba nhóm: lập trình, AI & dữ liệu, phát triển web; một hàng cuộn ngang |
| Dự án | Tên và tag | Thẻ có chủ đề, mô tả, ký hiệu, công nghệ và hộp thoại chi tiết |
| Tìm kiếm | Theo tên | Theo tên, mô tả, chủ đề, công nghệ; hỗ trợ không dấu |
| Sắp xếp | Chưa có | Mặc định hoặc tên A–Z |
| Kết quả tìm kiếm | Danh sách đơn giản | Bộ đếm, thông báo không có kết quả, nút xóa bộ lọc |
| Hoạt động và kỹ năng mềm | Chưa có | Công tác Hội, bốn nhóm kỹ năng mềm và các thẻ hoạt động |
| Thành tích | Chưa có | Ba thành tích cùng khung ảnh giấy khen/chứng nhận |
| Ảnh hoạt động | Chưa có | Cấu hình nhiều ảnh, slideshow trượt, mũi tên, chấm chọn, kéo/vuốt |
| Liên hệ | Chưa có nơi nhận | Gửi AJAX qua FormSubmit đến email, giữ nguyên trang và reset khi thành công |
| Điều hướng | Liên kết khu vực | Thêm hoạt động/thành tích, menu di động, đánh dấu khu vực, về đầu trang |
| Cấu trúc code | Các file cơ bản | Module slider/gallery, class dùng chung, dữ liệu ảnh riêng và hướng dẫn bảo trì |

## 2. Giao diện và điều hướng

- Thiết kế lại theo phong cách tối giản với nền trắng ngà, điểm nhấn xanh và phiên bản tối tương ứng.
- Hero có tiêu đề lớn, giới thiệu, ảnh chân dung và các liên kết đến dự án/liên hệ.
- Các khu vực có nhãn, tiêu đề và khoảng cách nhất quán.
- Giữ chức năng sáng/tối có sẵn; đồng bộ màu cho thành phần mới, lưu lựa chọn và theo giao diện hệ thống khi chưa có lựa chọn.
- Header cố định khi cuộn; thêm liên kết Hoạt động và Thành tích.
- Menu di động mở/đóng bằng nút, đóng khi chọn mục hoặc nhấn Escape.
- Đánh dấu mục điều hướng theo khu vực đang xuất hiện bằng IntersectionObserver.
- Nút về đầu trang hiện khi cuộn hơn 500px.
- Năm bản quyền cập nhật theo năm của trình duyệt.
- Căn đều hai bên đoạn giới thiệu kinh nghiệm Liên chi Hội trưởng.

## 3. Kỹ năng và thanh trượt danh sách

### 3.1. Nội dung kỹ năng

Ba nhóm kỹ năng chuyên môn:

1. **Lập trình:** Python, C/C++, Git.
2. **AI & dữ liệu:** Machine Learning, NLP, xử lý hình ảnh số.
3. **Phát triển web:** HTML & CSS, JavaScript, API.

### 3.2. Thanh trượt dùng chung

Kỹ năng, dự án, hoạt động và thành tích dùng `.card-slider`:

- Cuộn ngang; thêm thẻ mới không làm danh sách kéo dài bằng cách xuống hàng ngoài cấu hình.
- Nút trái/phải cuộn theo chiều rộng một thẻ cộng khoảng cách.
- Hỗ trợ cuộn/vuốt ngang tự nhiên và phím trái/phải khi focus vào danh sách.
- Scroll snap giúp dừng theo vị trí thẻ.
- Nút vô hiệu hóa khi tới đầu hoặc cuối danh sách.
- Theo dõi resize và thay đổi danh sách để cập nhật trạng thái điều khiển.
- Nhóm nút dự án được ẩn khi không có nội dung tràn ngang.

| Danh sách | Desktop | Tablet | Điện thoại |
| --- | --- | --- | --- |
| Kỹ năng | 3 cột, 1 hàng | 2 cột | Một thẻ rộng 88%, hé phần tiếp theo |
| Dự án | 3 cột × 2 hàng, tối đa 6 thẻ trong vùng nhìn | 2 cột × 2 hàng | 1 cột × 2 hàng |
| Hoạt động | 2 cột, 1 hàng | 2 cột | Một thẻ rộng 88% |
| Thành tích | 3 cột, 1 hàng | 2 cột | Một thẻ rộng 88% |

Giới hạn sáu dự án là cách bố trí vùng nhìn trên desktop, không phải cắt bỏ dữ liệu. Dự án thêm vẫn được render và xem bằng cuộn ngang.

## 4. Chức năng dự án

- Giữ sáu dự án ban đầu, bổ sung mô tả tóm tắt, chủ đề và ký hiệu minh họa.
- Thẻ hiển thị tên, nhóm chủ đề, mô tả và công nghệ riêng thành các tag.
- Tìm kiếm trên tên, mô tả, chủ đề và công nghệ; chuẩn hóa tiếng Việt không dấu và chữ hoa/thường.
- Kết hợp tìm kiếm với bộ lọc công nghệ.
- Sắp xếp mặc định hoặc theo tên A–Z tiếng Việt.
- Hiển thị số dự án phù hợp trên tổng số dự án.
- Khi không có kết quả: thông báo, gợi ý tìm khác và nút đặt lại tìm kiếm/lọc/sắp xếp.
- Phím `/` đưa con trỏ vào ô tìm kiếm khi không nhập liệu hoặc mở dialog.
- Thay đổi danh sách đưa vị trí cuộn về đầu.
- Nút “Khám phá dự án” mở dialog có tên, mô tả, công nghệ và liên kết hồ sơ GitHub.
- Đóng dialog bằng nút ×, Escape hoặc bấm ngoài khung.
- Ô sắp xếp dùng `.select-control` với mũi tên CSS căn giữa, không phụ thuộc vị trí biểu tượng mặc định của trình duyệt.

**Giới hạn nội dung:** mô tả tóm tắt từ danh mục có sẵn; chưa có repository, demo, kết quả hoặc ảnh sản phẩm riêng cho từng dự án. Liên kết trong dialog hiện dẫn đến hồ sơ GitHub.

## 5. Kinh nghiệm Hội, kỹ năng mềm và hoạt động

### 5.1. Kinh nghiệm

Bổ sung kinh nghiệm từng làm **Liên chi Hội trưởng Khoa Vật lý – Vật lý kỹ thuật**, giới thiệu quá trình tạo ra và tổ chức hoạt động cho sinh viên.

### 5.2. Kỹ năng mềm

- Lãnh đạo và làm việc nhóm: kết nối thành viên, phân công và phối hợp.
- Lập kế hoạch và tổ chức: xây dựng chương trình, sắp xếp nguồn lực, theo dõi tiến độ.
- Giao tiếp và kết nối: trao đổi, phối hợp các bên, truyền đạt thông tin.
- Giải quyết vấn đề: xử lý tình huống, quản lý thời gian và trách nhiệm.

Các kỹ năng được diễn đạt từ kinh nghiệm người dùng cung cấp; không gán điểm hoặc mức chứng nhận.

### 5.3. Các thẻ đang hiển thị

- Liên chi Hội.
- Xuân tình nguyện.
- GreenDay.
- Lễ tuyên dương Sinh viên 5 Tốt.

Thi thử TOEIC và các chương trình khác được nhắc trong phần giới thiệu công tác Hội; hiện không có thẻ TOEIC riêng trong danh sách.

Chưa bổ sung nhiệm kỳ, năm tổ chức, số người tham gia hoặc kết quả định lượng vì chưa có dữ liệu cụ thể.

## 6. Thành tích

Ba thẻ thành tích:

1. Giấy chứng nhận **Thanh niên tiên tiến làm theo lời Bác**.
2. Bằng khen **Hội Sinh viên Thành phố** về thành tích xuất sắc trong chiến dịch Xuân tình nguyện.
3. Giấy khen **Hội Sinh viên Thành phố** về hoàn thành xuất sắc nhiệm vụ.

Mỗi thẻ có loại ghi nhận, tiêu đề, mô tả và khung ảnh. Ảnh giấy khen dùng `object-fit: contain` để giữ trọn nội dung, trong khi ảnh hoạt động dùng `cover` để lấp khung.

## 7. Slideshow ảnh

`photos.js` cấu hình một đường dẫn hoặc danh sách đường dẫn cho từng `data-photo` trong HTML.

- Một ảnh: hiển thị ảnh, không thêm điều khiển slideshow.
- Từ hai ảnh: mũi tên trước/sau, các chấm phía dưới và chuyển vòng.
- Chấm sáng thể hiện ảnh đang xem; bấm chấm để chọn trực tiếp.
- Tự chuyển sau **3 giây** theo cấu hình hiện tại trong `gallery.js`.
- Hiệu ứng trượt ngang khoảng **0,45 giây** theo CSS hiện tại.
- Kéo bằng chuột hoặc vuốt ngang để chuyển ảnh; ảnh đi theo thao tác kéo.
- Kéo chưa đủ ngưỡng hoặc bị hủy sẽ trở lại ảnh hiện tại; thao tác dọc ưu tiên cuộn trang.
- Phím trái/phải chuyển ảnh khi focus trong khung.
- Tạm ngừng tự chuyển khi hover, focus, đang kéo, khung ngoài viewport hoặc tab bị ẩn.
- Tắt tự chuyển khi người dùng bật giảm chuyển động.
- Không có nút tạm dừng/tiếp tục và không có bộ đếm dạng số, theo yêu cầu giao diện.
- Khung chưa có ảnh hoặc ảnh lỗi hiển thị placeholder, không cộng thêm chiều cao của thẻ ảnh trống.
- Vùng ảnh và slideshow cùng tỷ lệ 16:10; track được đặt tuyệt đối để giữ chiều cao.
- Nút mũi tên nhỏ, nền trong suốt; mũi tên vẽ bằng CSS để căn giữa ổn định.
- Ảnh dùng lazy loading và được cấu hình alt tương ứng.

## 8. Form gửi email tại chỗ

**Email nhận:** `nguyennhatdang89@gmail.com`.

- Dùng FormSubmit làm dịch vụ backend; không có server gửi email tự triển khai trong repository.
- Khi JavaScript hoạt động, gửi POST JSON đến endpoint AJAX, giữ người dùng trên portfolio.
- Kiểm tra tên, email và lời nhắn bắt buộc; email theo định dạng trình duyệt; lời nhắn ít nhất 10 ký tự sau trim và tối đa 3000 ký tự.
- Hiển thị bộ đếm ký tự.
- Trong lúc gửi: khóa nút, chặn gửi lặp, đặt trường nhập read-only và thông báo đang gửi.
- Chỉ reset form khi HTTP thành công và dịch vụ trả `success` là true.
- Phản hồi thành công được diễn đạt là dịch vụ đã tiếp nhận, không khẳng định email đã tới hộp thư.
- Lỗi hoặc timeout 30 giây giữ lại nội dung và khôi phục khả năng gửi.
- Đã bỏ sao chép, tải TXT, xóa nháp; không lưu/khôi phục nội dung liên hệ bằng localStorage. Nháp của phiên bản cũ được xóa khi khởi tạo.
- Giữ action POST thường làm phương án dự phòng khi JavaScript không hoạt động; trường hợp này dịch vụ có thể chuyển sang trang riêng.

FormSubmit yêu cầu kích hoạt địa chỉ nhận khi dùng lần đầu. Việc nhận email còn phụ thuộc dịch vụ và hộp thư. Tên, email và lời nhắn được gửi cho dịch vụ bên thứ ba.

Tài liệu tích hợp: https://formsubmit.co/ajax-documentation .

## 9. Sửa lỗi và khả năng tiếp cận

- Sửa nhãn GitHub/LinkedIn bị đảo ở bản đầu.
- Sửa thuộc tính `name` bị lặp trong form.
- Chuẩn hóa tag Python bị dư khoảng trắng.
- Chuẩn hóa đường dẫn ảnh thành đường dẫn tương đối, tên file khớp chữ hoa/thường trong Git để tránh lỗi khi triển khai.
- Cập nhật ảnh Xuân tình nguyện dung lượng thấp hơn và thêm ảnh thứ sáu.
- Thêm meta description và theme-color.
- Thêm skip link, trạng thái focus rõ, nhãn điều khiển, aria-current cho chấm và khu vực, aria-live cho thông báo, aria-busy trong lúc gửi.
- Hỗ trợ giảm chuyển động cho cuộn và hiệu ứng.
- Nội dung dự án được gán qua `textContent`, không nội suy vào HTML.
- Xử lý lỗi localStorage cho theme và lỗi gửi form.

Chưa đo đầy đủ contrast, tốc độ tải, Lighthouse hoặc kiểm tra với trình đọc màn hình. Ảnh vẫn cần tối ưu thêm nếu triển khai cho nhiều người dùng.

## 10. Cấu trúc code dùng chung

| File / class | Trách nhiệm |
| --- | --- |
| `index.html` | Bố cục, nội dung, form và các khung ảnh |
| `styles.css` | Theme, responsive và kiểu dáng |
| `app.js` | Điều hướng, theme, tìm kiếm/lọc/sắp xếp, dialog dự án và gửi email |
| `slider.js` | Tự khởi tạo thanh trượt danh sách theo class và aria-controls |
| `gallery.js` | Slideshow ảnh, mũi tên, chấm, vuốt và timer |
| `data.js` | Dữ liệu dự án |
| `photos.js` | Cấu hình đường dẫn ảnh |
| `.card-slider` | Bố cục cuộn chung; biến số cột, hàng, khoảng cách và chiều rộng di động |
| `.surface-card` | Nền, viền và bo góc chung cho thẻ/form |
| `.arrow-button` | Hình tròn, kích thước và căn giữa mũi tên |
| `.arrow-prev`, `.arrow-next` | Hướng mũi tên |
| `.slider-arrow`, `.gallery-arrow` | Biến thể nút danh sách và slideshow |
| `.select-control` | Căn mũi tên ô chọn sắp xếp |

Các phần slider riêng trùng nhau đã được gom. Dùng biến CSS để giữ khác biệt về số cột/hàng; không cần thêm hàm gọi riêng cho mỗi mục mới. Hướng dẫn chi tiết: `CAU_TRUC_CODE.md`.

## 11. Bổ sung nội dung

### Dự án

Thêm đối tượng vào `projects` trong `data.js`, gồm `id` duy nhất, `title`, `tag`, `category`, `description`, `symbol`. Các chức năng render/lọc/tìm kiếm/sắp xếp tự áp dụng.

### Hoạt động hoặc thành tích

Thêm thẻ đúng cấu trúc vào danh sách tương ứng trong HTML, giữ `.surface-card`, `.portfolio-photo`, thẻ ảnh và `.photo-placeholder`. Khai báo `data-photo` duy nhất và thêm khóa tương ứng trong `photos.js`.

### Ảnh

```js
'xuan-tinh-nguyen': [
  'assets/activities/XTN-1.jpg',
  'assets/activities/XTN-2.jpg',
],
```

Tên và phần mở rộng phải khớp file thực tế. Dùng dấu `/` và đường dẫn tương đối; không dùng đường dẫn ổ đĩa Windows. Để `''` hoặc `[]` khi chưa có ảnh.

### Thời gian slideshow

- Chu kỳ tự chuyển: số mili giây trong `setInterval` ở `gallery.js`, hiện `3000`.
- Thời lượng hiệu ứng: `transition: transform .45s ...` ở `.gallery-track` trong CSS.

## 12. Chạy và kiểm tra

Chạy tại thư mục repository:

```powershell
python -m http.server 5173 --bind 127.0.0.1
```

Mở `http://127.0.0.1:5173`. Có thể dùng Live Server. Dùng HTTP/HTTPS thay vì mở file HTML trực tiếp để module và dịch vụ form hoạt động đúng.

Các kiểm tra đã thực hiện trong quá trình phát triển:

- Cú pháp JavaScript của các module.
- Cấu trúc HTML, ID, liên kết nội bộ và liên kết điều khiển.
- Dữ liệu dự án, tìm kiếm không dấu, công nghệ, kết hợp bộ lọc và trạng thái rỗng.
- DOM mô phỏng cho slideshow: chuyển vòng, chấm, timer, hover, kéo/vuốt, hủy kéo và ảnh lỗi.
- DOM mô phỏng cho thanh trượt: cuộn độc lập và trạng thái nút đầu/cuối.
- Mô phỏng phản hồi form thành công/thất bại: reset khi thành công, giữ nội dung khi lỗi.
- Tồn tại và chữ hoa/thường của đường dẫn ảnh cấu hình.
- `git diff --check` trước các lần commit.

**Giới hạn xác minh:** chưa có kiểm thử trình duyệt toàn diện trên phiên bản cuối, chưa đo Lighthouse; kiểm thử form mô phỏng không thay thế việc kiểm tra nhận email thực tế.

## 13. Đồng bộ GitHub

Code, ảnh và tài liệu đã được push lên nhánh `main` của `FireHaru/Portpolio`. Commit code mới nhất khi viết báo cáo là `a0c8022` (căn mũi tên sắp xếp); trước đó `8f1c56e` cập nhật ảnh và đường dẫn.

File báo cáo được viết lại sau các commit trên; cần commit/push riêng nếu muốn bản báo cáo cập nhật xuất hiện trên GitHub.
