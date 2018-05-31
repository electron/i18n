# GPUFeatureStatus Object

* `2d_canvas` String - Canvas
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Flash Stage3D Baseline profiel
* `gpu_compositing` String - Compositing
* `multiple_raster_threads` String - Multiple Raster Threads
* `native_gpu_memory_buffers` String - Native GpuMemoryBuffers
* `rasterization` String - Rasterizatie
* `video_decode` String - Video Decode
* `video_encode` String - Video Encode
* `vpx_decode` String - VPx Video Decode
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Mogelijke waarden:

* `disabled_software` - Enkel software. Hardware acceleratie uitgeschakeld (geel)
* `disabled_off` - Uitgeschakeld (rood)
* `disabled_off_ok` - Uitgeschakeld (geel)
* `unavailable_software` - Enkel software. Hardware acceleratie onbeschikbaar (geel)
* `unavailable_off` - Onbeschikbaar (rood)
* `unavailable_off_ok` - Onbeschikbaar (geel)
* `enabled_readback` - Hardware geaccelereerd, maar lagere performantie (geel)
* `enabled_force` - Hardware acceleratie op alle pagina's (groen)
* `enabled` - Hardware geaccelereerd (groen)
* `enabled_on` - Ingeschakeld (groen)
* `enabled_force_on` - Geforceerd ingeschakeld (groen)