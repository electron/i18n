# GPUFeatureStatus Object

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

Valorile posibile sunt:

* `disabled_software` - Numai software. Accelerare hardware dezactivată (galben)
* `disabled_off` - Dezactivat (roșu)
* `disabled_off_ok` - Dezactivat (galben)
* `unavailable_software` - Numai software, accelerare hardware indisponibilă (galben)
* `unavailable_off` - Indisponibil (roșu)
* `unavailable_off_ok` - Indisponibil (galben)
* `enabled_readback` - Hardware accelerat, dar la performanță redusă (galben)
* `enabled_force` - Hardware accelerat pe toate paginile (verde)
* `enabled` - Hardware accelerat (verde)
* `enabled_on` - Activat (verde)
* `enabled_force_on` - Forța activată (cu verde)
