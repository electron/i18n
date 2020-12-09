# Объект GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Базовый профиль Flash Stage3D.
* `gpu_compositing` String - Композитный.
* `multiple_raster_threads` String - Несколько растровых потоков.
* `native_gpu_memory_buffers` String - Нативный GpuMemoryBuffers.
* `rasterization` String - Растеризация.
* `video_decode` String - Видео-декодирование.
* `video_encode` String - Видео-кодирование.
* `vpx_decode` String - VPx видео-декодер.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Возможные значения:

* `disabled_software` - Только программная обработка. Аппаратное ускорение отключено (жёлтый)
* `disabled_off` - Отключено (красный)
* `disabled_off_ok` - Отключено (жёлтый)
* `unavailable_software` - Только программная обработка, аппаратное ускорение недоступно (жёлтый)
* `unavailable_off` - Недоступно (красный)
* `unavailable_off_ok` - Недоступно (жёлтый)
* `enabled_readback` - Аппаратное ускорение, но с пониженной производительностью (жёлтый)
* `enabled_force` - Аппаратное ускорение на всех страницах (зелёный)
* `enabled` - Аппаратное ускорение (зелёный)
* `enabled_on` - Включено (зелёный)
* `enabled_force_on` - Быстрое включение (зелёный)
