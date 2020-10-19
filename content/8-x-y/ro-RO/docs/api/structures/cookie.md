# Obiect Cookie

* `name` String - Numele cookie-ului.
* `value` String - Valoarea cookie-ului.
* `domain` String (optional) - Domeniul cookie-ului; acest lucru va fi normalizat cu un punct precedent, astfel încât să fie valabil și pentru subdomenii.
* `hostOnly` Boolean (optional) - Dacă cookie-ul este un cookie doar pentru gazdă; acest lucru va fi `` adevărat numai în cazul în care nu a fost trecut nici un domeniu.
* `path` String (optional) - Destinația cookie-ului.
* `secure` Boolean (optional) - Dacă cookie-ul este marcat ca fiind sigur.
* `httpOnly` Boolean (optional) - Dacă cookie-ul este marcat doar ca HTTP.
* `session` Boolean (optional) - Dacă cookie-ul este o sesiune sau un cookie persistent cu o dată de expirare.
* `expirationDate` Double (optional) - Data de expirare a cookie-ului ca numarul de secunde de la epoca UNIX. Nu sunt furnizate pentru cookie-urile de sesiune. Nu este prevăzut pentru cookie-uri de sesiune.
