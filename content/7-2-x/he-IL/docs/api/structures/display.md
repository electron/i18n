# רכיב התצוגה (Display)

* `id`‏ Number - מזהה ייחודי שמזוהה עם התצוגה.
* `rotation`‏ Number - יכול להיות 0, 90, 180, 270, מציין הטיית המסך עם כיוון השעון.
* `scaleFactor`‏ Number - פלט של מקדם יחס הפיקסלים של ההתקן.
* `touchSupport` ‏String - ערכים אפשריים: `available`,‏ `unavailable`,‏ `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` ‏[Rectangle (מרובע)](rectangle.md)
* `size` ‏[Size (גודל)](size.md)
* `workArea`‏ [Rectangle (מרובע)](rectangle.md)
* `workAreaSize`‏ [Size (גודל)](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

הרכיב `Display` מייצג צג פיזי שמחובר למערכת. יכול להיות שיהיה `Display` מזויף במערכת ללא תצוגה, או `Display` שמקושר לתצוגה מרוחקת, מדומה.
