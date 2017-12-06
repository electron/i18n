# Về Electron

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron hoàn thành điều này bằng cách kết hợp [Chromium](https://www.chromium.org/Home) và [Node.js](https://nodejs.org) vào nhau để có thể chạy cùng một lúc. Ứng dụng có thể được đóng gói cho cả Mac, Windows và Linux.

Electron đầu tiên xuất hiện vào năm 2013 như một framework của trình soạn thảo [Atom](https://atom.io) của GitHub. Lần thứ hai mở mã nguồn và mùa xuân năm 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Đọc thêm để tìm hiểu thêm về những người đóng góp và các phiên bản của Electron hoặc bắt đầu xây dựng ứng dụng bằng Electron trong [Hướng dẫn bắt đầu nhanh chóng](quick-start.md).

## Đội ngũ cốt lõi và những người đóng góp

Electron được duy trì bởi một nhóm tại GitHub và một nhóm [hoạt động đóng góp](https://github.com/electron/electron/graphs/contributors) từ cộng đồng. Một số những người đóng góp cá nhân và một số làm việc tại các công ty lớn họ là nhưng người phát triển nên Electron. Chúng tôi rất vui mừng để thêm những người đóng góp thường xuyên vào các dự án vào vị trí những người bảo trì. Đọc thêm về [đóng góp cho Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Các phiên bản phát hành

[Electron phát hành các phiên bản](https://github.com/electron/electron/releases) thường xuyên. Chúng tôi phát hành khi có lỗi quan trọng, API hoặc được cập nhật phiên bản mới từ Chromium hoặc Node.js.

### Cập nhật các tài nguyên đi kèm

Các version của Chromium trong Electron sẽ được cập nhật bằng với phiên bản của Chromium trên phiên bản ổn định và mới nhất sau khi nó được phát hành khoảng một đến hai tuần.

Khi một phiên bản mới của Node.js được phát hành, Electron thường chờ đợi khoảng một tháng trước khi nâng cấp phiên bản Node.js trong Electron bằng với phiên bản đó để mang lại trong một phiên bản Electron ổn định hơn.

Trong Electron, Node.js và Chromium chia sẻ một engine V8 duy nhất — thường là phiên bản V8 mà Chromium đang sử dụng. *Hầu hết thời gian nó là như vậy*, nhưng đôi khi phiên bản V8 đó được lấy từ phiên bản V8 mà Node.js đang sử dụng.

### Phiên bản

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Triết lý cốt lõi

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Lịch sử

Below are milestones in Electron's history.

| :calendar:         | :tada:                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- |
| **Tháng tư 2013**  | [Atom Shell được bắt đầu](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).    |
| **Tháng năm 2014** | [Atom Shell công khai mã nguồn mở](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                    |
| **Tháng tư 2015**  | [Atom Shell được đặt tên lại thành Electron](https://github.com/electron/electron/pull/1389).                       |
| **Tháng năm 2016** | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **Tháng năm 2016** | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **Tháng tám 2016** | [Windows Store support for Electron apps](https://electronjs.org/docs/tutorial/windows-store-guide).                |