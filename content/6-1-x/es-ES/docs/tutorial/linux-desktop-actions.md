# Acciones personalizadas de arranque de escritorio de Linux

En muchos entornos de escritorio Linux, puede agregar entradas personalizadas al lanzador modificando el archivo `.desktop`. Para la documentación de Canonical Unity, vea [Agregar accesos directos a un lanzador](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Para obtener más información sobre una implementación más genérica, vea la [especificación de freedesktop.org](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Accesos directos del Launcher de Audacious:__

![audaz](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

En términos generales, se añaden accesos directos proporcionando un `name` y la propiedad `Exec` para cada entrada en el menú de accesos directos. Unity ejecutará el campo `Exec` cuando el usuario haga clic. El formato es el siguiente:

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

La forma preferida de Unity de decirle a su aplicación qué hacer es usando parámetros. Puede encontrarlos en su aplicación en la variable global `process.argv`.
