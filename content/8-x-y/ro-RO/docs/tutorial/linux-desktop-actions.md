# Acțiuni Linux Desktop Launcher personalizate

În multe medii Linux, puteți adăuga intrări personalizate în launcherul modificând fișierul `.desktop`. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Scurtături lansatoare Audaciou:__

![îndrăzneț][3]

În general vorbind, scurtăturile sunt adăugate prin furnizarea unei proprietăți `Nume` și `Exec` pentru fiecare intrare din meniul de comenzi rapide. Unitatea va executa câmpul `Exec` odată ce este apăsat de utilizator. Formatul este următorul:

```plaintext
Acțiuni=PlayPause;Înainte;Înainte

[Acțiune Desktop PlayPause]
Nume=Play-Pause
Exec=audacos -t
OnlyShowIn=Unitate;

[Acțiune Desktop Next]
Nume=Next
Exec=audacious -f
OnlyShowIn=Unitate;

[Acțiune Desktop anterior]
Nume=anterior
Exec=îndrăzneț -r
OnlyShowIn=Unitate;
```

Modul preferat de unitate pentru a spune aplicației ce să facă este să folosească parametrii . Poți găsi acestea în aplicația ta în variabila globală `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
