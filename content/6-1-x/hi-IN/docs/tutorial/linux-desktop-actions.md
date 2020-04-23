# कस्टम लिनक्स डेस्कटॉप लांचर क्रियायें

काफी सारे लिनक्स वातावरणों में, आप `.desktop` फाइल में बदलाव कर उनके लांचर में कस्टम एंट्रीज़ जोड़ सकते हैं | कैनोनिकल की यूनिटी दस्तावेजीकरण के लिए, [एक लांचर में शोर्टकट्स जोड़ना](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher) देखें | एक साधारण कार्यान्वयन पर और अधिक जानकारी के लिए, [freedesktop.org स्पेसिफिकेशन](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html) देखें |

__Audacious की लांचर शोर्टकट्स:__

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

सामान्यतः, हर एंट्री के लिए एक `Name` और `Exec` प्रॉपर्टी प्रदान कर शोर्टकट्स को शोर्टकट्स मेन्यु में डाला जाता है | एक बार उपयोगकर्ता के क्लिक करने के बाद यूनिटी `Exec` फील्ड को चला देगी | इसका फॉर्मेट निम्नलिखित है:

```text
Actions=PlayPause;Next;Previous

[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t
OnlyShowIn=Unity;

[Desktop Action Next]
Name=Next
Exec=audacious -f
OnlyShowIn=Unity;

[Desktop Action Previous]
Name=Previous
Exec=audacious -r
OnlyShowIn=Unity;
```

आपकी एप्लीकेशन को क्या करना है, इसका निर्देश देने के लिए यूनिटी का पसंदीदा तरीका है पैरामीटर्स का इस्तेमाल करना | आप इन्हें अपनी एप्प में `process.argv` नामक वैश्विक वेरिएबल में पा सकते हैं |
