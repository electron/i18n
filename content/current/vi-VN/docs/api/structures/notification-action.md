# NotificationAction Object

* `type` String - Loại hành động, có thể là `button`.
* `text` String (optional) - Nhãn cho hành động cụ thể.

## Nền tảng / Action hỗ trợ

| Loại hoạt động | Nền tảng hỗ trợ | Cách sử dụng của `text`          | Mặc định `text`                                                                             | Hạn chế                                                                                                                                                                                                                                                                                                |
| -------------- | --------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `button`       | macOS           | Được sử dụng như nhãn cho button | "Show" (or a localized string by system default if first of such `button`, otherwise empty) | Chỉ cái đầu tiên được sử dụng. Nếu nhiều cái được cung cấp, những cái ngoại trừ cái đầu tiên sẽ được liệt kê dưới dạng hành động bổ sung (Được hiển thị khi chuột hoạt động trên button). Bất kỳ hành động nào như vậy cũng không tương thích với `hasReply` và sẽ bị bỏ qua nếu `hasReply` là `true`. |

### Nút hỗ trợ trên macOS

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* App is signed
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

Nếu một trong những yêu cầu này không được đáp ứng, nút sẽ không xuất hiện.
