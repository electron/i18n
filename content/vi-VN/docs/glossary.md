# Bảng thuật ngữ

Trang này định nghĩa một số thuật ngữ thường được sử dụng trong Electron.

### ASAR

ASAR là viết tắt của Atom Shell Archive Format. Một tập tin [asar](https://github.com/electron/asar) đơn giản như một tập tin `tar`, nó là một định dạng nối các file lại với nhau thành một file duy nhất. Electron có thể đọc bất kể tập tin nào trong file có định dạng này mà không cần giải nén toàn bộ tập tin.

Định dạng ASAR được tạo ra chủ yếu để cải thiện hiệu suất trên Windows... TODO

### Brightray

[Brightray](https://github.com/electron/brightray) is a static library that makes [libchromiumcontent](#libchromiumcontent) easier to use in applications. It was created specifically for Electron, but can be used to enable Chromium's renderer in native apps that are not based on Electron.

Brightray is a low-level dependency of Electron that does not concern the majority of Electron users.

### DMG

Apple Disk Image là một định dạng đóng gói được sử dụng bởi macOS. Tập tin DMG thường được sử dụng để phân phối ứng dụng "installers". [electron-builder](https://github.com/electron-userland/electron-builder) hỗ trợ `dmg` như một build target.

### IPC

IPC là viết tắt cho Inter-Process Communication. Electron sử dụng IPC để gửi các file tin nhắn JSON tuần tự giữa các [main process](#main-process) và [renderer process](#renderer-process).

### libchromiumcontent

A single, shared library that includes the Chromium Content module and all its dependencies (e.g., Blink, [V8](#v8), etc.).

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

Xem thêm: [process](#process), [renderer process](#renderer-process)

### MAS

Viết tắt của Apple's Mac App Store Để biết thêm chi tiết về cách gửi ứng dụng của bạn tới MAS, xem tại: [Mac App Store Submission Guide](tutorials/mac-app-store-submission-guide.md).

### các module native

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

Xem thêm [Cách sử dụng các Module của Node](tutorial/using-native-node-modules.md).

## NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### process

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

Xem thêm: [process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

Xem thêm: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 là một JavaScript engine mã nguồn mở của Google. Nó được viết bằng C++ và được sử dụng trong Google Chrome. V8 có thể chạy độc lập hoặc có thể được nhúng vào bất ký ứng dụng C++ nào.

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.