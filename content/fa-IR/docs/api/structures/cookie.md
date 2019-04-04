# شئ کوکی

* `نام` رشته - نامِ کوکی.
* `مقدار` رشته - مقدارِ کوکی.
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `مسیر` رشته (اختیاری) - مسیرِ کوکی.
* `امن` بولین (صحیح یا غلط) (اختیاری) - کوکی به عنوان «امن» نشانه گذاری شود یا نه.
* ` http فقط ` بولین (صحیح یا غلط) (اختیاری) - کوکی به عنوان فقط http نشانه گذاری شود یا نه.
* `نشست` بولین (صحیح یا غلط) (اختیاری) - کوکی نشست است یا ثابت است کوکی با یک تاریخ انقضا.
* `تاریخ انقضا` عدد (اختیاری) - تاریخ انقضای کوکی به عدد بر حسب ثانیه. برای نشست ها تدارک دیده نشده است.