# विंडोज स्टोर गाइड

विंडोज 10 से, पुराने पर बढ़िया विन32 एग्जिक्युटेबल को एक और भाई मिल गया है: वैश्विक विंडोज प्लेटफार्म | नया `.एप्पएक्स` फॉर्मेट न केवल कई सारे नये शक्तिशाली ऐपीआई जैसे कि कोरटाना या पुश नोटीफिकेशन की सुविधा देता है, पर विंडोज स्टोर के द्वारा, इंस्टालेशन और अपडेटिंग भी सरल बनाता है |

माइक्रोसॉफ्ट ने [एक औज़ार विकसित किया था जो इलेक्ट्रॉन एप्प्स को `.एप्पएक्स` पैकेजेस की तरह कम्पायल करता है](https://github.com/catalystcode/electron-windows-store), जिससे कि डेवलपर्स को नये एप्लीकेशन मॉडल में मौज़ूद कुछ अच्छी चीज़े इस्तेमाल करने की सुविधा मिलती है | यह गाइड आपको बताएगी कि इसे कैसे इस्तेमाल करना है - और इलेक्ट्रॉन एप्पएक्स पैकेज की क्या-क्या क्षमतायें और सीमायें है |

## पृष्ठभूमि और आवश्यकतायें

विंडोज 10 का "सालगिरह अपडेट" विन32 `.ईएक्सई` लाइब्रेरीज को एक वर्चुअलाइज़ेड फाइलसिस्टम और रजिस्ट्री के साथ, एक साथ लांच करने की क्षमता प्रदान करता है | दोनों ही कंपाइलेशन के दौरान एप्प और इंस्टालर को विंडोज कंटेनर के अन्दर चलाने से बनाये जाते हैं, जिससे कि विंडोज यह पता लगा सके कि इंस्टालेशन के दौरान ऑपरेटिंग सिस्टम में असल में कौन कौन से संशोधन हुए है | एक्सीक्यूटेबल को एक वर्चुअल फाइलसिस्टम और एक वर्चुअल रजिस्ट्री के साथ जोड़ने से विंडोज को 1-क्लिक इंस्टालेशन और अनइंस्टालेशन शुरू करने की सुविधा मिलती है |

इसके अलावा, ईएक्सई एप्पएक्स मॉडल के अंदर शुरू होती है - यानी कि यह वैश्विक विंडोज प्लेटफार्म में मौज़ूद बहुत सी ऐपीआई का इस्तेमाल कर सकता है | और भी ज्यादा क्षमताओं को पाने के लिए, एक इलेक्ट्रॉन एप्प एक अदृश्य युडब्ल्यूपी बैकग्राउंड टास्क के साथ जुड़ कर `ईएक्सई` के साथ लांच हो सकती है - कुछ हद तक एक वफादार साथी की तरह जो बैकग्राउंड में टास्क चला सकता है, पुश नोटिफिकेशन प्राप्त कर सकता है, या दूसरी युडब्ल्यूपी एप्लीकेशनस से संपर्क साध सकता है |

किसी भी मौजूदा इलेक्ट्रॉन एप्प को क्म्पाय्ल करने के लिए, यह सुनिश्चित कर लें की आप निम्नलिखित आवश्यकताओं को पूरा करते हों:

* विंडोज 10, सालगिरह अपडेट के साथ (2 अगस्त, 2016 को जारी)
* विंडोज 10 एसडीके, [यहाँ से डाउनलोड करें](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* न्यूनतम नोड 4 (जाँचने के लिए, `node -v` चलायें)

उसके बाद, इनस्टॉल करें `इलेक्ट्रॉन-विंडोज-स्टोर` सीएलआई:

```sh
npm install -g electron-windows-store
```

## पहला चरण: अपनी इलेक्ट्रॉन एप्लीकेशन पैकेज करें

[इलेक्ट्रॉन-पैकेजर](https://github.com/electron-userland/electron-packager) (या ऐसे ही किसी दुसरे औज़ार) से एप्लीकेशन पैकेज करें | Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will just increase your application's size.

The output should look roughly like this:

```text
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── snapshot_blob.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Step 2: Running electron-windows-store

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Once executed, the tool goes to work: It accepts your Electron app as an input, flattening the `node_modules`. Then, it archives your application as `app.zip`. Using an installer and a Windows Container, the tool creates an "expanded" AppX package - including the Windows Application Manifest (`AppXManifest.xml`) as well as the virtual file system and the virtual registry inside your output folder.

Once the expanded AppX files are created, the tool uses the Windows App Packager (`MakeAppx.exe`) to create a single-file AppX package from those files on disk. Finally, the tool can be used to create a trusted certificate on your computer to sign the new AppX package. With the signed AppX package, the CLI can also automatically install the package on your machine.

## Step 3: Using the AppX Package

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to just install your package by double-clicking it, so a submission to the store might not be necessary if you're simply looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.