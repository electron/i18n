# Ang Cookie na bagay

* `name` na String - Ang pangalan ng mga cookie.
* `value` na String - Ang halaga ng mga cookie.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `path` na String (opsyonal) - Ang path ng mga cookie.
* `secure` Boolean (opsyonal) - Depende kung ang cookie ay markado na ligtas.
* `httpOnly` Boolean (opsyonal) - Depende kung ang cookie ay markado na HTTP lamang.
* `session` Boolean (opsyonal) - Depende kung ang cookie ay isang sesyon na cookie o isang matatag na cookie na may petsa ng ekspirasyon.
* `expirationDate` Double (opsyonal) - Ang petsa ng ekspirasyon ng mga cookie ay mga ilang segundo dahil sa UNIX epoch. Ay hindi inilaan para sa sesyon ng mga cookie.