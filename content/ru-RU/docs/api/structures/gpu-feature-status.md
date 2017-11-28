# Объект GPUFeatureStatus

* `2d_canvas` String - холст
* `flash_3d` String - вспышка
* `flash_stage3d` String - вспышка Stage3D
* `flash_stage3d_baseline` String - базовый профиль вспышки Stage3D
* `gpu_compositing` String - композитный
* `multiple_raster_threads` String - несколько растровых потоков
* `native_gpu_memory_buffers` String - нативный GpuMemoryBuffers
* `rasterization` String - Растеризация
* `video_decode` Строка - Видео декодирование
* `video_encode` String - Видео кодирование
* `vpx_decode` String - VPx видео декодер
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Возможные значения:

* `disabled_software` - Только программная обработка. Аппаратное ускорение отключено (желтый)
* `disabled_off` - Отключено (красный)
* `disabled_off_ok` - Отключено (желтый)
* `unavailable_software` - Только программная обработка, аппаратное ускорение недоступно (желтый)
* `unavailable_off` - Недоступно (красный)
* `unavailable_off_ok` - Недоступно (желтый)
* `enabled_readback` - Аппаратное ускорение, но с пониженной производительностью (желтый)
* `enabled_force` - Аппаратное ускорение на всех страницах (зелёный)
* `enabled` - Аппаратное ускорение (зелёный)
* `enabled_on` - Включено (зелёный)
* `enabled_force_on` - Быстрое включение (зелёный)