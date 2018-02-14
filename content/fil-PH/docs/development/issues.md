# Mga isyu ng Elektron

# Isyu

* [Kung paano maka pag-ambag sa isyu](#how-to-contribute-in-issues)
* [Humingi nang pangkalahatang tulong](#asking-for-general-help)
* [Pagsusumite sa bug report](#submitting-a-bug-report)
* [Pagsasagawa sa bug report](#triaging-a-bug-report)
* [Paglutas sa bug report](#resolving-a-bug-report)

## Kung paano maka pag-ambag sa isyu

Para sa anumang isyu, merong mga panimula at tatlong pamamaraan na idibidwal na maka pag-ambag:

1. Sa pamamagitan nang pagbukas nang isyu para sa talakayan: Kung maniniwala ka na nahanap mo na ang bagong bug sa electron, kailangan mo itong iulat sa pamamagitan nang paggawa nang bagong isyu sa Ang`elektron/elektron`isyu tracker.
2. Sa pamamagitan nang pag tulong para sa traige ang isyu: Magagawa mo ito alinman sa pagbibigay nang tulong sa mga detalye (maaaring kopyahin nang pagsusulit na kaso na maipakita nang isang bug) o sa pamamagitan nang pagbibigay mungkahi sa address ang isyu.
3. Sa pamamagitan nang pagtulong upang malutas ang issue: Ito ay maaaring gawin sa pagpakita na ang isyu ay hindi bug o ito ay naayos na; pero kadalasan, sa pamamagitan nang pagbukas sa hilahin ang kahilingan na makapagbabago nang pinagmulan sa `elektron/elektron` sa isang kongreto at pagsusuring paraan.

## Humingi nang pangkalahatang tulong

Dahil ang antas nang aktibidad nasa `elektron/elektron` imbakan ay napakataas, mga tanong o hiling para sa pangkalahatang tulong sa paggamit nang elektron ay dapat na direktang sa [kommunidad malubay na channel](https://atomio.slack.com) o ang [forum](https://discuss.atom.io/c/electron).

## Pagsusumite sa bug report

Kapag nagbukas kanang bagong isyu sa `elektron/elektron` isyu tracker, mga gumagamit ay maipapakita na may isang template na dapat mapunan.

```markdown
&It;!--
Salamat sa pagbukas nang isyu! Ilang bagay na dapat tandaan:

- Ang isyu tracker ay para sa bugs at tampok na hiling.
Bago mag ulat ng isang bug, pakiusap subukan mag reproduce nang iyong isyu laban sa pinakabagong  bersyon ng Elektron.
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

Kadalasan sa mga isyu ay nalutas sa pamamagitan ng pagbukas ng hilahin ang kahilingan. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.