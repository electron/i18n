# Instalare

Pentru a instala binarii Electron preconstruiți, utilizați [`npm`](https://docs.npmjs.com). Metoda preferată este să instalezi Electron ca o dependență de dezvoltare în aplicația :

```sh
npm instalare electron --save-dev
```

Vezi [documentul cu versiuni Electron](./electron-versioning.md) pentru informații despre cum să gestionezi versiunile Electron din aplicațiile tale.

## Instalare globală

De asemenea, poți instala comanda `electron` global în `$PATH`:

```sh
npm install electron -g
```

## Personalizare

Dacă doriți să schimbați arhitectura care este descărcată (de ex. `ia32` pe o mașină `x64` ), poți utiliza mediul variabila `--arch` cu npm instalare sau setează `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

În plus față de schimbarea arhitecturii, poți specifica și platforma (de ex. `win32`, `linux`, etc.) folosind steagul `--platformă`:

```shell
npm instalare --platform=win32 electron
```

## Proxiuri

Dacă ai nevoie să folosești un proxy HTTP, trebuie să setezi variabila `ELECTRON_GET_USE_PROXY` la orice valoare, plus variabile de mediu adiționale în funcție de versiunea Node a sistemului gazdă:

* [Nodul 10 și mai mare](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Înainte de modulul 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Oglinzi și cacheuri personalizate
În timpul instalării, modulul `electron` va fi disponibil în [`@electron/get`](https://github.com/electron/get) pentru a descărca dispozitive binare preconstruite de Electron pentru platforma ta. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

Dacă nu puteți accesa GitHub sau trebuie să furnizați un build personalizat, puteţi face acest lucru fie furnizând o oglindă sau un director existent.

#### Oglindă
You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. URL-ul folosit de `@electron/get` este compus după cum urmează:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

De exemplu, utilizarea oglinzii retrovizoare CDN China:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

În mod implicit, `ELECTRON_CUSTOM_DIR` este setat la `v$VERSION`. Pentru a schimba formatul, folosește substituentul `{{ version }}`. De exemplu, `versiunea{{ version }}` se rezolvă la `version-5.0.`, `{{ version }}` se rezolvă la `5.0.`, și `contra{{ version }}` este echivalent cu valoarea implicită. Ca un exemplu mai concret, pentru a folosi China non-CDN:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

Configurarea de mai sus va fi descărcată din URL-uri precum `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Geocutie
Alternativ, poți suprascrie cache-ul local. `@electron/get` va cacheaza binare descărcate într-un director local pentru a nu bloca rețeaua dvs. Puteţi utiliza acest dosar pentru a oferi compilări personalizate de Electron sau pentru a evita contactul cu reţeaua.

* Linux: `$XDG_CACHE_HOME` sau `~/.cache/electron/`
* macOS: `~/Librărie/Caches/electron/`
* Ferestre: `$LOCALAPPDATA/electron/Cache` sau `~/AppData/Local/electron/Cache/`

În medii care folosesc versiuni mai vechi de Electron, s-ar putea să găsești geocutia și în `~/.electron`.

De asemenea, poți suprascrie locația geocutiei locale oferind o variabilă `electron_config_cache` .

Geocutia conţine fişierul zip oficial al versiunii precum şi o sumă de verificare, stocată ca un fişier text. O geocutie tipică ar putea arăta astfel:

```sh
•─ :left-right_arrowgithub.comelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
<unk> χ─ electron-v1.7.9-darwin-x64.zip
<unk> χgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
έέ─ SHASUMS256.txt
<unk> χgithub.comelectronelectronreleasesdownadv1.8.1 electronon-v1.8.1-darwin-x64. ip
<unk> <unk> <unk> ─ electron-v1.8.1-darwin-x64.zip
<unk> χgithub.comelectronreleasesdownloadv1.8.1SHASUMS256.txt
<unk> <unk> ─ SHASUMS256.txt
<unk> χρα, ─ Πgithub. omelectronreleasesdownloadv1.8.2-beta.1electron- v1.8.2-beta.1-darwin-x64.zip
•electron-v1.8.2-beta.1-darwin-x64.zip
<unk> ─ worgithub. omelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
<unk> ─ SHASUMS256.txt
<unk> ─ ",github.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-beta.2-darwin-x64.zip
<unk> <unk> ─ electronon-v1.8.2-beta.2-darwin-x64.zip
<unk> ─ χgithub.comelectronelectronreleasesdownloadv1.8.2-beta. SHASUMS256.txt
<unk> ─ SHASUMS256.txt
<unk> χ3,github.comelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64. ip
<unk> •─ electron-v1.8.2-beta.3-darwin-x64.zip
<unk> ─ :left-right_arrowgithub.comelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    • ─ SHASUMS256.txt
```

## Omite descărcarea binară
Atunci când instalează pachetul NPM `electron` se descarcă automat binarul electronic.

Acest lucru poate fi uneori inutil, de exemplu într-un mediu CI atunci când se testează o altă componentă.

Pentru a preveni descărcarea binarului când instalați toate dependențele npm puteți seta variabila de mediu `ELECTRON_SKIP_BINARY_DOWNLOAD`. De exemplu:
```sh
Instalare ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm
```

## Depanare

Când rulezi `npm install electron</ 0>, unii utilizatori întâlnesc ocazional erori de instalare.</p>

<p spaces-before="0">Când rulezi <code>npm instalează electroni`, unii utilizatori întâlnesc ocazional erori de instalare. Errori ca `ELIFECYCLE`,`EAI_AGAIN`, `ECONNRESET`, si `ETIMEDOUT` sunt indicatii ca exista probleme de retea. Cea mai bună rezoluție este să încercați să schimbați rețelele, sau să așteptați puțin și să instalați din nou.

Puteți încerca să descărcați Electron direct de pe [electron/electron/releases](https://github.com/electron/electron/releases) dacă instalarea via `npm` eșuează.

În cazul în care instalarea eșuează cu o eroare `EACCESS` ar putea fi nevoie să [corectați permisiunile npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

În cazul în care eroarea de mai sus persistă, este posibil ca [nesigur perm](https://docs.npmjs.com/misc/config#unsafe-perm) să trebuiască să fie setat la adevărat:

```sh
sudo npm instalați electron --nesafe-perm=true
```

Pe rețele mai lente, ar putea fi recomandabil să se folosească steagul `--verbose` pentru a afișa progresul de descărcare:

```sh
npm install --verbose electron
```

Dacă ai nevoie să forțezi o redescărcare a activului și fișierul SHASUM setează variabila de mediu `forță_no_cache` la `adevărat`.
