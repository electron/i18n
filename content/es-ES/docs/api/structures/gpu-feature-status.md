# Objeto GPUFeatureStatus

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

Posibles valores:

* `disabled_software` - Sólo software. Aceleración de hardware deshabilitada (amarillo)
* `disabled_off` - Deshabilitado (rojo)
* `disabled_off_ok` - Deshabilitado (amarillo)
* `unavailable_software` - Sólo software. Aceleración de hardware no disponible (amarillo)
* `unavailable_off` - No disponible (rojo)
* `unavailable_off_ok` - No disponible (amarillo)
* `enabled_readback` - Hardware acelerado pero a menor rendimiento (amarillo)
* `enabled_force` - Hardware acelerado en todas las páginas (verde)
* `enabled` - Hardware acelerado (verde)
* `enabled_on` - Activado (verde)
* `enabled_force_on` - Activado forzado (verde)