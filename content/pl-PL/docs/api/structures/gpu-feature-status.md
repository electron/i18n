# Obiekt GPUFeatureStatus

* `2d_canvas` String - Canvas
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Profil Flash Stage3D Baseline
* `gpu_compositing` String - Kompozycja
* `multiple_raster_threads` String - Wielowątkowa rasteryzacja
* `native_gpu_memory_buffers` String - Natywne GpuMemoryBuffers
* `rasterization` String - Rasteryzacja
* `video_decode` String - Dekodowanie Video
* `video_encode` String - Kodowanie Video
* `vpx_decode` String - Dekodowanie VPx Video
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Możliwe wartości:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Disabled (red)
* `disabled_off_ok` - Disabled (yellow)
* `unavailable_software` - Software only, hardware acceleration unavailable (yellow)
* `unavailable_off` - Unavailable (red)
* `unavailable_off_ok` - Unavailable (yellow)
* `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Enabled (green)
* `enabled_force_on` - Force enabled (green)