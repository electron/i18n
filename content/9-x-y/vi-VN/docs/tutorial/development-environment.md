# Developer Environment

Phát triển Electron về cơ bản là phát triển Node.js. Để biến hệ thống của bạn trở thành một môi trường có khả năng xây dựng các ứng dụng máy tính với Electron, bạn chỉ cần cài đặt Node.js, npm, một trình soạn thảo code tuỳ ý, và kiến thức cơ bản về command line của hệ điều hành bạn dùng.

## Thiết lập trên macOS

> Electron hỗ trợ macOS 10,10 (Yosemite) và các phiên bản mới hơn. Apple không cho phép chạy macOS trong máy ảo trừ khi máy chủ là máy tính Apple, vì vậy nếu bạn thấy mình cần Mac, hãy thử dùng dịch vụ đám mây cho thuê quyền truy cập vào máy Mac (như [MacInCloud][macincloud] hoặc [xcloud](https://xcloud.me)).

Trước tiên, cài đặt phiên bản Node.js gần đây. Chúng tôi khuyên bạn nên cài đặt Phiên bản mới nhất của `LTS` hoặc `hiện tại`. Truy cập [trang tải xuống Node.js][node-download] và chọn `macOS installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Khởi động cho Windows

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10][windows-vm] for developers.

Trước tiên, cài đặt phiên bản Node.js gần đây. Chúng tôi khuyên bạn nên cài đặt Phiên bản mới nhất của `LTS` hoặc `hiện tại`. Visit [the Node.js download page][node-download] and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## Khởi động cho Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Trước tiên, cài đặt phiên bản Node.js gần đây. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux][node-package].

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# This command should print the version of Node.js
node -v

# This command should print the version of npm
npm -v
```

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom][atom] and Microsoft's [Visual Studio Code][code]. Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.

[macincloud]: https://www.macincloud.com/
[node-download]: https://nodejs.org/en/download/
[node-download]: https://nodejs.org/en/download/
[node-package]: https://nodejs.org/en/download/package-manager/
[atom]: https://atom.io/
[code]: https://code.visualstudio.com/
[windows-vm]: https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
