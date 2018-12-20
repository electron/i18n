# Объект GPUFeatureStatus

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