# Об'єкт GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Flash Stage3D Baseline profile.
* `gpu_compositing` String - Compositing.
* `multiple_raster_threads` String - Multiple Raster Threads.
* `native_gpu_memory_buffers` String - Native GpuMemoryBuffers.
* `rasterization` String - Rasterization.
* `video_decode` String - Video Decode.
* `video_encode` String - Video Encode.
* `vpx_decode` String - VPx Video Decode.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Можливі значення:

* `disabled_software` - Тільки програмна обробка. Апаратне прискорення вимкнене (жовтий)
* `disabled_off` - Вимкнено (червоний)
* `disabled_off_ok` - Вимкнено (жовтий)
* `unavailable_software` - Тільки програмна обробка. Апаратне прискорення вимкнене (жовтий)
* `unavailable_off` - Недоступно (червоний)
* `unavailable_off_ok` - Недоступно (жовтий)
* `enabled_readback` - Апаратне прискорення, але з зниженою продуктивністю (жовтий)
* `enabled_force` - Апаратне прискорення на всіх сторінках (зелений)
* `enabled` - Апаратне прискорення (зелений)
* `enabled_on` - Ввімкнено (зелений)
* `enabled_force_on` - Примусове ввімкнення (зелений)