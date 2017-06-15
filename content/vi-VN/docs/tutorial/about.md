# Về Electron

[Electron](https://electron.atom.io) là một thư viện mã nguồn mở được phát triển bởi Github dành cho việc xây dựng các ứng dụng desktop với HTML, CSS và Javascript. Electron hoàn thành điều này bằng cách kết hợp [Chromium](https://www.chromium.org/Home) và [Node.js](https://nodejs.org) vào nhau để có thể chạy cùng một lúc. Ứng dụng có thể được đóng gói cho cả Mac, Windows và Linux.

Electron đầu tiên xuất hiện vào năm 2013 như một framework của trình soạn thảo [Atom](https://atom.io) của GitHub. Lần thứ hai mở mã nguồn và mùa xuân năm 2014.

Nó đã trở thành một công cụ phổ biến được sử dụng bởi các nhà phát triển mã nguồn mở, các startup và các công ty. [Xem ai đang xây dựng ứng dụng của họ bằng Electron](https://electron.atom.io/apps/).

Đọc thêm để tìm hiểu thêm về những người đóng góp và các phiên bản của Electron hoặc bắt đầu xây dựng ứng dụng bằng Electron trong [Hướng dẫn bắt đầu nhanh chóng](quick-start.md).

## Đội ngũ cốt lõi và những người đóng góp

Electron được duy trì bởi một nhóm tại GitHub và một nhóm [hoạt động đóng góp](https://github.com/electron/electron/graphs/contributors) từ cộng đồng. Một số những người đóng góp cá nhân và một số làm việc tại các công ty lớn họ là nhưng người phát triển nên Electron. Chúng tôi rất vui mừng để thêm những người đóng góp thường xuyên vào các dự án vào vị trí những người bảo trì. Đọc thêm về [đóng góp cho Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Các phiên bản phát hành

[Electron phát hành các phiên bản](https://github.com/electron/electron/releases) thường xuyên. Chúng tôi phát hành khi có lỗi quan trọng, API hoặc được cập nhật phiên bản mới từ Chrome hoặc Node.js.

### Cập nhật các package đi kèm

Các version của Chromium trong Electron sẽ được cập nhật bằng với phiên bản của Chromium trên phiên bản ổn định và mới nhất sau khi nó được phát hành khoảng một đến hai tuần.

Khi một phiên bản mới của Node.js được phát hành, Electron thường chờ đợi khoảng một tháng trước khi nâng cấp để mang lại trong một phiên bản ổn định hơn.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Phiên bản

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Triết lý cốt lõi

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## Lịch sử

Dưới đây là các dấu mốc trong lịch sử của Electron.

| :calendar:         | :tada:                                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Tháng tư 2013**  | [Atom Shell được bắt đầu](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).                        |
| **Tháng năm 2014** | [Atom Shell công khai mã nguồn mở](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                                        |
| **Tháng tư 2015**  | [Atom Shell được đặt tên lại thành Electron](https://github.com/electron/electron/pull/1389).                                           |
| **Tháng năm 2016** | [Electron phát hành phiên bản `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                         |
| **Tháng năm 2016** | [Các ứng dụng Electron đã có thể tương thích với Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **Tháng tám 2016** | [Windows Store đã hỗ trợ các ứng dụng Electron](https://electron.atom.io/docs/tutorial/windows-store-guide).                            |