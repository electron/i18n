# Ang Teknikal na Pagkakaiba ng Elektron at NW.js (dating node-webkit)

**Paalala: Atom Shell ang dating tawag sa Electron.**

Katulad ng NW.js, ang Elektron ay nagbibigay disenyo upang makasulat sa aplikasyon ng desktop kasama ang Javascript at HTML na may pinagsama-samang Node na syang magiging daan upang makapasok sa mababang lebel ng sistema galing sa pahina ng web.

Ngunit mayroon ding mahalagang pagkakaiba ang dalawang proyekto kung saan ang Elektron ay tuluyang hihiwalay sa produkto na galing sa NW.js:

**1. Pagpasok sa Aplikasyon**

Sa NW.js, ang pangunahing pasukan ng aplikasyon ay ang pahina ng web o ng Javascript. Kailangang tukuyin ang html o js file sa `package.json` at nakabukas sa browser window bilang pina-aplikasyon sa window (kung sakaling ang html ang pinagmulan) ang script ay naisakatuparan.

Sa Elektron, ang pinagmulan ay JavaScript script. Sa halip na magbigay ng direktang URL, kailangang bumuo ng manu-manong browser window at isalang ang HTML file gamit ang API. Kinakailangan ding makinig sa kaganapan ng window upang makapagpasya kung kailan lalabas sa aplikasyon.

Ang Elektron ay gumagana ng magkasing-tulad ng sa Node.js. Ang APIs ng Elektron ay nasa mas mababang lebel upang magamit ito para masukat ang browser na nasa [PhantomJS](http://phantomjs.org/).

**2. Paglikha ng Sistema**

Upang maiwasan ang pagiging kumplikado sa paglikha ng lahat ng Chromium, ang Elektron ay gumagamit ng [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) Chromium's Content API. `libchromiumcontent` ay mag-isang ibinabahagi ng library kung saan nakapaloob ang Chromium Content modyul at lahat ng nakaasa dito. Users don't need a powerful machine to build Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.