# Desktop Launcher Actions (Linux)

## Descripción general

En muchos entornos Linux, puede agregar entradas personalizadas al lanzador del sistema modificando el archivo `.desktop`. Para la documentación de Unity de Canonical, vea [Agregar atajos al Lanzador][unity-launcher]. Para obtener detalles sobre una implementación más genérica, vea la [freedesktop.org Especificación][spec].

![audaz][3]

> NOTA: La captura de la pantalla anterior es un ejemplo de atajos de lanzador en el reproductor de audio Audacious

Para crear un atajo, necesita proveer las propiedades `Name` y `Exec` para la entrada que quieres agregar al atajo del menú. Unity ejecutará el comando definido en el campo `Exec` después que el usuario pulse en el elemento del menú de acceso directo. Un ejemplo del archivo `.desktop` puede lucir de la siguiente manera:

```plaintext
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

La forma preferida de Unity para instruir a su aplicación sobre qué hacer es usar parámetros. Puedes encontrarlos en tu aplicación en la variable global `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
