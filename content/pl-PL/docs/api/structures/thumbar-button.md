# Obiekt ThumbarButton

* `icon` [NativeImage](../native-image.md) - Wyświetlana miniatura w pasku narzędzi.
* `click` Function
* `tooltip` String (opcjonalnie) - Tekst etykiety przycisku.
* `flags` String[] (opcjonalnie) - Kontroluje określone stany oraz zachowania przycisku. Domyślnie jest ustawione na `['enabled']`.

`flags` jest tablicą, która może zawierać następujące `Stringi`:

* `enabled` - przycisk jest aktywny i dostępny dla użytkownika.
* `disabled` - przycisk jest wyłączony. Jest wyświetlany, ale ma wizualny stan wskazujący, że nie będzie reagować na działania użytkownika.
* `dismissonclick` - po kliknięciu przycisku miniatury okno zamyka natychmiast.
* `nobackground` - nie rysuj obramowania przycisku, należy użyć tylko obrazka.
* `hidden` - przycisk nie jest widoczny dla użytkownika.
* `noninteractive` - przycisk jest włączony, ale nie interaktywnie; stan przyciśnięcia nie jest rysowany. Wartość ta jest przeznaczona dla wystąpienia, gdzie przycisk jest używany w powiadomieniu.