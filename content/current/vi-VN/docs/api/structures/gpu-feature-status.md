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

Giá trị khả thi:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Đã vô hiệu hóa (red)
* `disabled_off_ok` - Đã vô hiệu hóa (yellow)
* `unavailable_software` - Chỉ phần mềm, tăng tốc phần cứng không có sẵn (yellow)
* `unavailable_off` - Không có sẵn (red)
* `unavailable_off_ok` - Không có sẵn (yellow)
* `enabled_readback` - Phần cứng được tăng tốc nhưng hiệu năng giảm (yellow)
* `enabled_force` - Phần cứng được tăng tốc trên tất cả các trang (green)
* `enabled` - Tăng tốc phần cứng (green)
* `enabled_on` - Đã bật (green)
* `enabled_force_on` - Buộc phải bật (green)
