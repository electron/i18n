# Objeto de GPUFeatureStatus

* `2d_canvas` String - Canvas
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` Cadena - Perfil básico Flash Stage3D
* `gpu_compositing` Cadena - Composicionamiento
* `multiple_raster_threads` Cadena - Múltiples Hilos Raster
* `native_gpu_memory_buffers` Cadena - GpuMemoryBuffers Nativo
* `rasterization` String - Rasterization
* `video_decode` String - Video Decode
* `video_encode` String - Video Encode
* `vpx_decode` String - VPx Video Decode
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Posibles valores:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Disabled (red)
* `disabled_off_ok` - Disabled (yellow)
* `unavailable_software` - Software only, hardware acceleration unavailable (yellow)
* `unavailable_off` - Unavailable (red)
* `unavailable_off_ok` - Unavailable (yellow)
* `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Activado (verde)
* `enabled_force_on` - Force enabled (green)