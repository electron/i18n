# Tungkol sa Electron

[Elektron](https://electronjs.org) ay isang bukas na aklatan na binuo ni GitHub para sa pagtatayo ng mga aplikasyon ng desktop ng krus-platform na may HTML, CSS, at JavaScript. Ginagawa ito ng elektron sa pamamagitan ng pagsasama ng [Chromium](https://www.chromium.org/Home) at [Node.js](https://nodejs.org) sa isang runtime at mga apps na maaaring ma-pakete para sa Mac, Windows, at Linux.

Nagsimula ang Elektron noong 2013 bilang balangkas kung saan ang [Atom](https://atom.io), ang editor ng text na hack ng GitHub, ay itatayo. Ang dalawa ay bukas na pinagmulan galing sa tagsibol noong 2014.

Mula noon ito ay naging isang sikat na kasangkapan na ginagamit ng mga nagdedevelop, nagpoproseso, at ng mga Establisadong kumpanya.[Tingnan kung sino ang nagtatayo sa Elektron](https://electronjs.org/apps).

Magbasa pa upang matuto nang higit pa tungkol sa mga tagapag-ambag at paglabas ng Elektron o makapagsimula sa pagbuo gamit ang Elektron sa [Gabay sa Mabilis na Pagsisimula](quick-start.md).

## Buod na pangkat at mga nag ambag

Ang elektron ay pinananatili ng isang koponan sa GitHub pati na rin ang isang grupo ng [aktibong mga kontribyutor](https://github.com/electron/electron/graphs/contributors) mula sa komunidad. Ang ilan sa mga nag-aambag ay mga indibidwal at ilang mga trabaho sa mas malalaking kumpanya na bumubuo sa Elektron. Kami ay nalulugod na magdagdag ng mga madalas na tagapag-ambag sa proyekto bilang mga tagapanatili. Magbasa pa tungkol sa [nag-aambag sa Elektron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Paglalabas

[Ang paglalabas ng elektron](https://github.com/electron/electron/releases) ng madalas. Inilalabas namin kapag may mga makabuluhang pag-aayos ng bug, mga bagong API o pag-update ng mga bersyon ng Chromium o Node.js.

### Ina-update ang Dependencies

Ang bersyon ng kromo ng elektron ay kadalasang na-update sa loob ng isa o dalawang linggo matapos ang isang bagong matatag na bersyon ng kromo na inilabas, depende sa pagsisikap ng kasangkot sa pag-upgrade.

Kapag ang isang bagong bersyon ng Node.js ay inilabas, ang Elektron ay karaniwang inaabot ng isang buwan bago mag-upgrade upang magdala ng isang mas matatag na bersyon.

Sa Elektron, Node.js at Kromo binabahagi ang isang solong halimbawa V8-ito ang karaniwang bersyon na ginagamit ng Kromo. Karamihan sa mga oras na ito ay *gumagana lamang* ngunit kung minsan ay nangangahulugan ito ng patching Node.js.

### Bersyon

Bilang ng bersyon 2.0 Elektron [ay sumusunod sa `semver`](https://semver.org). Para sa karamihan ng mga aplikasyon, at gamit ang anumang makabagong bersyon ng npm, na napapatakbo ng`$ npm install elektron` ay gagawin ang tama.

Ang proseso ng pag-update ng bersyon ay malinaw na detalyado sa aming [Bersyon Doc ](electron-versioning.md).

### LTS

Ang pangmatagalang suporta ng mas lumang mga bersyon ng Elektron ay kasalukuyang hindi umiiral. Kung gumagana sa iyo ang kasalukuyang bersyon ng Elektron, maaari kang manatili dito hangga't gusto mo. Kung gusto mong magamit ang mga bagong tampok kapag ito ay nakapasok na kailangan mong i-upgrade ang maka-bagong bersiyon.

Isang malaking update ang dumating na may bersyon `v1.0.0`. Kung hindi mo pa ginagamit ang bersyon na ito, dapat mong [basahin nang higit pa ang tungkol sa `v1.0.0`mga pagbabago](https://electronjs.org/blog/electron-1-0).

## Pangunahing Pilosopiya

Upang mapanatili ang Elektron na maliit (laki ng file) at pangmatagalan (ang pagkalat ng dependencies at API) nililimitahan ng proyekto ang saklaw ng pangunahing proyekto.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Pinapadali nito ang pag-upgrade ng Kromo ngunit lahat ng mga tampok na makikita sa Google Chrome ay hindi makikita sa Elektron.

Ang mga bagong tampok na idinagdag sa Elektron ay dapat na maging pangunahing mga API. Kung ang tampok ay maaaring maging sarili nitong Node.js modyul, marahil ito ay dapat. Tingnan ang [mga kasangkapan ng elektron na binuo ng komunidad](https://electronjs.org/community).

## Kasaysayan

Nasa ibaba ang mga mahahalagang pangyayari sa kasaysayan ng Elektron.

| :Kalendaryo:           | :tada:                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Abril 2013**         | [Sinimulan ang Atom Shell](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Mayo 2014**          | [Atom Shell ay bukas na pingmulan](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                 |
| **Abril 2015**         | [Ang Atom Shell ay muling pinangalanang Elektron](https://github.com/electron/electron/pull/1389).                |
| **Mayo 2016**          | [Inilabas ang elektron`v1.0.0`](https://electronjs.org/blog/electron-1-0).                                        |
| **Mayo 2016Mayo 2016** | [Ang mga app ng elektron ay tugma sa Mac App Store](mac-app-store-submission-guide.md).                           |
| **Agosto 2017**        | [Windows Store na suporta para sa Electron na mga app](windows-store-guide.md).                                   |