# Eksperymentalne API

Niektóre API Electrons są oznaczone `_Eksperymentalne_` w dokumentacji. Ten tag wskazuje, że API może nie być uznane za stabilne, a API może być usuwane lub modyfikowane częściej niż inne API z mniejszym ostrzeżeniem.

## Warunki tagowania API jako eksperymentalne

Każdy może poprosić o tagi API jako eksperymentalne w funkcji PR, spory dotyczące eksperymentalnego charakteru danej funkcji mogą być omawiane w API WG, jeśli nie mogą zostać rozwiązane w PR.

## Proces usuwania tagu eksperymentalnego

Gdy API będzie stabilne i co najmniej w dwóch głównych wierszach stabilnego wydania, może zostać nominowany do usunięcia tagu eksperymentalnego.  Ta dyskusja powinna się zdarzyć na spotkaniu API WG.  Sprawy do rozważenia podczas dyskusji / nominacji:

* Powyższy warunek „dwóch głównych linii uwalniania stajni” musi zostać spełniony
* W tym czasie żadne poważne błędy lub problemy nie powinny być spowodowane przyjęciem tej funkcji
* Interfejs API jest wystarczająco stabilny i nie został poważnie dotknięty przez ulepszenia Chromium
* Czy ktoś używa API?
* Czy API spełnia pierwotne proponowane przypadki użytkowania, czy ma jakieś luki?
