# GPUFeatureStatus Объект

* `2d_canvas` String - Холст
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Flash Stage3D Базовый профиль
* `gpu_compositing` String - Композитный
* `multiple_raster_threads` String - Несколько растровых потоков
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
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Enabled (green)
* `enabled_force_on` - Force enabled (green)