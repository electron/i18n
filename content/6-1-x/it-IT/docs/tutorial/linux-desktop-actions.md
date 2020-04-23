# Azioni Launcher Desktop Linux Personalizzate

Su molti ambienti Linux, puoi aggiungere voci personalizzate al suo Launcher modificando il file `.desktop`. Per la documentazione Unità canonica, vedi [Aggiungere Shortcut ad un launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Per dettagli su un'implementazione più generica, vedi la [Specificazione freedesktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Shortcut del launcher di Audaious:__

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

Generalmente parlando, le shortcut sono aggiunte fornendo una proprietà `Nome` ed una `Exec` per ogni voce del menu shortcut. L'unità eseguirà il campo `Exec` una volta cliccato dall'utente. Il formato è come segue:

```text
Azioni=AvviaPausa;Prossimo;Precedente

[Azione Desktop AvviaPausa]
Nome=Avvia-Pausa
Exec=audacious -t
MostraSoloIn=Unità;

[Azione Desktop Prossimo]
Nome=Prossimo
Exec=audacious -f
MostraSoloIn=Unità;

[Azione Desktop Precedente]
Nome=Precedente
Exec=audacious -r
MostraSoloIn=Unità;
```

Il metodo preferito dell'unità di dire alla tua app cosa fare è usare i parametri. Puoi trovarli nella tua app nella variabile glibale `processo.argv`.
