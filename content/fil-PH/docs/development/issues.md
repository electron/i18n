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
-Kung kailangan mo ng pangkalahatang isyu, sumali ka sa aming Slack: http://atom-slack.herokuapp.com
-->

*Elektron bersyon:
*Operating system:

###Inaasahang pag-uugali

&It;!-- Anong sa tingin nyo ang mangyayari? -->

### Aktwal na pag-uugali

&It;!-- Ano talaga ang mangyayari? -->

### Paano magparami

&It;!--
Ang pinakamahusay na pagkakataon ng pagkuha ng bug na ito ay tingnan ng mabilis ay upang magbigay ng imbakan na maaring kopyahin at patakbuhin.

Maari mong itapon https://github.com/elektron/elektron-guick-start at isama ang link sa iyong pagbabago.

Kung magbigay kanang ERL, pakiusap ilista ang mga command kinakailangan upang i clone/setup/run your repo e.g.

$ git clone $YOUR_URL -b $BRANCH
$ npm install
$ npm start || elektron.

-->
```

Kung naniniwala ka na nahanap mo na ang bug sa loob nang Elektron, pakiusap punan mo ang form sa abot ng iyong makakaya.

Ang dalawang pinakamahalagang piraso ng informasyon na kailangan upang suriin ang report ay isang paglalarawan ng bug at ang simpleng pagsubok na kaso upang muling likhain ito. Madali itong ayusin ang bug kung maaari itong magparami.

Tingnan[Paano makagawa ng minimal, Kumpleto, at Napatunayan halimbawa](https://stackoverflow.com/help/mcve).

## Pagsasagawa sa bug report

Karaniwan nito para sa mga bukas na isyu upang makasali sa diskusyon. Ilan sa mga mag-aambag ay maaaring meron ibat-ibang mga opinyon, kabilang ang kung ang pag-uugali ay isang bug o tampok. Ang talakayang ito ay bahagi ng proseso at dapat na maingatan at nakatuon, matutlungin, at propesyonal.

Mga tugon na nagbibigay alinman sa karagdagang konteksto o pagsuporta sa mga detalye ay hindi kapaki-pakinabang o profesyonal. Sa napakarami, ang mga tugon na ito ay nakakainis at hindi magiliw.

Hinihikayat ang mga taga-ambag na lutasin ng magkasama ang mga isyu at tulungan ang isat isa para makagawa ng progreso. Kung naka tagpo kanang isyu na pakiramdam mo ay hindi wasto, o naglalaman ng maling informasyon, ipaliwanag *why* nararamdaman mo ang paraan dito karagdagang suporta na mga konteksto, at handa maging kumbinsido na ikaw ay mali. Sa paggawa nito, madalas naming maabot ang tamang kinalalabasan na mas mabilis.

## Paglutas sa bug report

Kadalasan sa mga isyu ay nalutas sa pamamagitan ng pagbukas ng hilahin ang kahilingan. Ang prosseso sa pagbukas at pagrerepaso sa paghila ng kahilingan ay pareho sa mga nagbukas at pagsasagawa sa mga isyu, pero nagdadala ito ng kainakailangan pagsusuri at pag-apruba na workflow na tiyak na ang ipinanukalang pagbabago ay matugunan ang kalidad at ang mga alintuntunin ng proyekto ng elektron.