# Ang Teknikal na Pagkakaiba ng Elektron at NW.js (dating node-webkit)

**Paalala: Atom Shell ang dating tawag sa Electron.**

Katulad ng NW.js, ang Elektron ay nagbibigay disenyo upang makasulat sa aplikasyon ng desktop kasama ang Javascript at HTML na may pinagsama-samang Node na syang magiging daan upang makapasok sa mababang lebel ng sistema galing sa pahina ng web.

Ngunit mayroon ding mahalagang pagkakaiba ang dalawang proyekto kung saan ang Elektron ay tuluyang hihiwalay sa produkto na galing sa NW.js:

**1. Pagpasok sa Aplikasyon**

Sa NW.js, ang pangunahing pasukan ng aplikasyon ay ang pahina ng web o ng Javascript. Kailangang tukuyin ang html o js file sa `package.json` at nakabukas sa browser window bilang pina-aplikasyon sa window (kung sakaling ang html ang pinagmulan) ang script ay naisakatuparan.

Sa Elektron, ang pinagmulan ay JavaScript script. Sa halip na magbigay ng direktang URL, kailangang bumuo ng manu-manong browser window at isalang ang HTML file gamit ang API. Kinakailangan ding makinig sa kaganapan ng window upang makapagpasya kung kailan lalabas sa aplikasyon.

Ang Elektron ay gumagana ng magkasing-tulad ng sa Node.js. Ang APIs ng Elektron ay nasa mas mababang lebel upang magamit ito para masukat ang browser na nasa [PhantomJS](http://phantomjs.org/).

**2. Paglikha ng Sistema**

Upang maiwasan ang pagiging kumplikado sa paglikha ng lahat ng Chromium, ang Elektron ay gumagamit ng [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) Chromium's Content API. `libchromiumcontent` ay mag-isang ibinabahagi ng library kung saan nakapaloob ang Chromium Content modyul at lahat ng nakaasa dito. Ang mga gumagamit nito ay hindi na kinakailangan ng isang malakas na makina upang makagawa ng Elektron.

**3. Pinagsama-samang Node**

Sa NW.js, ang pinagsama-samang Node sa pahina ng web ay kinakailangang takpan ng Chromium upang ito'y gumana, habang sa Elektron, tayo ay pumipili ng iba't-ibang paraan para mapagsama-sama ang libuv loop kasama ang bawat mensahe ng platform sa loop upang maiwasan ang walang pahintulot na paggamit sa Chromium. Tingnan ang [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code kung paano ito nangyayari.

**4. Iba't-ibang Konteksto**

Kung ikaw isang bihasang gumagamit ng NW.js, ikaw ay dapat maging pamilyar sa konsepto ng konteksto ng Node at web. Ang konseptong ito ay naimbento sa kung paano ang NW.js ay naisakatuparan.

Sa pamamagitan ng paggamit ng multi-context<0/> na itinatampok ng Node, ang Elektron ay hindi pa nagpapakilala ng bagong konteksto ng Javascript sa pahina ng web.</p> 

Paalala: Ang NW.js ay hindi pinilit at kusang-loob na nagbigay suporta sa multi-context mula nang 0.13.