# Pag-upgrade ng node

## Pagtatalakay

Isang isyu ng upgrade sa pagtayo ng lahat ng Electron na may isang kopya ng V8 upang siguraduhin ang kompatibilidad. Ito ay mahalaga dahil ang upstream Node at [libchromiumcontent](upgrading-chromium.md) ay parehong gumagamit ng sariling version ng V8.

Ang pag-uupgrade ng Node ay mas madali kaysa pag-uupgrade ng libchromiumcontent, dahil maliit lang ang nagiging problema kapag unang nag-uupgrade ng libchromiumcontent, at ang pagpili ng bagong upstream Node na mas malapit sa V8.

Ang Elektron ay may sariling [Node fork](https://github.com/electron/node) na may kasamang modipikasyon para sa V8 na ang mga detalye ay naibanggit sa itaas at para sa paglalantad ng API na kinakailangan ng Elektron. Kapag ang isang upstream Node release ay napili, ito'y nilalagay sa isang branch ng Elektron's Node fork at bawat Elektron Node patch ay inilalapat doon.

Isa pang dahilan sa mga proyekto ng Node ay nagpapatch ito sa bersyon V8. Tulad ng naibanggit sa itaas, ang Elektron ay ginagawa ang lahat sa isang kopya ng V8, kaya lahat ng Node's V8 patches ay kailangang mailagay sa kopyang iyon.

Kapag lahat ng nagdedepende sa Elektron ay tumataas at gumagamit ng parehong kopya ng V8, ang sususnod na hakbang ay ang pag-ayos ng Elektron code na nagbibigay problema sa pag-upgrade ng Node.

[FIXME] isang bagay tungkol sa Node debugger na nasa Atom na (hal. deepak) gagamitin at kailangan para kumpirmahin na hindi masisira sa pag-uupgrade ng Node?

Sa madaling salita, ang kinakaylangan nating gawin ay:

1. I-update ang Elektron's Node fork sa dapat na bersyon
2. I-patch ang backport Node's V8 sa kopya ng ating V8
3. I-update din ang Elektron para magamit ang bagong version ng Node 
  - I-update ang mga submodules
  - At i-update rin ang kumpigurasyon ng Node.js

## Pag-uupdate ng Elektron's Node [fork](https://github.com/electron/node)

1. Siguraduhin na `master` sa `electron/node` ay may updated na release tags galing sa `nodejs/node`
2. Gumawa ng sangay sa https://github.com/electron/node: `electron-node-vX.X.X` kung saan galing ang base na ginamit mo sa branching ay ang tag na kailangan para sa update 
  - `vX.X.X` Dapat gumamit ng bersyon ng node na tugma sa aming kasalukayang bersyon ng chromium
3. Gumamit ulit sa aming mga commits galing sa nakaraang bersyon ng node na aming ginagamit (`vY.Y.Y`) ang to `v.X.X.X` 
  - Suriin ang mga release tag at piliin ang range of commits na kailangan nating muling i-aplay
  - Ang range para sa Cherry-pick commit: 
    1. Suriin pareho `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Resolbahin ang mga naaipon at dumadating na problema bawat file, at pagkatapos ay: 
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. Ulit-ulitin hanggang sa matapos

## Pag-uupdate ng [V8](https://github.com/electron/node/src/V8) Patches

Kailangan natin bumuo ng patch file mula sa bawat patch na inilapat sa V8.

1. Kumuha ng kopya ng Elektron's libcc fork 
  - `$ git clone https://github.com/electron/libchromiumcontent`
2. Tumakbo `script/updatescript/update` para makakuha ng panibagong libcc 
  - Kinakailangan ito ng mahabang oras
3. Tanggalin ang lumang kopya ng ating Node v8 patches 
  - (In libchromiumcontent repo) Read `patches/common/v8/README.md` to see which patchfiles were created during the last update
  - Tanggalin lahat ng files mula sa `patches/common/v8/`: 
    - `git rm` ang patchfiles
    - edit `patches/common/v8/README.md`
    - isagawa lahat ng mga pagtatanggal
4. Inspeksyunin ang Node [repo](https://github.com/electron/node) para makita kung anong patches upstream Node ang gumamit ng kanilang sariling V8 pagkatapos makasira ito sa bersyon 
  - `git log --oneline "deps/v8"`
5. Gumawa ng listahan para sa patches. Ito ay nakakatulong para sa pagsubaybay sa iyong gawain at para may mabilis na kasanggunian ng commit hashes na magagamit sa `git diff-tree` mga hakbang na nasa ibaba.
6. Basahin ang `patches/common/v8/README.md` para makita kung aling patchfiles galing sa nakaraang bersyon sa V8 at kinakailangang tanggalin. 
  - Delete each patchfile referenced in `patches/common/v8/README.md`
7. Apply all patches with the [`get-patch` script](https://github.com/electron/libchromiumcontent/blob/master/script/README.md#get-patch): 
  - `./script/get-patch --repo src/v8 --output-dir patches/v8 --commit abc123 def456 ...`
8. Update `patches/common/v8/README.md` with references to all new patches that have been added so that the next person will know which need to be removed.
9. I-update ang mga Elektron's submodule references: 
      sh
      $ cd electron/vendor/node
      electron/vendor/node$ git fetch
      electron/vendor/node$ git checkout electron-node-vA.B.C
      electron/vendor/node$ cd ../libchromiumcontent
      electron/vendor/libchromiumcontent$ git fetch
      electron/vendor/libchromiumcontent$ git checkout upgrade-to-chromium-X
      electron/vendor/libchromiumcontent$ cd ../..
      electron$ git add vendor
      electron$ git commit -m "update submodule references for node and libcc"
      electron$ git push origin upgrade-to-chromium-<VERSION>
      electron$ script/bootstrap.py -d
      electron$ script/build.py -c -D

## Mga Tala

- ang libcc at V8 ay itinuturing bilang isang solong yunit
- Pinapanatili ng Node ang sariling fork ng V8 
  - Bina-backport nila ang isang maliit na halaga sa mga bagay na kinakailangan
  - Dokumentasyon sa node kung paano [sila nagtratrabaho na may V8](https://nodejs.org/api/v8.html)
- Nagu-update kami ng code subalit isa lang ang ginagamit naming kopya ng V8 sa lahat ng elektron 
  - Hal. electron, libcc, at node
- Hindi namin maiging sinusubaybayan ang upstream dahil sa logistics: 
  - Ang upstreams ay gumagamit ng maraming repos at ang pagsasama nito sa isang repo ay magdudulot ng kawalan ng resulta sa history. Kung kaya nagu-update lang kami kung may planong pagbump ng node sa elektron.
- ang libcc ay malaki at napakatagal mag-update, kung kaya't karaniwang pinipili ang node bersyon ay base sa release ng bersyon ng V8 na pinakamalapit sa bersyon ng libcc na ating ginagamit. 
  - Minsan kailangan rin nating maghintay para sa susunod na Node release dahil ito'y isy-sync malapit sa bersyon ng V8 sa bago nitong libcc
  - Ipinapanatili ng elektron lahat ng patches sa libcc dahil ito'y mas simple kaysa pag papanatili ng iba't-ibang repos para sa patches para sa bawat upstream na proyekto. 
    - Crashpad, node, libcc, atbp. patches ay nakatago lahat sa iisang lugar
  - Paggawa ng Node: 
    - May pagkakataon na kailangan natin baguhin ang ating build configuration para tumugma sa build flags na kailangan ng node `node/common.gypi`