# אובייקט RemovePassword

* `type` String - `password`.
* `origin` String (אופציונאלי) - כאשר מסופק, מידע האימות המקושר למקור יוסר בלבד אחרת כל המטמון יינוקה.
* `scheme` String (אופציונאלי) - סכמת האימות. יכול להיות `basic`, `digest`, `ntlm`, `negotiate`. חייב להיות מסופק אם מסיר לפי `origin`.
* `realm` String (אופציונאלי) - תחום האימות. חייב להיות מסופק אם מסיר לפי `origin`.
* `username` String (אופציונאלי) - אישורי האימות. חייב להיות מסופק אם מסיר לפי `origin`.
* `password` String (אופציונאלי) - אישורי האימות. חייב להיות מסופק אם מסיר לפי `origin`.