# Obiekt ThumbarButton

* `icon` [NativeImage](../native-image.md) - Wyświetlana miniatura w pasku narzędzi.
* `click` Function
* `tooltip` String (opcjonalnie) - Tekst etykiety przycisku.
* `flags` String[] (optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

`flags` jest tablicą, która może zawierać następujące `Stringi`:

* `enabled` - przycisk jest aktywny i dostępny dla użytkownika.
* `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
* `dismissonclick` - po kliknięciu przycisku miniatury okno zamyka się natychmiast.
* `nobackground` - nie rysuj obramowania przycisku, należy użyć tylko obrazka.
* `hidden` - przycisk nie jest widoczny dla użytkownika.
* `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.
