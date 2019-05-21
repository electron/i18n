# Objeto `Display`

* `id` Number - Identificador único associado ao objeto.
* `rotation` Number - Representa a rotação da janela em graus no sentido horário. Pode ser 0, 90, 180 e 270.
* `scaleFactor` Number - Fator de escala de pixels do dispositivo de saída.
* `touchSupport` String - Pode ser `available`, `unavailable` ou `unknown`.
* `bounds` [Rectangle](rectangle.md)
* `size` [Tamanho](size.md)
* `workArea` [Rectangle](rectangle.md)
* `workAreaSize` [Size](size.md)

O objeto `Display` representa o display físico conectado ao sistema. Um `Display` falso pode existir em um sistema sem interface gráfica, ou um `Display` pode corresponder a um display virtual remoto.