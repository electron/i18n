# Montáž

To install prebuilt Electron binaries, use [`npm`][npm]. Preferovanou metodou je nainstalovat Electron jako vývojovou závislost ve vaší aplikaci:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc][versioning] for info on how to manage Electron versions in your apps.

## Globální instalace

Můžete také globálně nainstalovat příkaz `electron` ve vašem `$PATH`:

```sh
npm install electron -g
```

## Přizpůsobení

Pokud chcete změnit architekturu, která je stažena (např. `ia32` na zařízení `x64` , můžete použít příznak `--arch` s npm install nebo nastavit proměnnou prostředí `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Kromě změny architektury můžete také specifikovat platformu (např. `win32`, `linux`, etc.) using the `--platforma` flag:

```shell
npm install --platform=win32 electron
```

## Proxies

Pokud potřebujete použít HTTP proxy, musíte nastavit proměnnou `ELECTRON_GET_USE_PROXY` na libovolnou hodnotu, plus další proměnné prostředí v závislosti na verzi uzlu vašeho hostitele:

* [Uzel 10 a vyšší][proxy-env-10]
* [Před uzlem 10][proxy-env]

## Vlastní zrcátka a keše
During installation, the `electron` module will call out to [`@electron/get`][electron-get] to download prebuilt binaries of Electron for your platform. Učiní tak tím, že kontaktuje stránku ke stažení na GitHubu (`https://github. om/electron/electron/releases/tag/v$VERSION`, kde `$VERSION` je přesná verze Electronu).

Pokud nejste schopni získat přístup k GitHub nebo musíte poskytnout vlastní sestavení, můžete tak učinit buď poskytnutím zrcadla nebo existující adresáře keší.

#### Zrcadlení
Můžete použít proměnné prostředí k přepsání základní URL, cestu k hledání binárních souborů Electronu a binárního jména. The url used by `@electron/get` is composed as follows:

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```plaintext
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

#### Mezipaměť
Případně můžete přepsat místní mezipaměť. `@electron/get` uloží do mezipaměti stažené binární soubory v lokálním adresáři, abyste nenechali zdůraznit vaši síť. Můžete použít tuto složku keše, abyste poskytli vlastní sestavení Electronu nebo aby vůbec nenavázali kontakt se sítí.

* Linux: `$XDG_CACHE_HOME` nebo `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` nebo `~/AppData/Local/electron/Cache/`

V prostředí, které používá starší verze Electronu, můžete najít keš také v `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

Mezipaměť obsahuje oficiální zip soubor verze stejně jako kontrolní soustavu uložený jako textový soubor. Typická keš může vypadat takto:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Přeskočit binární stahování
Při instalaci balíčku `elektronů` NPM automaticky stáhne binární soubor elektronů.

To může být někdy zbytečné, např. v prostředí CI při zkoušení jiné složky.

Aby se zabránilo stažení binárního souboru, když nainstalujete všechny závislosti npm, můžete nastavit proměnnou prostředí `ELECTRON_SKIP_BINARY_DOWNLOAD`. Např.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm instalace
```

## Odstranění problémů

Při spuštění `npm instaluje elektroron`, někteří uživatelé občas zaznamenají chyby instalace.

Téměř ve všech případech jsou tyto chyby výsledkem síťových problémů a ne skutečných problémů s balíčkem `elektronron` npm. Chyby jako `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`a `ETIMEDOUT` jsou náznakem takových problémů sítě . Nejlepším rozlišením je vyzkoušet přepínání sítí, nebo počkejte trochu a zkuste nainstalovat znovu.

You can also attempt to download Electron directly from [electron/electron/releases][releases] if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions][npm-permissions].

If the above error persists, the [unsafe-perm][unsafe-perm] flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

Na pomalejších sítích může být vhodné použít vlajku `--verbose` pro zobrazení postupu stahování:

```sh
npm install --verbose electron
```

Pokud potřebujete vynutit opětovné stažení majetku a souboru SHASUM nastavte proměnnou prostředí `force_no_cache` na `true`.

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
