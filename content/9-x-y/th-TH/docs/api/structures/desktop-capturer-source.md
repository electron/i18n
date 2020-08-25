# DesktopCapturerSource Object เชื่อมต่อ DesktopCapturer

* `id` String - ตัวระบุของหน้าต่างหรือหน้าจอที่สามารถใช้เป็น `chromeMediaSourceId` ข้อ จำกัด เมื่อมี calling [`navigator.webkitGetUserMedia`]. รูปแบบของตัวระบุจะเป็น `window:XX` or `screen:XX`, where `XX` เป็นตัวเลขที่สร้างแบบสุ่ม
* `name` String - แหล่งที่มาของหน้าจอจะมีชื่อว่า `Entire Screen` หรือ `Screen <index>`, ในขณะที่ชื่อของแหล่งที่มาของหน้าต่างจะตรงกับหน้าต่าง หัวข้อ.
* `thumbnail` [NativeImage](../native-image.md) - ภาพขนาดย่อ **Note:** ไม่มีการรับประกันว่าขนาดของรูปขนาดย่อเหมือนกับขนาดของรูปขนาดย่อ `thumbnailSize` specified in the `options` ผ่านไปแล้ว `desktopCapturer.getSources`. ขนาดที่แท้จริงขึ้นอยู่กับขนาดของ หน้าจอหรือหน้าต่าง
* `display_id` String - ตัวระบุเฉพาะที่จะสอดคล้องกับ `id` ของ การจับคู่ [Display](display.md) ที่ส่งคืนโดย [Screen API](../screen.md). ในบางแพลตฟอร์มสิ่งนี้เทียบเท่ากับส่วน `XX` portion of the `id` ด้านบนและที่อื่น ๆ มันจะแตกต่างกัน มันจะเป็นสตริงว่างถ้าไม่ ใช้ได้
* `appIcon` [NativeImage](../native-image.md) - ภาพไอคอนของ แอปพลิเคชันที่เป็นเจ้าของหน้าต่างหรือค่า NULL หากแหล่งที่มามีประเภทหน้าจอ ขนาดของไอคอนไม่เป็นที่รู้จักล่วงหน้าและขึ้นอยู่กับสิ่งที่ แอปพลิเคชันให้
