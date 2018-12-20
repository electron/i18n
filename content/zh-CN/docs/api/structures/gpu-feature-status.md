# GPU 特性状态对象

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

可选值

* `disabled_software` - 只用于软件。禁用硬件加速。(yellow)
* `disabled_off` - 禁用(red)
* `disabled_off_ok` - 已禁用(yellow)
* `unavailable_software` - 只用于软件, 硬件加速不可用 (yellow)
* `unavailable_off` - 不可用(red)
* `unavailable_off_ok` - 已设为不可用的 (yellow)
* `enabled_readback` - 硬件加速但是有损耗性能 (yellow)
* `enabled_force` - 所有页面开启硬件加速 (green)
* `enabled` - 已硬件加速 (green)
* `enabled_on` - 启用 (green)
* `enabled_force_on` - 强制启用 (green)