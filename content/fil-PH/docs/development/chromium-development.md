# Pagpapaunlad ng Chromium

> Ang pagtitipon ng mga mapagkukunan para sa pag-aaral tungkol sa Chromium at pagsunod para sa pag-unlad nito

- [chromiumdev](https://chromiumdev-slack.herokuapp.com)sa Slack
- [@ChromiumDev](https://twitter.com/ChromiumDev)sa Twitter
- [@googlechrome](https://twitter.com/googlechrome) sa Twitter
- [Blog](https://blog.chromium.org)
- [Paghahanap ng Code](https://cs.chromium.org/)
- [Source Code](https://cs.chromium.org/chromium/src/)
- [Pagpapaunlad ng Oras at Pagpapalabas ng Impormasyon](https://www.chromium.org/developers/calendar)
- [Talakayan ng mga grupo](http://www.chromium.org/developers/discussion-groups)

Tingnan din ang[V8 Development](v8-development.md)

# Pagpapaunlad ng Chromium gamit ang Electron

Maaaring mag-alis ng mga mali sa Chromium gamit ag Electron sa pamamagitan ng pagpasa ng`--build_debug_libcc`sa bootstrap script:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

Gamit ang code sa itaas, makukuha at mabubuo ang lokal na libchromiumcontent, tulad sa `--build_release_libcc`, ngunit ito ay lilikha ng shared library na gawa sa libchromiumcontent at hindi magtatanggal ng kahit anumang mga simbolo, na syang magagamit para sa paghahanap o pagtatanggal ng mga mali.

Kapag nabuo tulad nito, maaaring gumawa ng mga pagbabago sa mga file na nakapaloob sa`vendor/libchromiumcontent/src`at muling buuin ng madali gamit ang:

```sh
$ ./script/build.py -c D --libcc
```

Kapag pinapaunlad ang linux gamit ang gdb, pinapayuhang magdagdag ng talatuntunan ng gdb upang mapabilis na pagkarga ng mga simbolo. Ito ay di nangangailangan na maipakita sa bawat na nabubuo, pero pinapayuhang gamitin ito kahit isang beses para matuntunan ang pinaka-shared libraries:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Ang pagbuo ng libchromiumcontent ay nangangailangan ng pinakamabisang makina at nagtatagal ng mahabang panahon (kahit pa mapabilis ang pagdagdag ng muling nagawa sa bahagi ng shared library). Gamit ang 8-core/16-thread Ryzen 1700 na pumapalo sa 3ghz, ang mabilis na SSD at 32GB ng RAM, ito ay tumatagal ng mga apatnapung minuto. Hindi pinahihintulutan na gumawa ng mas mababa sa 16GB ng RAM.

## Chromium git cache

ang`depot_tools`ay di nakasaad sa mapagpipilian na nagpapahintulot sa mga naglilinang na itakda ang global cache para sa lahat ng mga bagay sa git ng Chromium + dependencies. Ang mapagpipilian na ito ay gumagamit ng`git clone --shared`upang mapanatili ang bandwidth/space sa malaking bilang ng mga gumagaya ng kaparehong mga repository.

Sa electron/libchromiumcontent, ang mapagpipilian na ito ay nakalabas gamit ang`LIBCHROMIUMCONTENT_GIT_CACHE`sa environment variable. Kung nais mong magkaroon ng malaking bilang ng libchromiumcontent build trees sa kaparehong makina (halimbawa ng paggawa sa iba't-ibang mga sangay), pinapayuhang itakda ang variable upang mapabilis ang pagkuha ng pinanggalingan ng Chromium. Halimbawa:

```sh
$ mkdir ~/.chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE=~/.chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

Kung ang bootstrap script ay di gumana habang ginagamit ang git cache, iiwanan din nitong hindi magagamit ang cache. Upang muli itong magamit, burahin ang mga file na nagtatapos sa`.lock`:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

Maaaring maibahagi ang directory sa iba pang mga makina sa pamamagitan ng paglabas nito bilang bahagi ng SMB sa linux, ngunit isang proseso/makina lamang ang maaaring gamitin. Ang mga lock na nilikha ng git-cache script ay susubukang maiwasan ito, pero maaari pa rin itong di gumana ng maayos sa network.

Sa Windows, ang SMBv2 ay mayroong directory cache na maaaring maging sanhi ng problema gamit ang git cache script, kaya naman kailangan itong ihinto gamit ang setting sa registry key

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

hanggang 0. Para sa iba pang mga detalye: https://stackoverflow.com/a/9935126