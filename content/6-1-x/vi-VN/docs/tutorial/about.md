# Về Electron

[Electron](https://electronjs.org) là một thư viện mã nguồn mở được phát triển bởi Github dành cho việc xây dựng các ứng dụng desktop với HTML, CSS và Javascript. Electron hoàn thành điều này bằng cách kết hợp [Chromium](https://www.chromium.org/Home) và [Node.js](https://nodejs.org) vào nhau để có thể chạy cùng một lúc. Ứng dụng có thể được đóng gói cho cả Mac, Windows và Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Đọc thêm để tìm hiểu thêm về những người đóng góp và các phiên bản của Electron hoặc bắt đầu xây dựng ứng dụng bằng Electron trong [Hướng dẫn bắt đầu nhanh chóng](quick-start.md).

## Đội ngũ cốt lõi và những người đóng góp

Electron được duy trì bởi một nhóm tại GitHub và một nhóm [hoạt động đóng góp](https://github.com/electron/electron/graphs/contributors) từ cộng đồng. Một số những người đóng góp cá nhân và một số làm việc tại các công ty lớn họ là nhưng người phát triển nên Electron. Chúng tôi rất vui mừng để thêm những người đóng góp thường xuyên vào các dự án vào vị trí những người bảo trì. Đọc thêm về [đóng góp cho Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Các phiên bản phát hành

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Cập nhật các tài nguyên đi kèm

Các version của Chromium trong Electron sẽ được cập nhật bằng với phiên bản của Chromium trên phiên bản ổn định và mới nhất sau khi nó được phát hành khoảng một đến hai tuần.

Khi một phiên bản mới của Node.js được phát hành, Electron thường chờ đợi khoảng một tháng trước khi nâng cấp phiên bản Node.js trong Electron bằng với phiên bản đó để mang lại trong một phiên bản Electron ổn định hơn.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Phiên bản

Đối với phiên bản Electron 2.0 [theo `semver`](https://semver.org). Cho hầu hết các ứng dụng, với bất kỳ phiên bản gần đây của npm, chạy `$ npm install electron` là đúng.

Bản cập nhật của quá trình nâng cấp phiên bản được viết chi tiết tại [Versioning Doc](electron-versioning.md).

### LTS

LTS viết tắt cho Long Term Support. Nghĩa là một phiên bản được hỗ trợ dài hạn. Nhưng hiện tại, LTS của các phiên bản cũ của Electron chưa tồn tại. Nếu phiên bản hiện tại của Electron làm việc hiệu quả với bạn, bạn có thể dừng lại tại đó và không cần cập nhật nữa bao lâu tùy thích. Nếu bạn muốn sử dụng các tính năng mới như những người khác bạn nên nâng cấp lên phiên bản mới hơn.

Một bản cập nhật lớn đã đi kèm với phiên bản `v1.0.0`. Nếu bạn chưa sử dụng phiên bản này, bạn nên [đọc thêm về các thay đổi trong phiên bản `v1.0.0` ](https://electronjs.org/blog/electron-1-0).

## Triết lý cốt lõi

Để giữ cho Electron luôn luôn có kích thước nhỏ gọn và bền vững (độ lớn của các package đi kèm và các API), Electron luôn có các giới hạn cho phạm vi của dự án chính.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Điều này khiến nó dễ dàng nâng cấp các phiên bản Chromium hơn nhưng cũng có nghĩa là một số tính năng được tìm thấy trên trình duyệt Google Chrome sẽ không tồn tại trong Electron.

Các tính năng mới được thêm vào Electron chủ yếu là các native API. Nếu một tính năng mới đã là một phần của một module Node.js nào đó. Thì giữ nguyên nó là module đó. Bạn có thể thêm nó vào dự án của bạn bằng cách thêm module đó từ npm chứ không được thêm sẳn vào Electron. Xem thêm tại [Công cụ Electron được xây dựng bởi cộng đồng](https://electronjs.org/community).

## Lịch sử

Dưới đây là các dấu mốc trong lịch sử của Electron.

| :calendar:         | :tada:                                                                                                           |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Tháng tư 2013**  | [Atom Shell được bắt đầu](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Tháng năm 2014** | [Atom Shell công khai mã nguồn mở](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                |
| **Tháng tư 2015**  | [Atom Shell được đặt tên lại thành Electron](https://github.com/electron/electron/pull/1389).                    |
| **Tháng năm 2016** | [Electron phát hành phiên bản `v1.0.0`](https://electronjs.org/blog/electron-1-0).                               |
| **Tháng năm 2016** | [Các ứng dụng Electron đã có thể tương thích với Mac App Store](mac-app-store-submission-guide.md).              |
| **Tháng tám 2016** | [Windows Store đã hỗ trợ các ứng dụng Electron](windows-store-guide.md).                                         |
