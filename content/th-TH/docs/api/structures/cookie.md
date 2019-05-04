# การเชื่อมต่อ คุกกี้ 

* ` ชื่อ ` String - ชื่อของคุกกี้
* ` ค่า ` String - ค่าของคุกกี้
* ` โดเมน ` String (ตัวเลือก) - โดเมนของคุกกี้ สิ่งนี้จะถูกทำให้เป็นมาตรฐานด้วยจุดก่อนหน้าเพื่อให้สามารถใช้กับโดเมนย่อยได้เช่นกัน
* ` โฮสต์เท่านั้น ` Boolean (ตัวเลือก) - คุกกี้นั้นเป็นคุกกี้แบบโฮสต์เท่านั้นหรือไม่ สิ่งนี้จะเป็น ` จริง ` หากไม่มีการส่งโดเมน
* ` เส้นทาง ` String (ตัวเลือก) - เส้นทางของคุกกี้
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.