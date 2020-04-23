# Об'єкт ProcessMemoryInfo

* `residentSet` Integer _Linux_ and _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - Кількість пам'яті в кілобайтах, яка не використовується іншими процесами, такими як JS купа чи HTML контент.
* `shared` Integer - Кількість пам'яті в кілобайтах, що використовується іншими процесами, типово пам'ять спожита кодом Electron.
