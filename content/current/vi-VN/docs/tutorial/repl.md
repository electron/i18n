# REPL

Read-Eval-Print-Loop (REPL) (Đọc, thực thi, in ra và lặp lại), là một môi trường lập trình tương tác đơn giản, sử dụng các input của người dùng (tức là các single expression), đánh giá chúng, và trả về kết quả cho người dùng.

Module `repl` cung cấp một REPL đã được xây dựng, để chạy nó bạn chỉ việc thực hiện các lệnh sau:

* Giả sử như bạn chỉ cài đặt `electron` hoặc `electron-prebuilt` tại thư mục của project rồi thì chạy lệnh sau:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Giả sử như bạn đã cài đặt `electron` hoặc `electron-prebuilt` trên global rồi:

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Lưu ý:** `electron --interactive` không thể sử dụng trên Windows.

Để tìm hiểu thêm, các thông tin về REPL có tại: [Tài liệu Node.js REPL](https://nodejs.org/dist/latest/docs/api/repl.html).
