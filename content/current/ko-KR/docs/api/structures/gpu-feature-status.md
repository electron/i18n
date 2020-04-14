# GPU 기능 상태 개체

* `2d_canvas` String - 캔버스.
* `flash_3d` String - 플래시.
* `flash_stage3d` String - 플래시 3D스테이지.
* `flash_stage3d_baseline` String - 플래시 3D스테이지 기준선 프로필.
* `gpu_compositing` String - 합성.
* `multiple_raster_threads` String - 여러개의 래스터 스레드.
* `native_gpu_memory_buffers` String - 네이티브 GPU 메모리 버퍼.
* `rasterization` String - 래스터화.
* `video_decode` String - 비디오 디코딩.
* `video_encode` String - 비디오 인코딩.
* `vpx_decode` String - VPx 비디오 디코딩.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

가능한 값:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
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
