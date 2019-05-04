# Cookie Object การเชื่อมต่อ คุกกี้

* `name` String - ชื่อของคุกกี้.
* `value` String - ค่าของคุกกี้.
* `domain` String (optional) - โดเมนของคุกกี้ สิ่งนี้จะถูกทำให้เป็นมาตรฐานด้วยจุดก่อนหน้าเพื่อให้สามารถใช้กับโดเมนย่อยได้เช่นกัน.
* `hostOnly` Boolean (optional) - คุกกี้นั้นเป็นคุกกี้แบบโฮสต์เท่านั้นหรือไม่ สิ่งนี้จะเป็น ` จริง ` หากไม่มีการส่งโดเมน.
* `path` String (optional) - เส้นทางของคุกกี้.
* `secure` Boolean (optional) - Whether the cookie is marked as secure.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.