# Користувацькі Linux дії лаунчера робочого столу

На багатьох середовищах Linux ви можете додати власні записи до лаунчера , змінивши файл `.desktop`. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Ярлики лаунку Audacious:__

![зухвалість][3]

Generally speaking, shortcuts are added by providing a `Name` and `Exec` property for each entry in the shortcuts menu. Unity виконає `Exec поле` після натиснення користувачем. Формат наступним чином:

```plaintext
Actions=PlayPause;Next;Попередня

[Дія PlayPause]
Ім'я=Play-Pause
Exec=audacious -t
Тільки на:

[Наступна дія робочого столу]
Name=Next
Exec=audacious -f
OnlyShowIn;

[Попередня дія робочого столу]
Назва=Попередньо
Виконавчий -r
Тільки ShowIn;
```

Unity Кращий спосіб сказати вашому застосунку що робити це використовувати параметри. Це у вашій програмі можна знайти у глобальній змінній `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
