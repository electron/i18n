# Cookie Object การเชื่อมต่อ คุกกี้

* `name` String - ชื่อของคุกกี้.
* `value` String - ค่าของคุกกี้.
* `domain` String (optional) - โดเมนของคุกกี้ สิ่งนี้จะถูกทำให้เป็นมาตรฐานด้วยจุดก่อนหน้าเพื่อให้สามารถใช้กับโดเมนย่อยได้เช่นกัน.
* `hostOnly` Boolean (optional) - คุกกี้นั้นเป็นคุกกี้แบบโฮสต์เท่านั้นหรือไม่ สิ่งนี้จะเป็น ` จริง ` หากไม่มีการส่งโดเมน.
* `path` String (optional) - เส้นทางของคุกกี้.
* `secure` Boolean (optional) - ระบุว่าคุกกี้ถูกทำเครื่องหมายว่าปลอดภัยหรือไม่.
* `httpOnly` Boolean (optional) - ระบุว่าคุกกี้นั้นจะทำเครื่องหมายเป็น HTTP เท่านั้นหรือไม่.
* `session` Boolean (optional) - คุกกี้นั้นเป็นคุกกี้เซสชันหรือไม่ คุกกี้ที่มีวันหมดอายุ.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.
