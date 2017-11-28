# Объект GPUFeatureStatus

* `2d_canvas` String - холст
* `flash_3d` String - вспышка
* `flash_stage3d` String - вспышка Stage3D
* `flash_stage3d_baseline` String - базовый профиль вспышки Stage3D
* `gpu_compositing` String - композитный
* `multiple_raster_threads` String - несколько растровых потоков
* `native_gpu_memory_buffers` String - нативный GpuMemoryBuffers
* `rasterization` String - растеризация
* `video_decode` Строка - видео декодирование
* `video_encode` String - видео кодирование
* `vpx_decode` String - VPx видео декодер
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Возможные значения:

* `disabled_software` - только программная обработка. Аппаратное ускорение отключено (желтый)
* `disabled_off` - отключено (красный)
* `disabled_off_ok` - отключено (желтый)
* `unavailable_software` - только программная обработка, аппаратное ускорение недоступно (желтый)
* `unavailable_off` - недоступно (красный)
* `unavailable_off_ok` - недоступно (желтый)
* `enabled_readback` - аппаратное ускорение, но с пониженной производительностью (желтый)
* `enabled_force` - аппаратное ускорение на всех страницах (зелёный)
* `enabled` - аппаратное ускорение (зелёный)
* `enabled_on` - включено (зелёный)
* `enabled_force_on` - быстрое включение (зелёный)