# Користувацькі Linux дії лаунчера робочого столу

На багатьох середовищах Linux ви можете додати власні записи до лаунчера , змінивши файл `.desktop`. Для документації Unity Canonical's дивіться [Додавання ярликів до Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Для деталей на більш загальній реалізації, дивіться [специфікацію freedesktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Ярлики лаунку Audacious:__

![зухвалість](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

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
