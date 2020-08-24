# רכיב עוגייה (Cookie)

* `name` ‏String - שם העוגייה.
* `value` ‏String - הערך של העוגייה.
* `domain` String (אופציונלי) - הדומיין של העוגייה; הערך יהיה מנורמל עם נקודה מקדימה (.) כך שערכו יהיה תקין גם עבור תתי דומיין.
* `hostOnly` Boolean (אופציונלי) - אם העוגייה היא לדף של המארח שלה בלבד; הערך יהיה `אמת` אם שום דומיין לא מועבר.
* `path` ‏String (רשות) - הכתובת של העוגייה.
* `secure` ‏Boolean (רשות) - האם העוגייה סומנה כמאובטחת.
* `httpOnly` ‏Boolean (רשות) - האם העוגייה סומנה כ־HTTP בלבד.
* `session` ‏Boolean (רשות) - האם העוגייה היא עוגייה זמנית או עוגייה עם תאריך תפוגה.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
