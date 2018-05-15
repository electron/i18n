# Oggetto GPUFeatureStatus

* `2d_canvas` Stringa - Canvas
* `flash_3d` Stringa - Flash
* `flash_stage3d` Stringa - Flash Stage3D
* `flash_stage3d_baseline` Stringa - Profilo Baseline Flash Stage3D
* `gpu_compositing` Stringa - Compositing
* `multiple_raster_threads` Stringa - Thread Raster multipli
* `native_gpu_memory_buffers` Stringa - GpuMemoryBuffers Nativo
* `rasterization` Stringa - Rasterization
* `video_decode` Stringa - Decodifica video
* `video_encode` Stringa - Codifica Video
* `vpx_decode` Stringa - Decodifica Video VPx
* `webgl` Stringa - WebGL
* `webgl2` Stringa - WebGL2

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