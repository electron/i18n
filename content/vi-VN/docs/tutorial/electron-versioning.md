# Phiên bản Electron

Nếu bạn đã sử dụng Node và npm một thời gian, bạn có thể sẽ biết [Semantic Versioning](http://semver.org) (SemVer). It's a convention for specifying version numbers for software that helps communicate intentions to the users of your software.

## Tổng qua về Semantic Versioning

Thông số phiên bản luôn được tạo thành từ cặp ba số:

    major.minor.patch
    

Các số trong cặp ba số trên được tạo ra dựa trên các quy tắc:

* **Major** là các thay đổi sẽ phá vỡ khả năng tương thích ngược.
* **Minor** là các thay đổi cập nhật các tính năng mới nhưng không phá vỡ tính năng tương thích ngược.
* **Patch** là các thay đổi cho việc sửa các lỗi hoặc các thay đổi nhỏ khác.

Cách ghi nhớ đơn giản cho cấu trúc này như sau:

    breaking.feature.fix
    

## Phiên bản Electron

Do sự phụ thuộc vào Node và Chromium, khiến cho Electron không thể nào tuân theo hoàn toàn các chính sách về phiên bản - SemVer. **You should therefore always reference a specific version of Electron.**

Các số trong cặp ba số trên phiên bản của Electron được tạo ra dựa trên các quy tắc:

* **Major** is for breaking changes in Electron's API. If you upgrade from `0.37.0` to `1.0.0`, you will have to make changes to your app.
* **Minor** is for major Chrome and minor Node upgrades, or significant Electron changes. If you upgrade from `1.5.0` to `1.6.0`, your app is supposed to still work, but you might have to work around small changes.
* **Patch** is for new features and bug fixes. If you upgrade from `1.6.2` to `1.6.3`, your app will continue to work as-is.

Chúng tôi đề nghị bạn thiết lập một phiên bản cố định khi cài đặt Electron từ npm:

```sh
npm install electron --save-exact --save-dev
```

The `--save-exact` flag will add `electron` to your `package.json` file without using a `^` or `~`, e.g. `1.6.2` instead of `^1.6.2`. This practice ensures that all upgrades of Electron are a manual operation made by you, the developer.

Alternatively, you can use the `~` prefix in your SemVer range, like `~1.6.2`. This will lock your major and minor version, but allow new patch versions to be installed.