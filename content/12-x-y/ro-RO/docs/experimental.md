# API experimentale

Unele API-uri Electrons sunt etichetate cu `_Experimental_` în documentație. Această etichetă indică faptul că API-ul nu poate fi considerat stabil, iar API poate fi eliminat sau modificat mai frecvent decât alte API-uri cu mai puțin avertisment.

## Condiții pentru ca un API să fie etichetat ca experimental

Oricine poate solicita un API să fie etichetat ca experimental într-o caracteristică PR, dezacordurile privind natura experimentală a unei caracteristici pot fi discutate în API WG dacă nu pot fi rezolvate în PR.

## Proces pentru eliminarea etichetei experimentale

Odată ce un API a fost stabil și în cel puțin două linii majore de lansare stabile poate fi nominalizat pentru a avea eticheta sa experimentală eliminată.  Această discuție ar trebui să aibă loc la o ședință API WG.  Lucruri de luat în considerare la discutarea/nominalizarea:

* Condiţia de mai sus "două linii majore de lansare" trebuie să fi fost îndeplinită
* În acest timp, adoptarea acestei caracteristici nu ar fi trebuit să cauzeze probleme majore sau probleme
* API este suficient de stabil și nu a fost influențat puternic de upgrade-urile Chromium
* Utilizează cineva API?
* Este API care îndeplinește dezordinele propuse inițial, are lacune?
