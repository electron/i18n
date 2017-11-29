# Об'єкт GPUFeatureStatus

* `2d_canvas` String - Полотно
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Профіль Flash Stage3D Baseline
* `gpu_compositing` String - Компонування
* `multiple_raster_threads` String - Растрова багатопоточність
* `native_gpu_memory_buffers` String - Нативний GpuMemoryBuffers
* `rasterization` String - Растеризація
* `video_decode` String - Декодування Відео
* `video_encode` String - Кодування відео
* `vpx_decode` String - VPx дековання відео
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Можливі значення:

* `disabled_software` - Тільки програмна обробка. Апаратне прискорення вимкнене (жовтий)
* `disabled_off` - Вимкнено (червоний)
* `disabled_off_ok` - Вимкнено (жовтий)
* `unavailable_software` - Software only, hardware acceleration unavailable (yellow)
* `unavailable_off` - Unavailable (red)
* `unavailable_off_ok` - Unavailable (yellow)
* `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Enabled (green)
* `enabled_force_on` - Force enabled (green)