# Mga Isyu sa Electron

# Mga Isyu

* [Paano Makapag-ambag sa mga Isyu](#how-to-contribute-in-issues)
* [Paghingi ng Pangkalahatang Tulong](#asking-for-general-help)
* [Pagsusumite ng isang Ulat ukol sa Bug](#submitting-a-bug-report)
* [Pagta-triage ng isang Ulat ukol sa Bug](#triaging-a-bug-report)
* [Paglulutas ng isang Ulat ukol sa Bug](#resolving-a-bug-report)

## Paano Makapag-ambag sa mga Isyu

Para sa anumang isyu, mayroong tatlong pangunahing pamamaraan na ang isang indibidwal ay maka pag-ambag:

1. Sa pamamagitan ng pagbukas nang isyu para sa talakayan: Kung naniniwala ka na nakahanap ka ng isang bagong bug sa Electron, kailangan mo itong ipaalam sa pamamagitan ng paggawa ng bagong isyu sa `electron/electron` na tagasubaybay ng isyu.
2. Sa pamamagitan nang pagtulong upang ma-triage ang isyu: Magagawa mo ito sa pagbibigay ng asistibong mga detalye (isang mapaparaming kaso ng pagsusuri na nagpapakita ng isang bug) o sa pamamagitan ng pagbibigay ng mga mungkahi upang malutas ang isyu.
3. Sa pamamagitan ng pagtulong sa paglutas ng isyu: Ito ay maaaring gawin sa pamamagitan ng pagpapakita na ang isyu ay hindi bug o ito ay naayos na; pero kadalasan, sa pamamagitan nang pagbukas ng isang pull request na nagbabago sa pinagmulan sa `electron/electron` sa isang konkreto at masusuring paraan.

## Paghingi ng Pangkalahatang Tulong

Dahil ang antas nang aktibidad na nasa `electron/electron` na repositori ay napakataas, ang mga tanong o hiling para sa pangkalahatang tulong sa paggamit ng Electron ay dapat na idirekta sa [slack na tsanel ng komunidad](https://atomio.slack.com) o sa [forum](https://discuss.atom.io/c/electron).

## Pagsusumite ng isang Ulat ukol sa Bug

Kapag nagbubukas ng isang bagong isyu sa `electron/electron` na tagasubaybay ng isyu, ang mga gumagamit ay papakitaan ng isang template na dapat mapunan.

```markdown
<!--
Salamat sa pagbukas ng isang isyu! Ilang mga bagay na dapat tandaan:

- Ang tagagsubaybay sa isyu ay para sa mga bug at mga paghiling ng katangian.
Bago mag-ulat ng isang bug, pakiusap subukang gawin ulit ang iyong isyu laban sa pinakabagong  bersyon ng Electron.
-Kung kailangan mo ng pangkalahatang mungkahi, sumali ka sa aming Slack: http://atom-slack.herokuapp.com
-->

*Bersyon ng Electron:
*Sistemang pang-operasyon:

###Inaasahang paggalaw

<!-- Anong sa tingin mo ang dapat mangyari? -->

### Aktwal na paggalaw

<!-- Ano ba ang aktwal na nangyari? -->

### Paano magparami

<!--
Ang pinakamahusay na pagkakataon upang madaling masuri ang bug na ito ay ang magbigay ng isang REPOSITORI na maaaring kopyahin at patakbuhin.

Maari mong i-fork ang https://github.com/electron/electron-quick-start at isama ang isang link sa iyong sangay kasama ang mga pagbabago.

Kung magbibigay ka ng URL, mangyaring ilista ang mga utos na kinakailangan upang kopyahin/i-setup/paganahin ang iyong repo e.g.

$ git clone $YOUR_URL -b $BRANCH
$ npm install
$ npm start || electron.

-->
```

Kung naniniwala ka na nakshanap ka ng isang bug sa Elektron, pakiusap punan mo ang form na ito sa abot ng iyong makakaya.

Ang dalawang pinakamahahalagang piraso ng impormasyon na kailangan upang masuri ang ulat ay isang paglalarawan ng bug at isang simpleng kaso ng pagsusuri upang muling likhain ito. Madaling mag-ayos ng isang bug kung maaari itong paramihin.

Tingnan ang [Paano makagawa ng isang Minimal, Kumpleto, at Mapapatunayang halimbawa](https://stackoverflow.com/help/mcve).

## Pagta-triage ng isang Ulat ukol sa Bug

Karaniwan ito para sa mga bukas na isyu upang makasali sa diskusyon. Ilan sa mga mag-aambag ay maaaring mayroong ibat-ibang mga opinyon, kabilang ang kung ang paggalaw ay isang bug o katangian. Ang talakayang ito ay bahagi ng proseso at dapat na napanatiling napagtuonan, nakakatulong, at propesyonal.

Ang mga Terse na kasagutan na nagbibigay ng wala sa karagdagang konteksto o ang pagsuporta sa mga detalye ay hindi kapaki-pakinabang o propesyonal. Sa nakararami, ang mga tugong ito ay nakakainis at hindi makaibigan.

Hinihikayat ang mga taga-ambag na lutasin ng magkasama ang mga isyu at tulungan ang isat isa para makagawa ng progreso. Kung naka tagpo kanang isyu na pakiramdam mo ay hindi wasto, o naglalaman ng maling informasyon, ipaliwanag *why* nararamdaman mo ang paraan dito karagdagang suporta na mga konteksto, at handa maging kumbinsido na ikaw ay mali. Sa paggawa nito, madalas naming maabot ang tamang kinalalabasan na mas mabilis.

## Paglutas sa bug report

Kadalasan sa mga isyu ay nalutas sa pamamagitan ng pagbukas ng hilahin ang kahilingan. Ang prosseso sa pagbukas at pagrerepaso sa paghila ng kahilingan ay pareho sa mga nagbukas at pagsasagawa sa mga isyu, pero nagdadala ito ng kainakailangan pagsusuri at pag-apruba na workflow na tiyak na ang ipinanukalang pagbabago ay matugunan ang kalidad at ang mga alintuntunin ng proyekto ng elektron.