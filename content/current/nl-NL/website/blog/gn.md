---
title: "Gebruik GN om Electron te bouwen"
author: nornagon
date: '2018-09-05'
---

Electron gebruikt nu GN om zichzelf te bouwen. Dit is een discussie over de waarom.

---

# GYP en GN

Toen Electron voor het eerst werd vrijgegeven in 2013, werd Chromium's build-configuratie geschreven met [GYP](https://gyp.gsrc.io/), kort voor "Genereer Je Projecten".

In 2014, het Chromium project introduceerde een nieuwe build configuratie tool genaamd [GN](https://gn.googlesource.com/gn/) (afkorting voor "Generate [Ninja](https://ninja-build.org/)") De Chromium's build bestanden werden gemigreerd naar GN en GYP werd uit de broncode verwijderd.

Electron heeft historisch gezien een scheiding gehouden tussen de hoofdcode [Electron code](https://github.com/electron/electron) en [libchromiumcontent](https://github.com/electron/libchromiumcontent), het deel van Electron dat Chromium's 'inhoud' submodule bevat. Electron heeft doorgaan met het gebruiken van GYP, terwijl libchromiumcontent -- als een onderset van Chromium -- is overgeschakeld naar GN als Chromium dat deed.

Zoals gordijnen die niet zo gaafjes waren, was er wrijving tussen het gebruik van de twee bouwsystemen. Compatibiliteit behouden was foutloos, van compilervlaggen en `#definieer` die zorgvuldig gesynchroniseerd moet worden tussen Chromium, Node, V8 en Electron.

Om dit aan te pakken, heeft het Electron team eraan gewerkt om alles naar het bni te verplaatsen. Vandaag, is de [commit](https://github.com/electron/electron/pull/14097) om de laatste van de GYP-code van Electron te verwijderen geland in de meester.

# Wat betekent dit voor jou

Als je zelf bijdraagt aan Electron, het proces om Electron te checken en te bouwen van `master` of 4. .0 is heel anders dan in 3.0.0 en eerder. Zie de [GN build instructies](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) voor details.

Als je een app met Electron ontwikkelt, zijn er enkele kleine wijzigingen die je zou kunnen zien in de nieuwe Electron 4. .0-nightly; maar meer dan waarschijnlijk, zal de wijziging in het bouwsysteem van Electrons volledig transparant voor u zijn.

# Wat betekent dit voor Electron

GN is [sneller](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) dan de GYP en de bestanden ervan zijn leesbaarder en onderhoudsbaar. Bovendien hopen we dat het gebruik van een enkel build-configuratiesysteem het werk zal verminderen dat nodig is om Electron te upgraden naar nieuwe versies van Chromium.

 * Het wordt de ontwikkeling op Electron 4.0.0 al geholpen omdat Chromium 67 de ondersteuning voor MSVC heeft verwijderd en is overgeschakeld naar bouwen met Clang op Windows. Met de GN build, erven we direct alle compiler commando's van Chromium, dus hebben we de Clang build op Windows gratis gekregen!

 * Het maakt het ook makkelijker voor Electron om [BoringSSL](https://boringssl.googlesource.com/boringssl/) te gebruiken in een verenigd bouwwerk over Electron, Chromium en node -- iets dat [problematisch was voor](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
