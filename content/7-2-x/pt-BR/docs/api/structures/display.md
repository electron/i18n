# Objeto `Display`

* `id` Number - Identificador único associado ao objeto.
* `rotation` Number - Representa a rotação da janela em graus no sentido horário. Pode ser 0, 90, 180 e 270.
* `scaleFactor` Number - Fator de escala de pixels do dispositivo de saída.
* `touchSupport` String - Pode ser `available`, `unavailable` ou `unknown`.
* `monochrome` Boolean - se o display é ou não um display monocromático.
* `accelerometerSupport` String - Pode ser `available`, `unavailable`, `unknown`.
* `colorSpace` String -  representa um espaço de cor (objeto tridimensional que contém todas as combinações de cor possíveis) para o propósito de conversões de cores
* `colorDepth` Number - O número de bits por pixel.
* `depthPerComponent` Number - O número de bits por componente de cor.
* `bounds` [Retângulo](rectangle.md)
* `size` [Tamanho](size.md)
* `workArea` [Retângulo](rectangle.md)
* `workAreaSize` [Tamanho](size.md)
* `internal` Boolean - `true` para um display interno e `false` para um display externo

O objeto `Display` representa o display físico conectado ao sistema. Um `Display` falso pode existir em um sistema sem interface gráfica, ou um `Display` pode corresponder a um display virtual remoto.
