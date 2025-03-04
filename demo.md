## Hệ thống bao gồm
    1. Projects
        +  mỗi project sẽ có nhiều datasets
        +  một list các model versions  (là version của model phục vụ cho project và được train/eval trên dữ liệu của project đó, e.g. v0.0.1, v2.3.4,etc).
        + mỗi dataset có thể được đánh tags bất kì, e.g. train, test, valid, 2024, 2025, etc.
        +
   <!-- Dữ liệu của mỗi project sẽ được đổ về raw data collection, trước khi được trích xuất, xử lý, label, review và đẩy lên một dataset -->

## roles user:
    1. owner // admin == owner: được truy cập all project
       - được quyền lock hoặc unlock các datasets ở trong project đó
       - Một dataset bị locked thì sẽ không được thực hiện bất cứ thao tác gì trên dataset đó.

    2. developer // limit
    3. viewer // limit


Required:
- Khởi tạo 1 dự án frontend (Tùy chọn công nghệ, framework )
- Mock API theo yêu cầu
- Tạo user mặc định và gắn sẵn role theo yêu cầu
- Có chức năng tìm kiếm, lọc theo điều kiện
- Responsive (optional)
