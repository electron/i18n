# Об'єкт MemoryInfo

* `pid` Integer - Ідентифікатор процесу.
* `workingSetSize` Integer - Кількість пам'яті, що прив'язана до фактичної фізичної RAM в даний момент.
* `peakWorkingSetSize` Integer - Максимальна кількість пам'яті, що була коли-небудь прив'язана до фактичної фізичної RAM. На macOS це значення завжди буде 0.
* `privateBytes` Integer - Кількість пам'яті, яка не використовується іншими процесами, такими як JS купа чи HTML контент.
* `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Зверніть увагу, що всі статистичні дані представлені в кілобайтах.