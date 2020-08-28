---
title: ब्राउज़रव्यू window.open() भेद्यता फिक्स
author: ckerr
date: '2019-02-03'
---

एक कोड भेद्यता की खोज की गई है जो नोड को बाल खिड़कियों में फिर से सक्षम करने की अनुमति देता है।

---

`सैंडबॉक्स के साथ एक ब्राउज़रव्यू खोलना: सच्ची` या `देशीविंडोओपन: ट्रू` और `नोडिग्रेशन: वेबकॉन्ट्स में झूठी` परिणाम हैं जहां `window.open` को बुलाया जा सकता है और नए खोले गए बच्चे की खिड़की `नोडइंटेग्रेशन सक्षम` होगी। यह भेद्यता इलेक्ट्रॉन के सभी समर्थित संस्करणों को प्रभावित करती है।

## Mitigation

हमने इलेक्ट्रॉन के नए संस्करण प्रकाशित किए हैं जिनमें इस भेद्यता के लिए सुधार शामिल हैं: [`2.0.17`](https://github.com/electron/electron/releases/tag/v2.0.17), [`3.0.15`](https://github.com/electron/electron/releases/tag/v3.0.15), [`3.1.3`](https://github.com/electron/electron/releases/tag/v3.1.3), [`4.0.4`](https://github.com/electron/electron/releases/tag/v4.0.4), और [`5.0.0-बीटा.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2)। हम सभी इलेक्ट्रॉन डेवलपर्स को अपने ऐप्स को तुरंत नवीनतम स्थिर संस्करण में अपडेट करने के लिए प्रोत्साहित करते हैं।

यदि किसी कारण से आप अपने इलेक्ट्रॉन संस्करण को अपग्रेड करने में असमर्थ हैं, तो आप सभी बाल वेब सामग्री को अक्षम करके इस समस्या को कम कर सकते हैं:

```javascript
view.webContents.on ('-add-new-contents', e => e.preventDefault ());
```

## Further Information

यह भेद्यता पाई गई और [पामरल](https://github.com/PalmerAL)द्वारा इलेक्ट्रॉन परियोजना को जिम्मेदारी से सूचित किया गया ।

To learn more about best practices for keeping your Electron apps secure, see our [security tutorial](https://electronjs.org/docs/tutorial/security).

If you wish to report a vulnerability in Electron, email security@electronjs.org.
