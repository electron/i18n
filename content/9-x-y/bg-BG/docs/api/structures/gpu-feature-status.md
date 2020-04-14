# Обект GPUFeatureStatus

* `2d_canvas` String - Платно.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Основната профилна линия за Flash Stage3D.
* `gpu_compositing` String - Композиране.
* `multiple_raster_threads` String - Множество растерни процесорни нишки.
* `native_gpu_memory_buffers` String - Роден за устройството буфер GpuMemoryBuffers.
* `rasterization` String - Растерна графика.
* `video_decode` String - Видео декодиране.
* `video_encode` String - Видео кодиране.
* `vpx_decode` String - VPx Видео декодиране.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2

Възможни стойности:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Изключено (червено)
* `disabled_off_ok` - Изключено (жълто)
* `unavailable_software` - Само за софтуер. Хардуерно ускорение не е налично (жълто)
* `unavailable_off` - Не е налично (червено)
* `unavailable_off_ok` - Не е налично (жълто)
* `enabled_readback` - Хардуерно ускорение, но с намалена производителност (жълто)
* `enabled_force` - Хардуерно ускорение, включено за всички страници (зелено)
* `enabled` - Хардуерно ускорение (зелено)
* `enabled_on` - Включено (зелено)
* `enabled_force_on` - Включи сила (зелено)
