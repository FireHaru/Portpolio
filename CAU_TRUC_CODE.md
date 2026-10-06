# Cấu trúc thành phần dùng chung

## Các file

- `app.js`: theme, menu, dự án, form liên hệ và khởi tạo các thành phần.
- `slider.js`: hàm `initCardSliders()` tự tìm mọi `.card-slider`, xử lý nút, bàn phím, resize và thay đổi danh sách.
- `gallery.js`: slideshow ảnh trong từng khung.
- `data.js`: dữ liệu dự án.
- `photos.js`: đường dẫn ảnh.
- `styles.css`: giao diện và các class chung dưới đây.

## Thanh trượt `.card-slider`

Không cần thêm lệnh gọi JavaScript cho từng mục. ID danh sách phải duy nhất và khớp `aria-controls` của hai nút.

```html
<div class="slider-navigation" aria-label="Điều khiển danh sách">
  <button class="arrow-button arrow-prev slider-arrow"
          data-slider-direction="-1" type="button"
          aria-label="Xem trước" aria-controls="example-list"></button>
  <button class="arrow-button arrow-next slider-arrow"
          data-slider-direction="1" type="button"
          aria-label="Xem tiếp" aria-controls="example-list"></button>
</div>
<div class="card-slider" id="example-list" tabindex="0"
     role="region" aria-label="Danh sách ví dụ"
     style="--slider-columns: 2; --slider-gap: 22px">
  <article class="surface-card">Nội dung thẻ</article>
</div>
```

| Biến CSS | Ý nghĩa | Mặc định |
| --- | --- | --- |
| `--slider-columns` | Số cột trên desktop | 3 |
| `--slider-gap` | Khoảng cách giữa thẻ | 18px |
| `--slider-rows` | Số hàng | 1 |
| `--slider-mobile-width` | Chiều rộng một thẻ trên điện thoại | 88% |

Tablet hiển thị hai cột. Điện thoại dùng chiều rộng `--slider-mobile-width`. Dự án dùng hai hàng và chiều rộng thẻ di động 100%.

Thêm `data-hide-if-fit` vào `.slider-navigation` nếu muốn ẩn nhóm nút khi không có nội dung tràn. Nếu không thêm, các nút vẫn hiện nhưng bị vô hiệu hóa tại đầu/cuối.

## Thẻ `.surface-card`

Gom nền, viền và bo góc. Kết hợp với class loại thẻ để giữ bố cục riêng:

```html
<article class="activity-card surface-card">...</article>
<article class="skill-card surface-card">...</article>
```

Thẻ dự án được tạo trong `app.js` với `card surface-card`. Form dùng `surface-card` tương tự. Khi thêm thẻ hoạt động hoặc thành tích, nhớ giữ class này.

## Mũi tên `.arrow-button`

- `.arrow-button`: kích thước, hình tròn và căn giữa nét mũi tên.
- `.arrow-prev` / `.arrow-next`: hướng mũi tên.
- `.slider-arrow`: màu/viền của nút cuộn danh sách.
- `.gallery-arrow`: biến thể trong suốt của slideshow ảnh.
- `--arrow-size`: kích thước nút; mặc định 32px, slideshow 28px.

Các tên như `skill-grid`, `activity-grid`, `achievement-grid`, `projects` vẫn giữ làm nhãn nhận diện nội dung. Bố cục thanh trượt được khai báo duy nhất trong `.card-slider`.
