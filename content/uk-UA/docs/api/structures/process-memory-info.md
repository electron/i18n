# Об'єкт ProcessMemoryInfo

* `residentSet` Integer *Linux* та *Windows* - Кількість пам'яті в кілобайтах, яка наразі прикріплена до фактичної фізичної пам'яті ОЗП.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.