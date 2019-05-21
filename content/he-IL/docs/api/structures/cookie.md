# רכיב עוגייה (Cookie)

* `name` ‏String - שם העוגייה.
* `value` ‏String - הערך של העוגייה.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` ‏String (רשות) - הכתובת של העוגייה.
* `secure` ‏Boolean (רשות) - האם העוגייה סומנה כמאובטחת.
* `httpOnly` ‏Boolean (רשות) - האם העוגייה סומנה כ־HTTP בלבד.
* `session` ‏Boolean (רשות) - האם העוגייה היא עוגייה זמנית או עוגייה עם תאריך תפוגה.
* `expirationDate` ‏Double (רשות) - תאריך התפוגה של העוגייה כמספר השניות מאז תחילת ספירת UNIX. לא מסופק ברמת הפעלה בודדת.