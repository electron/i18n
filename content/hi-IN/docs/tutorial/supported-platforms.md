# समर्थित प्लेटफ़ॉर्म

निम्नलिखित प्लेटफार्म इलेक्ट्रॉन द्वारा समर्थित हैं:

### मैकओएस

मैकओएस के लिए केवल 64-बिट बाइनरिस प्रदान की गयी हैं, और न्यूनतम मैकओएस समर्थित संस्करण मैकओएस 10.9 है |

### विंडोज

विंडोज 7 और उसके बाद के ओएस समर्थित हैं | पुराने ओएस समर्थित नहीं हैं (न ही वे काम करते हैं) |

विंडोज के लिए दोनों `ia32` (`x86`) और `x64` (`amd64`) बाइनरिस प्रदान की गयी हैं |. कृपया ध्यान दें, विंडोज का `ARM` संस्करण अभी समर्थित नहीं है |

### लिनक्स

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

एक वितरण पर पूर्वनिर्मित बाइनरी चल सकती है या नहीं, यह इस बात पर निर्भर करता है कि क्या वितरण में वे लाइब्रेरिस हैं जिनसे इलेक्ट्रॉन निर्माण प्लेटफार्म पर जुड़ा है, इसलिए उबुन्तु 12.04 के काम करने की गारंटी है, पर निम्नलिखित प्लेटफार्म भी इलेक्ट्रॉन की पूर्वनिर्मित बाइनरिस चलाने में सक्षम है:

* उबुन्तु 12.04 और उसके बाद के संस्करण
* फेडोरा 21
* डेबियन 8