# הרכיב GPUFeatureStatus

* `2d_canvas`‏ String - משטח ציור.
* String `flash_3d` - Flash.
* String `flash_stage3d` - Flash Stage3D.
* String `flash_stage3d_baseline` - פרופיל Flash Stage3D Baseline.
* String `gpu_compositing` - Compositing.
* String `multiple_raster_threads` - Multiple Raster Threads.
* String `native_gpu_memory_buffers` - Native GpuMemoryBuffers.
* String `rasterization` - Rasterization.
* String - `video_decode` - Video Decode.
* String `video_encode` - Video Encode.
* String `vpx_decode` - VPx Video Decode.
* String `webgl` - WebGL.
* String `webgl2` - WebGL 2.

ערכים אפשריים:

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
