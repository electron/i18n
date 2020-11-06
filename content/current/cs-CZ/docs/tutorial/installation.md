# Montáž

Chcete-li nainstalovat předpostavené binární verze Electronu, použijte [`npm`](https://docs.npmjs.com). Preferovanou metodou je nainstalovat Electron jako vývojovou závislost ve vaší aplikaci:

```sh
npm install electron --save-dev
```

Informace o tom, jak spravovat Electron verze ve vašich aplikacích, naleznete v [Electron verzích doc](./electron-versioning.md).

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

* [Uzel 10 a vyšší](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Před uzlem 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Vlastní zrcátka a keše

Během instalace, modul `elektronron` zavolá na [`@electron/get`](https://github.com/electron/get) ke stažení předsestavených binárních souborů Electron pro vaši platformu. Učiní tak tím, že kontaktuje stránku ke stažení na GitHubu (`https://github. om/electron/electron/releases/tag/v$VERSION`, kde `$VERSION` je přesná verze Electronu).

Pokud nejste schopni získat přístup k GitHub nebo musíte poskytnout vlastní sestavení, můžete tak učinit buď poskytnutím zrcadla nebo existující adresáře keší.

#### Zrcadlení

Můžete použít proměnné prostředí k přepsání základní URL, cestu k hledání binárních souborů Electronu a binárního jména. URL adresa používaná `@electron/get` se skládá takto:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Například použít čínské CDN zrcadlo:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

Ve výchozím nastavení je `ELECTRON_CUSTOM_DIR` nastaveno na `v$VERSION`. Pro změnu formátu použijte zástupný znak `{{ version }}`. Například, `verze{{ version }}` je určena na `verzi-5.0.`, `{{ version }}` řeší `5.0.`a `v{{ version }}` jsou ekvivalentní výchozí hodnotě. Jako konkrétnější příklad použít čínské neCDN zrcadlo:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

Výše uvedená konfigurace stáhne z URL, jako je `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Mezipaměť

Případně můžete přepsat místní mezipaměť. `@electron/get` uloží do mezipaměti stažené binární soubory v lokálním adresáři, abyste nenechali zdůraznit vaši síť. Můžete použít tuto složku keše, abyste poskytli vlastní sestavení Electronu nebo aby vůbec nenavázali kontakt se sítí.

* Linux: `$XDG_CACHE_HOME` nebo `~/.cache/electron/`
* macOS: `~/Knihovna/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` nebo `~/AppData/Local/electron/Cache/`

V prostředí, které používá starší verze Electronu, můžete najít keš také v `~/.electron`.

Můžete také přepsat lokální umístění keše zadáním proměnné prostředí `electron_config_cache` .

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

Můžete se také pokusit stáhnout Electron přímo z [electron/electron/releasases](https://github.com/electron/electron/releases) při instalaci přes `npm` selhává.

Pokud instalace selže s chybou `EACCESS` , možná budete muset [opravit vaše npm oprávnění](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Pokud výše uvedená chyba přetrvává, nemusí být příznak [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) nastaven na true:

```sh
sudo npm install electron --unsafe-perm=true
```

Na pomalejších sítích může být vhodné použít vlajku `--verbose` pro zobrazení postupu stahování:

```sh
npm install --verbose electron
```

Pokud potřebujete vynutit opětovné stažení majetku a souboru SHASUM nastavte proměnnou prostředí `force_no_cache` na `true`.
