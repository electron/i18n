# GPU 기능 상태 개체

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

가능한 값:

* `disabled_software` - 소프트웨어 전용. 하트웨어 가속 비활성화(yellow)
* `disabled_off` - 사용안함 (red)
* `disabled_off_ok` - 사용안함 (yellow)
* `unavailable_software` - 소프트웨어 전용, 하드웨어 가속 사용 불가(yellow)
* `unavailable_off` - 사용 불가 (red)
* `unavailable_off_ok` - 사용 불가 (yellow)
* `enabled_readback` - 하드웨어를 가속하지만 성능이 저하 (yellow)
* `enabled_force` - 모든 페이지 하드웨어 가속 (green)
* `enabled` - 하드웨어 가속 (green)
* `enabled_on` - 사용 가능 (green)
* `enabled_on` - 포스 사용 가능 (green)