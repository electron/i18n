---
title: 'Projekt Tygodnia: Ducha'
author:
  - feliksyrieseberg
  - zeke
date: '2017-02-14'
---

W tym tygodniu rozmawialiśmy z [Felix Rieseberg](https://felixrieseberg.com/), inżynier stacjonarny na [Slack](https://slack.com/) i opiekun [Ghost Desktop](https://ghost.org/downloads/), klient Electron dla platformy publikacji [Ghost](https://ghost.org/).

---

<div class="pt-5">
  <img src="https://cloud.githubusercontent.com/assets/2289/22913898/7396b0de-f222-11e6-8e5d-147a7ced37a9.png" alt="Zrzut ekranu Ducha"> 
</div>

## Co to jest Ghost?

Ghost jest w pełni otwartą, hackowalną platformą do budowania i prowadzenia nowoczesnej publikacji online. Potępiamy blogi, czasopisma i dziennikarze od Zappos do Sky News.

## Co różni się od innych platform wydawniczych?

Ghost został założony w kwietniu 2013 r., po bardzo udanej kampanii Kickstarter mającej na celu stworzenie nowej platformy skupiającej się wyłącznie na wydawnictwie profesjonalnym. Nasza misja polega na stworzeniu najlepszych narzędzi open source dla niezależnych dziennikarzy i pisarzy na całym świecie, i mają rzeczywisty wpływ na przyszłość mediów internetowych. Oferuje prostsze, bardziej skoncentrowane doświadczenie: nasz edytor jest zaprojektowany wyłącznie w celu zapewnienia jak najlepszego doświadczenia w pisaniu.

W porównaniu z tradycyjnymi tradycyjnymi WordPress, oferuje prostsze, bardziej uproszczone doświadczenia - łatwiej jest skonfigurować i utrzymać, ma wszystkie ważne funkcje poza zasięgiem i jest dramatycznie szybsza. W porównaniu z innymi platformami internetowymi Ghost zapewnia autorom pełną własność i kontrolę nad ich treściami, pozwala na pełne dostosowywanie i umożliwia autorom budowanie firmy wokół ich publikacji.

## Czy Ghost jest firmą nastawioną na zysk?

Ten aspekt jest dla nas ważny: Ghost jest niezależną organizacją nienastawioną na zysk. Tworzymy narzędzia do publikacji nowoczesnego dziennikarstwa & blogowania, ponieważ uważamy, że wolność słowa jest ważna. Nasze oprogramowanie jest wydawane na [bezpłatnej licencji open source](https://github.com/TryGhost/Ghost), nasz model biznesowy jest [całkowicie przezroczysty](https://blog.ghost.org/year-3/), a nasza struktura prawna oznacza, że 100% naszych pieniędzy jest ponownie inwestowane w uczynienie Ghosta lepszym.

## Czym jest Ghost Desktop?

Ghost Desktop pozwala pisarzom zarządzać wieloma blogami na raz - i skupić się na ich pisaniu. Proste rzeczy, takie jak zwykłe skróty do pisania nie mogą zostać zrealizowane w przeglądarce, ale są dostępne w naszej aplikacji komputerowej. Pozwala to innym aplikacjom komunikować się bezpośrednio [z blogiem za pomocą głębokich linków](https://github.com/tryghost/ghost-desktop/blob/master/docs/deeplinks.md).

## Czym jest Ghost dla Dziennikarski?

W tym roku jesteśmy bardzo podekscytowani poświęcaniem całej naszej 10 osób Ghost w pełnym wymiarze czasu pracy na rozwój trzech niezależnych publikacji, wraz z 45,000 dolarów na ich wysiłki. Nazywamy go [Duchem dla dziennikarstwa](https://ghost.org/journalism/).

Budujemy Ghost jako kolejną wspaniałą platformę dla niezależnych wydawców od około trzech i pół roku, a teraz dotarliśmy do naprawdę interesującego punktu przeginięcia. Rozpoczęliśmy tę podróż tworząc prostą, dobrze zaprojektowaną platformę blogową, która mogłaby być wykorzystywana tylko przez kogoś. To zawsze było krokiem.

W dłuższej perspektywie chcemy, aby Ghost był niewiarygodną platformą dla najlepszego dziennikarstwa na świecie, Oznacza to, że musimy budować funkcje, aby przyciągnąć tych właśnie ludzi. W tym roku podejmujemy bardzo świadomą decyzję o skoncentrowaniu się właśnie na tym.

## Dlaczego zdecydowałeś się zbudować pulpit Ghost na Electron?

Ghost używa JavaScript i Node. s zarówno na backendzie, jak i frontendzie, dzięki czemu nasza drużyna będzie w stanie korzystać z tej samej technologii i zestawu umiejętności, pozwala szybciej poruszać się szybciej, zbudować więcej i w efekcie zapewnić lepsze doświadczenie. Ponadto dzięki możliwości dzielenia się ponad 95 % kodu pomiędzy macOS, Windows, i wersja Linux aplikacji pozwala nam skupić się na budowaniu doskonałego doświadczenia użytkownika, bez konieczności utrzymywania jednej podstawy kodowej dla każdej platformy.

## Jakie wyzwania stoją przed Tobą podczas budowy Ghost Desktop?

Sprawdzanie pisowni jest prawdopodobnie jedną z najtrudniejszych oferowanych usług - z łatwością możemy skorzystać z jednej z wielu usług online, ale poprawne sprawdzanie pisowni w wielu językach przy zachowaniu prywatności i autonomii naszych użytkowników nie jest łatwym zadaniem.

## W jakich obszarach należy ulepszyć Electron?

Chcielibyśmy zobaczyć, że Electron przekazuje natywne możliwości sprawdzania pisowni systemu operacyjnego do swoich aplikacji. Marzymy o świecie, w którym pole `<input>` otrzymuje takie same usługi jak `NSTextView`, ale jesteśmy również świadomi tego, jak trudne.

## Jakie są twoje ulubione rzeczy o Electron?

JavaScript jest znany z tego, że jest ogromnym ekosystemem, obejmującym niezliczone narzędzia i ramy - ale wygoda, jaką nam daje, jest trudna do przestarzała. Budowanie aplikacji z Electronem jest tylko _nieco_ trudniejsze niż budowa aplikacji internetowej, która jest niesamowitym wyborem.

## Czy Duchy są gotowe? Jeśli nie, co nadejdzie dalej?

Ghost Desktop jest również trwającym projektem - jesteśmy bardzo dalecy od zrobienia. Od pewnego czasu rozmawiamy o zapewnieniu naszym użytkownikom trybu pełnego offline, a my dosyć blisko. Inne godne uwagi obszary robocze to rozszerzenie i integracja z innymi aplikacjami do edycji tekstu (takimi jak Word lub Atom), ostatecznie pozwalając ludziom pisać posty za pomocą swoich ulubionych narzędzi. Ogólnie rzecz biorąc, po wysłaniu funkcji trybu offline, poszukujemy głębszej integracji z systemem operacyjnym. Jeśli to brzmi interesująco, [dołącz do nas](https://github.com/tryghost/ghost-desktop)!

## Jakie są twoje ulubione aplikacje Electron?

Jestem wielkim fanem [Kap](https://getkap.co/), [Felony](https://github.com/henryboldi/felony)i [Visual Studio Code](https://code.visualstudio.com).

👻

