# About Electron

[Electron](https://electronjs.org) एक ओपन सोर्स टूल है, जिसे GitHub द्वारा HTML, CSS और JavaScript के साथ क्रॉस-प्लेटफॉर्म डेस्कटॉप सॉफ्टवेयर बनाने के लिए विकसित किया गया है। Electron Chromium और Node.js को एक रनटाइम में जोड़कर काम करता है। Apps को Mac, Windows और Linux के लिए पैक किया जा सकता है।

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

</a>इलेक्ट्रॉन के योगदानकर्ताओं और रिलीज़ के बारे में और जानने के लिए पढ़ें या इलेक्ट्रॉन के साथ

 क्विक स्टार्ट गाइड </ 0> में निर्माण शुरू करें।</p> 



## कोर टीम और योगदानकर्ता

इलेक्ट्रॉन को GitHub में एक टीम के साथ-साथ समुदाय से  सक्रिय योगदानकर्ताओं </ 0> के एक समूह द्वारा मदद की जाती है। कुछ योगदानकर्ता व्यक्ति हैं, कुछ बड़ी कंपनियों में काम करते हैं जो इलेक्ट्रॉन पर काम कर रहे हैं। हम रखवाले के रूप में परियोजना में लगातार योगदानकर्ताओं को जोड़ने के लिए खुश हैं। इलेक्ट्रॉन के लिए योगदान  के बारे में और पढ़ें </ 0>।</p> 



## रिलीज़स

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.



### निर्भरता को अद्यतन करना

क्रोमियम का इलेक्ट्रॉन संस्करण आमतौर पर एक या दो सप्ताह के भीतर अपडेट किया जाता है, एक नया स्थिर क्रोमियम संस्करण जारी होने के बाद, उन्नयन में शामिल प्रयास के आधार पर।

जब Node.js का एक नया संस्करण जारी किया जाता है, तो इलेक्ट्रॉन अधिक स्थिर संस्करण में लाने के लिए अपग्रेड करने से पहले आमतौर पर एक महीने तक इंतजार करता है।

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.




### संस्करण

संस्करण के रूप में 2.0 इलेक्ट्रॉन  इस प्रकार है  semver= </ 1> </ 0>।
अधिकांश अनुप्रयोगों के लिए, और npm के किसी भी हाल के संस्करण का उपयोग करके, <code> $ npm install electron </ 0> चलाने से सही काम होगा।</p>

<p spaces-before="0">संस्करण अद्यतन प्रक्रिया हमारे <a href="electron-versioning.md"> संस्करण डॉक </ 0> में स्पष्ट रूप से विस्तृत है।</p>

<h3 spaces-before="0">LTS</h3>

<p spaces-before="0">इलेक्ट्रॉन के पुराने संस्करणों का दीर्घकालिक समर्थन वर्तमान में मौजूद नहीं है। यदि आपका इलेक्ट्रॉन का वर्तमान संस्करण आपके लिए काम करता है, तो आप उस पर तब तक बने रह सकते हैं, जब तक आप चाहें। यदि आप नई सुविधाओं का उपयोग करना चाहते हैं, जैसा कि वे आप में आते हैं तो उन्हें नए संस्करण में अपग्रेड करना चाहिए।</p>

<p spaces-before="0">एक बड़ा अद्यतन  <code> v1.0.0 </ 0> संस्करण के साथ आया था। यदि आप अभी तक इस संस्करण का उपयोग नहीं कर रहे हैं, तो आपको <code> <1> v1.0.0 </ 1> परिवर्तन </ 0> के बारे में अधिक पढ़ना चाहिए।</p>

<h2 spaces-before="0">कोर फिलॉसफी</h2>

<p spaces-before="0">इलेक्ट्रॉन को छोटा (फ़ाइल आकार) और टिकाऊ (निर्भरता और एपीआई के प्रसार) रखने के लिए परियोजना कोर प्रोजेक्ट के दायरे को सीमित करती है।</p>

<p spaces-before="0">उदाहरण के लिए, इलेक्ट्रॉन क्रोमियम के सभी के बजाय क्रोमियम के प्रतिपादन पुस्तकालय का उपयोग करता है। इससे क्रोमियम को अपग्रेड करना आसान हो जाता है लेकिन इसका अर्थ यह भी है कि Google क्रोम में पाए जाने वाले कुछ ब्राउज़र फीचर इलेक्ट्रॉन में मौजूद नहीं हैं।</p>

<p spaces-before="0">इलेक्ट्रॉन में जोड़े गए नए फीचर्स मुख्य रूप से देशी एपीआई होने चाहिए। यदि कोई विशेषता अपना स्वयं का Node.js मॉड्यूल हो सकता है, तो यह संभवतः होना चाहिए। समुदाय द्वारा निर्मित <a href="https://electronjs.org/community"> ​​इलेक्ट्रॉन उपकरण देखें </ 0>।</p>

<h2 spaces-before="0">इतिहास</h2>

<p spaces-before="0">नीचे इलेक्ट्रॉन के इतिहास में मील के पत्थर हैं।</p>

<table spaces-before="0" line-breaks-before="2">
<thead>
<tr>
  <th>:calender:</th>
  <th>:tada:</th>
</tr>
</thead>
<tbody>
<tr>
  <td><strong x-id="1">अप्रैल 2016</strong></td>
  <td><a href="https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45"> एटम शेल शुरू किया गया है </ 0>।</td>
</tr>
<tr>
  <td><strong x-id="1">मई 2016</strong></td>
  <td><a href="https://blog.atom.io/2014/05/06/atom-is-now-open-source.html"> एटम शेल को ओपनसोर्स </ 0> बनाया गया है।</td>
</tr>
<tr>
  <td><strong x-id="1">अप्रैल 2016</strong></td>
  <td><a href="https://github.com/electron/electron/pull/1389"> एटम शैल का पुनः नाम इलेक्ट्रॉन है </ 0>।</td>
</tr>
<tr>
  <td><strong x-id="1">मई 2016</strong></td>
  <td><a href="https://electronjs.org/blog/electron-1-0"> इलेक्ट्रॉन रिलीज़ <code> v1.0.0 </ 1> </ 0>।</td>
</tr>
<tr>
  <td><strong x-id="1">मई 2016</strong></td>
  <td>मैक ऐप स्टोर के साथ <a href="mac-app-store-submission-guide.md"> इलेक्ट्रॉन ऐप्स संगत </ 0>।</td>
</tr>
<tr>
  <td><strong x-id="1">अगस्त 2016</strong></td>
  <td><a href="windows-store-guide.md"> इलेक्ट्रॉन ऐप्स के लिए विंडोज स्टोर का समर्थन </ 0>।</td>
</tr>
</tbody>
</table>
