# Phát hành

Tài liệu này mô tả quá trình phát hành các phiên bản mới của Electron.

## Biên dịch các ghi chú của việc phát hành phiên bản

The current process is to maintain a local file, keeping track of notable changes as pull requests are merged. For examples of how to format the notes, see previous releases on [the releases page](https://github.com/electron/electron/releases).

## Tạo ra một nhánh tạm thời

Tạo ra một chi nhánh mới từ `master` đặt tên là `release`.

```sh
git checkout master
git pull
git checkout -b release
```

This branch is created as a precaution to prevent any merged PRs from sneaking into a release between the time the temporary release branch is created and the CI builds are complete.

## Bump the version

Chạy đoạn mã `bump-version`, truyền vào các tham số `major`, `minor`, or `patch`:

```sh
npm run bump-version -- patch
git push origin HEAD
```

This will bump the version number in several files. See [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) for an example.

Hầu hết các bản phát hành sẽ phát hành ở cấp `patch`. Nâng cấp để Chrome hoặc các thay đổi lớn sẽ phát hành ở cấp `minor`. Để biết thêm chi tiết, hãy xem [Electron-phiên bản](/docs/tutorial/electron-versioning.md).

## Chỉnh sửa dự thảo phát hành phiên bản

1. Ghé thăm [trang của các bản phát hành](https://github.com/electron/electron/releases) và bạn sẽ thấy một dự thảo phát hành mới với một giữ chỗ cho các ghi chú phát hành.
2. Chỉnh sửa bản phát hành và thêm ghi chú phát hành.
3. Nhấn vào 'Save draft'. **Lòng không nhấn vào 'Publish'!**
4. Chờ đợi cho tất cả các bản xây dựng thành công. :hourglass_flowing_sand:

## Gộp nhánh tạm thời

Hợp nhất nhánh tạm thời vào master, mà không tạo ra một việc gộp các commit:

```sh
git merge release master --no-commit
git push origin master
```

Nếu điều này không thành công, rebase với master và xây dựng lại:

```sh
git pull
git checkout release
git rebase master
git push origin HEAD
```

## Chạy xây dựng trình gỡ lỗi tại máy của bạn

Chạy xây dựng debug tại máy của bạn để xác minh rằng bạn thực sự đang xây dựng phiên bản mà bạn muốn. Đôi khi bạn nghĩ rằng bạn đã làm một bản phát hành cho một phiên bản mới, nhưng bạn thực sự không.

```sh
npm run build
npm start
```

Kiểm tra xem cửa sổ hiển thị có đang hiển thị phiên bản cập nhật hiện tại.

## Cài đặt biến môi trường

Bạn sẽ cần phải thiết lập các biến môi trường sau đây để xuất bản một bản phát hành. Yêu cầu là một thành viên trong nhóm đẻ có các thông tin đăng nhập.

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - Một access token cá nhân với phạm vi của "repo".

Bạn chỉ cần làm điều này một lần.

## Công bố việc phát hành

This script will download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules.

```sh
npm run release
```

Note: Many distributions of Python still ship with old HTTPS certificates. You may see a `InsecureRequestWarning`, but it can be disregarded.

## Xóa nhánh tạm thời

```sh
git checkout master
git branch -D release # delete local branch
git push origin :release # delete remote branch
```