# Обект GPUFeatureStatus

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

Възможни стойности:

* `disabled_software` - Само за софтуер. Хардуерно ускорение е изключено (жълто)
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