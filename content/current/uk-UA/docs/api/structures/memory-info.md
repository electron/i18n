# Об'єкт MemoryInfo

* `workingSetSize` Integer - Кількість пам'яті, що прив'язана до фактичної фізичної RAM в даний момент.
* `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM.
* `privateBytes` Integer (optional) _Windows_ - The amount of memory not shared by other processes, such as JS heap or HTML content.

Зверніть увагу, що всі статистичні дані представлені в кілобайтах.
