# רכיב התצוגה (Display)

* `id`‏ Number - מזהה ייחודי שמזוהה עם התצוגה.
* `rotation`‏ Number - יכול להיות 0, 90, 180, 270, מציין הטיית המסך עם כיוון השעון.
* `scaleFactor`‏ Number - פלט של מקדם יחס הפיקסלים של ההתקן.
* `touchSupport` ‏String - ערכים אפשריים: `available`,‏ `unavailable`,‏ `unknown`.
* `bounds` ‏[Rectangle (מרובע)](rectangle.md)
* `size` ‏[Size (גודל)](size.md)
* `workArea`‏ [Rectangle (מרובע)](rectangle.md)
* `workAreaSize`‏ [Size (גודל)](size.md)

הרכיב `Display` מייצג צג פיזי שמחובר למערכת. יכול להיות שיהיה `Display` מזויף במערכת ללא תצוגה, או `Display` שמקושר לתצוגה מרוחקת, מדומה.