# Oggetto GPUFeatureStatus

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

Possibili valori:

* `disabled_software` - Solo Software. Accelerazione hardware disabilitata (giallo)
* `disabled_off` Disabilitato (rosso)
* `disabled_off_ok` - Disabilitato (giallo)
* `unavailable_software` - Solo Software, accelerazione hardware non disponibile (giallo)
* `unavailable_off` - Non disponibile (red)
* `unavailable_off_ok` - Non disponibile (giallo)
* `enabled_readback` - Accelerazione hardware con performance ridotta (giallo)
* `enabled_force` - Accelerazione hardware su tutte le pagine (verde)
* `enabled` - Accelerazione hadrware (verde)
* `enabled_on` - Abilitato (verde)
* `enabled_force_on` - Abilitata forzatamente (verde)