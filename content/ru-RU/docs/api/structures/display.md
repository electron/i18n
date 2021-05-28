# Объект Display

* `id` Number - уникальный числовой идентификатор дисплея.
* `rotation` Number - число, которое представляет собой угол поворота экрана. Может быть 0, 90, 180, 270.
* `scaleFactor` Number - матричный коэффициент пиксельного масштабирования выходного устройства.
* `touchSupport` String - может быть `available`, `unavailable`, `unknown`.
* `monochrome` Boolean - монохромный дисплей или нет.
* `accelerometerSupport` String - может быть `available`, `unavailable` или `unknown`.
* `colorSpace` String -  представляет пространство цвета (трехмерный объект, который содержит все реализуемые цветовые комбинации) с целью преобразования цвета
* `colorDepth` Number - количество битов на пиксель.
* `depthPerComponent` Number - количество битов на цветовой компонент.
* `displayFrequency` Number - частота обновления дисплея.
* `bounds` [Rectangle](rectangle.md) - границы display в DIP points.
* `size` [Size](size.md)
* `workArea` [Rectangle](rectangle.md) - рабочая область display в DIP points.
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` для внутреннего дисплея и `false` для внешнего дисплея

`Display` - объект представляет физический дисплей, подключенный к системе. Фейковый `Display` может существовать в безголовой системе, или `Display` может соответствовать удаленному виртуальному дисплею.
