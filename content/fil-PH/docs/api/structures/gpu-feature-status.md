# Mga bagay sa GPUFeatureStatus

* `2d_canvas` String - Canvas
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Profile ng Flash Stage3D Baseline
* `gpu_compositing` String - Compositing
* `multiple_raster_threads` String - Maramihang Raster Thread
* `native_gpu_memory_buffers` String - Likas na mga GpuMemoryBuffer
* `rasterization` String - Rasterization
* `video_decode` String - Decode ng Video
* `video_encode` String - Encode ng Video
* `vpx_decode` String - Decode ng Vpx Video
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Posibleng halaga:

* `disabled_software` Software lamang. Ang akselerasyon ng hardware ay hindi pinagana (dilaw)
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