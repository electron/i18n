# Mga Isyu sa Electron

# Mga Isyu

* [Paano Makapag-ambag sa mga Isyu](#paano-makapag-ambag-sa-mga-isyu)
* [Paghingi ng Pangkalahatang Tulong](#paghihingi-ng-pangkalahatang-tulong)
* [Pagsusumite ng isang Ulat ukol sa Bug](#pagsusumite-ng-isang-ulat-ukol-sa-bug)
* [Pagta-triage ng isang Ulat ukol sa Bug](#pata-triage-ng-isang-ulat-ukol-sa-bug)
* [Paglulutas ng isang Ulat ukol sa Bug](#paglulutas-ng-isang-ulat-ukol-sa-bug)

## Paano Makapag-ambag sa mga Isyu

Para sa anumang isyu, mayroong tatlong pangunahing pamamaraan na ang isang indibidwal ay makapag-ambag:

1. Sa pamamagitan ng pagbukas nang isyu para sa talakayan: Kung naniniwala ka na nakahanap ka ng isang bagong bug sa Electron, kailangan mo itong ipaalam sa pamamagitan ng paggawa ng bagong isyu sa `electron/electron` na tagasubaybay ng isyu.
2. Sa pamamagitan nang pagtulong upang ma-triage ang isyu: Magagawa mo ito sa pagbibigay ng asistibong mga detalye (isang mapaparaming kaso ng pagsusuri na nagpapakita ng isang bug) o sa pamamagitan ng pagbibigay ng mga mungkahi upang malutas ang isyu.
3. Sa pamamagitan ng pagtulong sa paglutas ng isyu: Ito ay maaaring gawin sa pamamagitan ng pagpapakita na ang isyu ay hindi bug o ito ay naayos na; pero kadalasan, sa pamamagitan nang pagbukas ng isang pull request na nagbabago sa pinagmulan sa `electron/electron` sa isang konkreto at masusuring paraan.

## Paghingi ng Pangkalahatang Tulong

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

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

Hinihikayat ang mga taga-ambag na lutasin ng magkasama ang mga isyu at tulungan ang isat isa para makagawa ng progreso. Kung nakatagpo ka ng isang isyu na pakiramdam mo ay hindi wasto, o naglalaman ng maling impormasyon, ipaliwanag *bakit* nakakaramdam ka ng ganito nang may kasamang karagdagang sumusuportang konteksto, at handang maging kumbinsido na ikaw ay posibleng nagkamali. Sa paggawa nito, madalas naming maaabot ang tamang kinalalabasan sa mas mabilis na paraan.

## Paglulutas ng isang Ulat ukol sa Bug

Karamihan sa mga isyu ay nalulutas sa pamamagitan ng pagbukas ng isang pull request. Ang proseso sa pagbukas at pagsusuri sa isang pull request ay kapareho ng pagbukas at pag-triage ng mga isyu, pero nagdadala ito ng mga kainakailangang pagsusuri at pag-apruba na workflow na nagtitiyak na ang ipinanukalang mga pagbabago ay tumutugon sa minimal na kalidad at umiiral na alintuntunin ng proyekto ng Electron.