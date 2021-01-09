---
title: 'Projekt Tygodnia: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

W tym tygodniu spotkaliśmy się z [Aprile Elcich](https://twitter.com/aprileelcich) i [Paolo Fragomeni](https://twitter.com/0x00A) , aby porozmawiać o Voltra, odtwarzacz muzyki zasilany elektroniką.

---

## Co to jest Voltra?

[Voltra](https://voltra.co/) jest odtwarzaczem muzycznym dla osób, które chcą posiadać swoją muzykę. Jest to również sklep, w którym możesz odkryć i kupić nową muzykę na podstawie tego, co już posiadasz. Jest ona wolna od reklam, międzyplatformowa dla komputerów stacjonarnych i komórkowych. Nie szpieguje cię.

[![widok ultradźwiękowy](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Dla kogo jest Voltra?

Każdy, kto słucha muzyki.

## Co motywowało cię do stworzenia Voltra?

Radio zawsze miało dużą część słuchaczy. Przenosi się z fal powietrznych i do Internetu. Teraz możesz wynająć muzykę na żądanie — to jest rewizja radiowa! W związku z tym pojawiło się wiele nowych produktów i usług, ale radio strumieniowe wciąż pozostawia kogoś innego w kontroli nad Twoją muzyką i jak z nią korzystasz.

Chcieliśmy produktu, który był całkowicie skoncentrowany na muzyce, którą posiadasz. Coś, co ułatwiło odkrywanie i kupowanie nowej muzyki bezpośrednio od artystów lub etykiet.

## Czy istnieje darmowa wersja?

Odtwarzacz pulpitu jest całkowicie darmowy. [Sprzedaż twojej muzyki jest również darmowa!](https://voltra.co/artists) Nie jesteśmy obsługiwani przez reklamy.

Ponieważ aplikacja jest darmowa, możemy ją otworzyć później. W tej chwili nie mamy przepustowości, aby to zarządzać. Mamy również bardzo konkretne pomysły dotyczące cech i kierunku, w którym chcemy podążać. Mamy aktywną społeczność beta i przyjmujemy naszą opinię do serca.

## Jak zarabiasz pieniądze?

Posiadamy funkcje premium!

Nasze [archiwum Voltra Audio](https://voltra.co/premium/) jest usługą kopii zapasowej w chmurze zaprojektowaną specjalnie dla muzyki. Nie kompresujemy ani nie dzielimy się blokami danych. Twoja kolekcja muzyki jest fizycznie wykonana dla Ciebie.

Dla artystów i etykiet nasz [Członkostwo Pro](https://voltra.co/artists/pro) oferuje narzędzia, które pomogą im dotrzeć do bardziej odpowiednich odbiorców, takich jak strony analityczne i profesjonalne strony internetowe artystów.

## Co czyni Voltra odmienną?

Projektowanie i użyteczność są dla nas niezwykle ważne. Chcemy dać słuchaczom wolne od rozproszenia wrażenia słuchania! Istnieje kilka ciekawych odtwarzaczy i sklepów muzycznych. Wiele z nich jest jednak bardziej zaawansowanych i trudniejszych do wykorzystania niż ich twórcy. Chcemy udostępnić Voltra jak największej liczbie osób.

Nie robimy też cięć od artysty ani etykiety. To dla nas kluczowy rozróżniacz. Jest to naprawdę ważne, ponieważ zmniejsza to barierę dla artystów w doprowadzeniu ich muzyki do obrotu.

## Jakie są jakieś projekty & decyzji technicznych?

Podczas projektowania Voltra braliśmy pod uwagę konwencje interfejsu użytkownika z natywnych aplikacji i Internetu, również dużo zastanawialiśmy się nad tym, co możemy usunąć. Mamy aktywną prywatną grupę beta, która w ciągu ostatnich kilku miesięcy udzieliła nam krytycznej opinii.

Stwierdziliśmy, że sztuka albumu i fotografia są naprawdę ważne dla ludzi. Wiele graczy to tylko listy plików. Jedną z fajnych rzeczy o posiadaniu fizycznych albumów jest okładka albumu, i chcieliśmy położyć na to nacisk w aplikacji komputerowej Voltra.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Zagwarantowaliśmy również, że nie będziemy błyskawiać się z dokumentami ludzi. Używamy oglądania plików, aby można było umieścić swoje pliki gdziekolwiek chcesz, a my nie zmieniamy ich nazwy ani nie przenosimy ich dla Ciebie. Mamy wbudowaną bazę danych umożliwiającą śledzenie stanu obserwowanych katalogów, abyśmy mogli śledzić to, co jest nowe, nawet wtedy, gdy proces nie jest uruchomiony.

## Jakie wyzwania stoją przed tobą podczas budowy Voltra?

Spędzamy dużo czasu na wynikach. Zaczęliśmy od frameworka, ale przeniesiono do Javascript wanilli. Z naszego doświadczenia wynika, że powszechne abstrakcje przeważają nad wprowadzonymi przez nie karami za wyniki i ceremonią.

W tym momencie dość dobrze radzimy sobie z bardzo dużymi kolekcjami. Duże kolekcje oznaczają być może dziesiątki tysięcy zdjęć! Maszerujący węzeł. moduł systemu plików bezpośrednio dostępny w procesie renderowania sprawił, że bardzo łatwo było ładować i rozładować wiele obrazów bardzo szybko w oparciu o zdarzenia DOM.

Zasadniczo *[ustawNatychmiastowe](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* i *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* były niezwykle ważnymi narzędziami do wykonywania wielu operacji przy zachowaniu odpowiedzi interfejsu użytkownika. Dokładniej rzecz ujmując, rozprowadzanie zadań związanych z CPU w odrębne procesy naprawdę pomaga zachować reakcję interfejsu użytkownika. Na przykład przenieśliśmy aktualny kontekst audio do oddzielnego procesu, komunikowanie się z nim ponad [IPC](https://electronjs.org/docs/glossary/#ipc) , aby uniknąć potencjalnych przerw z zajętego interfejsu.

## Dlaczego zdecydowałeś się budować Voltra na Electron?

Piaskownica przeglądarki jest zbyt ograniczona dla naszej aplikacji. Tworzymy również odtwarzacz internetowy. Jest to więc olbrzymia zwycięstwo, że możemy podzielić się niemal 100 % kodeksu pomiędzy obydwoma wdrażaniami.

W rzeczywistości zaczęliśmy budować natywną aplikację ze Swift. Głównym problemem, który znaleźliśmy, było to, że na nowo wymyśliliśmy wiele rzeczy. Sieć ma największy na świecie ekosystem open source. Więc całkiem szybko przełączyliśmy się na Electron.

Ponadto, co najważniejsze, z Electronem raz się rozwijasz i powinno to być tylko WorkTM na wszystkich głównych platformach. Nie jest to zagwarantowane, ale koszt programowania na poziomie krajowym dla każdej platformy zdecydowanie przewyższa wszelkie inne koszty, które wprowadzają elektrony.

## Jakie są twoje ulubione rzeczy o Electron?

**GTD!**: Posiadanie kompozycji sieciowej Node.js i warstwa prezentacji Chromium jest receptą na zrobienie rzeczy.

**Kompetencja**: To tylko stos internetowy, więc dosłownie cały nasz zespół jest zaangażowany w faktycznie budowę produktu.

**Społeczność**: Istnieje wysoce zorganizowana społeczność, która wie jak naprawdę dobrze komunikować się! Czujemy się dość świetnie w rozwijaniu z takim wsparciem.

## W jakich obszarach Electron można ulepszyć?

Chcielibyśmy, aby Electron poparł jeden pakiet. Pakiet jest tak samo ważny dla Electrona, jak menedżer pakietów ma do Node. W użytkowniku jest wiele pakietów, każdy z ciekawymi funkcjami, ale każdy z błędami. Konsensus społeczności pomógłby w kierowaniu wydatkowaniem energii przez podmioty wnoszące wkład.

## Co dalej?

Obecnie pracujemy z artystami i etykietami, aby dodać muzykę do sklepu Voltra. Hej! Jeśli jesteś artystą lub etykietą, [zarejestruj się teraz](https://admin.voltra.co/signup)! Planujemy otwarcie sklepu, kiedy osiągniemy nasz cel, jakim jest 10 milionów torów.

