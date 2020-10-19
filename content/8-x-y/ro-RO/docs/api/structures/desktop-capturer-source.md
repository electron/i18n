# Obiectul DesktopCapturerSource

* `id` String - Identificatorul unei ferestre sau al unui ecran care poate fi utilizat ca `` de la apelarea [`navigator.webkitGetUserMedia`]. Formatul identificatorului va fi `window:XX` sau `screen:XX`, unde `XX` este un număr generat aleatoriu.
* `name` String - O sursă a ecranului va fi numită `Întregul Ecran` sau `Ecran <index>`, în timp ce numele sursei ferestrei se va potrivi cu titlul.
* `thumbnail` [NativeImage](../native-image.md) - O imagine în miniatură. **Notă:** Nu există nici o garanție că dimensiunea miniaturii este aceeași cu miniatura `Size` specificată în `opțiunile` de trecut la `desktopCapturer.getSources`. Dimensiunea reală depinde de scara ecranului sau a ferestrei.
* `display_id` String - Un identificator unic care va corespunde cu `id-ul` al potrivirii [Display](display.md) returnat de [Screen API](../screen.md). Pe unele platforme, acest lucru este echivalent cu `XX` porțiune din câmpul `id` de mai sus, iar pe alte părți va fi diferit. Va fi un șir gol dacă nu este disponibil.
* `appIcon` [NativeImage](../native-image.md) - O imagine pictogramă a aplicației care deține fereastra sau null dacă sursa are un ecran de tip. Dimensiunea pictogramei nu este cunoscută în avans și depinde de ceea ce furnizează aplicația.
