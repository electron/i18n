# Mga bagay sa GPUFeatureStatus

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

Posibleng halaga:

* `disabled_software` Software lamang. Ang akselerasyon ng hardware ay hindi pinagana (dilaw)
* `disabled_off` - Hindi pinagana (pula)
* `disabled_off_ok` - Hindi pinagana (dilaw)
* `unavailable_software` - Software lamang, ang akselerasyon ng hardware ay hindi magagamit (dilaw)
* `unavailable_off` - Hindi magagamit (pula)
* `unavailable_off_ok` - Hindi magagamit (dilaw)
* `enabled_readback` - Ang hardware ay pinabilis ngunit sa mabagal na pagganap (dilaw)
* `enabled_force` - Ang hardware ay pinabilis sa lahat ng mga pahina (berde)
* `enabled` - Ang hardware ay pinabilis (berde)
* `enabled_on` - Pinagana (berde)
* `enabled_force_on` - Pinagana ang lakas (berde)