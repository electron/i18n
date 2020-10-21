---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Od wersji 1.3.1 Electrona, możesz `npm zainstalować electron --save-dev` aby zainstalować najnowszą wstępnie skompilowaną wersję Electrona w swojej aplikacji.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Wstępnie zbudowany plik binarny Electron

Jeśli kiedykolwiek pracowałeś(-aś) nad aplikacją Electrona, prawdopodobnie spotkałeś się z `wstępnie zbudowanym pakietem` npm. Ten pakiet jest nieodzowną częścią niemal każdego projektu Electron. Po zainstalowaniu system ten wykrywa Twój system operacyjny i pobiera wstępnie wbudowany binar, który jest skompilowany do pracy na architekturze Twojego systemu .

## Nowa nazwa

Proces instalacji Electron był często blokiem dla nowych programistów. Wielu odważnych ludzi próbowało rozpocząć tworzenie Electrona przez aplikację uruchamiając `npm install electron` zamiast `npm install electron-prebuilt`, tylko aby odkryć (często po wielu dezorientacjach), że nie był to `elektron` szukały.

Dzieje się tak, ponieważ istniał projekt `electron` na npm, stworzony przed projektem Electron GitHuba. Aby ułatwić rozwój Electron i zwiększyć intuicyjność dla nowych programistów, dotarliśmy do właściciela istniejącego pakietu `elektron` npm, aby zapytać, czy chce nam użyć nazwy. Na szczęście był fanem naszego projektu i zgodził się na pomoc w ponownym przemieszczeniu nazwy.

## Wstępne życie na

Od wersji 1.3.1, rozpoczęliśmy publikowanie [`elektron`](https://www.npmjs.com/package/electron) i `elektron-prebuild` pakietów do npm w tandemie. Oba pakiety są identyczne. Przez jakiś czas postanowiliśmy kontynuować publikowanie pakietu pod oboma nazwami, aby nie utrudniać tysiącom programistów, którzy obecnie używają w swoich projektach `elektron-prezbudowanych`. Zalecamy aktualizację twojego `pakietu. syn` plików, aby użyć nowej zależności `electron` , ale będziemy nadal publikować nowe wersje `elektronów wstępnie zbudowanych` do końca 2016 r.

Repozytorium [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) pozostanie kanonicznym domem pakietu `electron` npm.

## Bardzo dziękuję

Jesteśmy winni specjalne podziękowania [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), i wielu innych [współtwórców](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) do tworzenia i utrzymywania `elektron-wstępnie zbudowanych`, i dla ich niestrudzonej usługi do JavaScript, Node. , i społeczności Electron.

Dzięki [@logicalparadox](https://github.com/logicalparadox) za zezwolenie na przejęcie pakietu `electron` na npm.

## Aktualizowanie Twoich projektów

Współpracowaliśmy ze społecznością nad aktualizacją popularnych pakietów, które dotyczą tej zmiany. Pakiety takie jak [electron-packager](https://github.com/electron-userland/electron-packager), [electron-rebuild](https://github.com/electron/electron-rebuild), i [electron-builder](https://github.com/electron-userland/electron-builder) zostały już zaktualizowane w celu pracy z nową nazwą, podczas gdy kontynuuje obsługę starej nazwy.

Jeśli napotkasz jakiekolwiek problemy z instalacją tego nowego pakietu, daj nam znać, otwierając problem na repozytorium [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) .

W przypadku innych problemów z Electronem użyj repozytorium [electron/electron](https://github.com/electron/electron/issues) .

