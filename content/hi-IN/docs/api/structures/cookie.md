# Cookie वस्तु

* `नाम` String - Cookie का नाम ।
* ` मान ` String - Cookie का मूल्य ।
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* ` मार्ग ` String (वैकल्पिक) - Cookie का मार्ग ।
* ` सुदृढ़ ` Boolean (वैकल्पिक) - क्या Cookie सुदृढ़ रूप में चिह्नित है ।
* ` httpOnly ` Boolean (वैकल्पिक) - क्या Cookie केवल HTTP के रूप में चिह्नित है ।
* ` सत्र ` Boolean (वैकल्पिक) - क्या Cookie एक सत्र Cookie या एक समय सीमा समाप्ति की तारीख के साथ एक निर्बाध Cookie है ।
* ` expirationDate ` Double (वैकल्पिक) - UNIX युग के बाद से सेकंड की संख्या के रूप में Cookie की समाप्ति की तारीख । सत्र Cookies के लिए प्रदान नहीं की गई ।