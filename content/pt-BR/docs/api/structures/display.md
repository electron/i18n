# Objeto `Display`

* `id` Number - Identificador único associado ao objeto.
* `rotation` Number - Representa a rotação da janela em graus no sentido horário. Pode ser 0, 90, 180 e 270.
* `scaleFactor` Number - Fator de escala de pixels do dispositivo de saída.
* `touchSupport` String - Pode ser `available`, `unavailable` ou `unknown`.
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String - represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md)
* `size` [Tamanho](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)
* `internal` Boolean - `true` for an internal display and `false` for an external display

O objeto `Display` representa o display físico conectado ao sistema. Um `Display` falso pode existir em um sistema sem interface gráfica, ou um `Display` pode corresponder a um display virtual remoto.