# Acțiuni Linux Desktop Launcher personalizate

În multe medii Linux, puteți adăuga intrări personalizate în launcherul modificând fișierul `.desktop`. Pentru documentația Unity a Canonicalului, a se vedea [Adăugând scurtături la Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Pentru detalii despre o implementare mai generică, a se vedea [specificația freedesktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Scurtături lansatoare Audaciou:__

![îndrăzneț](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

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
