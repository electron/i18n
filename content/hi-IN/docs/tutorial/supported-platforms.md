# समर्थित प्लेटफ़ॉर्म

निम्नलिखित प्लेटफार्म इलेक्ट्रॉन द्वारा समर्थित हैं:

### मैकओएस

मैकओएस के लिए केवल 64-बिट बाइनरिस प्रदान की गयी हैं, और न्यूनतम मैकओएस समर्थित संस्करण मैकओएस 10.9 है |

### विंडोज

विंडोज 7 और उसके बाद के ओएस समर्थित हैं | पुराने ओएस समर्थित नहीं हैं (न ही वे काम करते हैं) |

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Please note, the `ARM` version of Windows is not supported for now.

### Linux

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `arm` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 12.04 and later
* Fedora 21
* Debian 8