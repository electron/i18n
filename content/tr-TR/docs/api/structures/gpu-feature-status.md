# GPUFeatureStatus nesnesi

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

Olası değerler:

* `disabled_software` - Yalnızca yazılım. Donanım ivmesi devre dışı (sarı)
* `disabled_off` - Devre dışı (kırmızı)
* `disabled_off_ok` - Devre dışı (sarı)
* `unavailable_software` - Yalnızca yazılım, donanım ivmesi mevcut değil (sarı)
* `unavailable_off` - Mevcut değil (kırmızı)
* `unavailable_off_ok` - Mevcut değil (sarı)
* `enabled_readback` - Donanım hızlandırılmış ama performans azalmış (sarı)
* `enabled_force` - Donanım tüm sayfalarda hızlandırılmış (yeşil)
* `enabled` - Donanım hızlandırılmış (yeşil)
* `enabled_on` - Etkin (yeşil)
* `enabled_force_on` - Etkinleştirmeye zorla (yeşil)