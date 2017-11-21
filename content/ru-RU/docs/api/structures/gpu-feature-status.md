# GPUFeatureStatus Объект

* `2d_canvas` String - Холст
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Flash Stage3D Базовый профиль
* `gpu_compositing` String - Композитный
* `multiple_raster_threads` String - Несколько растровых потоков
* `native_gpu_memory_buffers` String - Native GpuMemoryBuffers
* `rasterization` String - Растеризация
* `video_decode` Строка - Видео декодирование
* `video_encode` String - Видео кодирование
* `vpx_decode` String - VPx видео декодер
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Возможные значения:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Disabled (red)
* `disabled_off_ok` - Disabled (yellow)
* `unavailable_software` - Software only, hardware acceleration unavailable (yellow)
* `unavailable_off` - Unavailable (red)
* `unavailable_off_ok` - Unavailable (yellow)
* `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Enabled (green)
* `enabled_force_on` - Force enabled (green)