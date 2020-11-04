---
title: Chromium FileReader Kulnerability Fix
author: marshallofsound
date: '2019-03-07'
---

Er is een grote kwetsbaarheid ontdekt in Chrome dat invloed heeft op alle software gebaseerd op Chromium, inclusief Electron.

Deze kwetsbaarheid is toegewezen `CVE-2019-5786`.  U kunt er meer over lezen in de [Chrome Blog Post](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

Houd er rekening mee dat Chrome rapporten heeft over deze kwetsbaarheid die in het wild wordt gebruikt, dus het wordt sterk aanbevolen om Electron ASAP te upgraden.

---

## Bereik

Dit heeft invloed op elke Electron applicatie die derden of niet-vertrouwde JavaScript kan gebruiken.

## Mitigatie

Getroffen apps moeten worden bijgewerkt naar een gepatched versie van Electron.

We hebben nieuwe versies van Electron gepubliceerd, die oplossingen voor deze kwetsbaarheid bevatten:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

De laatste beta van Electron 5 was het bijhouden van Chromium 73 en is daarom al aangepast:
  * [5.0.0-beta.5](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## Verdere informatie

Deze kwetsbaarheid werd ontdekt door Clement Lecigne van Google's Threat Analysis Group en gerapporteerd aan het Chrome-team.  De Chrome blogpost kan [hier](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html) gevonden worden.

Om meer te weten te komen over beste praktijken om je Electron apps veilig te houden, bekijk onze [beveiligingshandleiding](https://electronjs.org/docs/tutorial/security).

Als u een kwetsbaarheid in Electron wilt melden, e-mail security@electronjs.org.
