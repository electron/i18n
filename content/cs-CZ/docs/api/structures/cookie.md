# Cookie Object

* `name` String - שם העוגייה.
* `value` String - הערך של העוגייה.
* `domain` String (optional) - הדומיין של העוגייה.
* `hostOnly` Boolean (optional) - האם העוגייה היא עוגייה מארחת בלבד.
* `path` String (optional) - הכתובת של העוגייה.
* `secure` Boolean (optional) - האם העוגייה סומנה כמאובטחת.
* `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
* `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
* `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.