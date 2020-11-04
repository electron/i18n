# Custom Linux Desktop Launcher Acties

In veel Linux omgevingen kunt u aangepaste items toevoegen aan de launcher door het `.desktop` bestand aan te passen. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Launcher snelkoppelingen van Audacious:__

![stoutmoedig][3]

Over het algemeen worden snelkoppelingen toegevoegd door het geven van een `naam` en `Exec` eigenschap voor elk item in het snelkoppelingenmenu. Eenheid zal het `Exec` veld uitvoeren eenmaal geklikt door de gebruiker. Het formaat is als volgt:

```plaintext
Acties =PlayPause;Volgende;Vorige

[Desktop Action PlayPause]
Naam=Play-Pause
Exec=audacious -t
Only ShowIn=Unity;

[Desktop Action Next]
Name=Next
Exec=audous -f
OnlyShowIn=Unity;

[Desktop Action Previous]
Naam=Vorige
Exec=audieuze -r
OnlyShowIn=eenheid;
```

Eenheid is de beste manier om uw toepassing te vertellen wat te doen is parameters gebruiken. Deze vind je in je app in de globale variabele `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
