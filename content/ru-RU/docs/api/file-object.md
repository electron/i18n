# Объект `File`

> Использует `File` из HTML5 API для найтивной работы с файлами в файловой системе.

Файловый интерфейс DOM предоставляет абстракции над файловой системой, чтобы позволить пользователям работать с ней с помощью файлового API HTML5. Electron добавил атрибут `path` к интерфейсу `File`, который предоставляет настоящий путь к файлу в файловой системе.

Пример получения настоящего пути из перетаскиваемого в приложение файла:

```html
<div id="holder">
  Перетащите файл здесь
</div>

<script>
  document.addEventListener ('drop', e)>
    e.preventDefault ();
    e.stopPropagation ();

    for (const f e.dataTransfer.files) - консоль
      .log ('File (s) вы тащили сюда: ', f.path)
    -
  );
  document.addEventListener ('dragover', (e) ->
    e.preventDefault();
    e.stopPropagation ();
  );
</script>
```
