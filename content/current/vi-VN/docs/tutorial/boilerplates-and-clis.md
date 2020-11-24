# Boilerplates và CLIs

Sự phát triển của Electron thực sự có rất nhiều cách và nhiều lựa chọn - chưa có cách nào được gọi là "một hướng đi chuẩn" khi phát triển, xây dựng, đóng gói, hay phát hành một ứng dụng Electron. Các tính năng phụ trợ cho Electron, cho cả việc xây dựng và chạy (build- and run-time), có thể tìm thấy trên [npm](https://www.npmjs.com/search?q=electron), trong các gói cài đặt riêng lẻ, từ đó cho phép nhà phát triển xây dựng ứng dụng và những đường dẫn lối (pipeline) mà họ cần.

Mức độ của mô đun và khả năng mở rộng nó đảm bảo tất cả nhà phát triển có thể làm việc với Electron, từ những nhóm lớn đến nhóm nhỏ, và không bị cấm đoán về những gì họ có thể hoặc không thể làm trong vòng đời phát triển ứng dụng của mình, bất cứ lúc nào. Tuy vậy, với nhiều lập trình viên, một trong các công cụ về bảng mẫu hay các dòng lệnh do cộng đồng tạo ra có thể khiến việc biên dịch, đóng gói và phát hành ứng dụng trở nên cực kì dễ dàng hơn.

## Boilerplates và CLIs

Một bảng mẫu chỉ là một điểm bắt đầu - có thể nói là một bức tranh - mà từ đó bạn xây dựng ứng dụng của mình. Chúng thường được để trong dạng của một kho lưu trữ (a repository) mà bạn có thể nhân bản chúng và tùy chỉnh lại nội dung bằng cả trái tim của mình.

Ở mặt khác, một công cụ dòng lệch sẽ tiếp tục hỗ trợ dự án của bạn trong suốt quá trình xây dựng, phát triển và phát hành. Chúng rất hữu ích và có tính hỗ trợ cao nhưng lại ép bạn phải theo cách cấu trúc và xây dựng dòng code theo hướng dẫn đã đưa ra. *Especially for beginners, using a command line tool is likely to be helpful*.

## electron-forge

Đây là một "công cụ hoàn chỉnh cho việc xây dựng các ứng dụng Electron hiện đại". Electron Forge thống nhất các công cụ xây dựng sẵn có (và được duy trì tốt) cho việc phát triển Electron, vào một gói thống nhất để ai cũng có thể dễ dàng đi thẳng vào việc phát triển của Electron.

Forge đi kèm với [một mẫu sản phẩm có sẵn](https://electronforge.io/templates) bằng cách dùng Webpack như một trình gói. It includes an example typescript configuration and provides two configuration files to enable easy customization. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron/electron-packager)) – changes made by Electron maintainers (like Slack) benefit Forge's users, too.

You can find more information and documentation on [electronforge.io](https://electronforge.io/).

## electron-builder

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

## Các công cụ khác và Boilerplates

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.
