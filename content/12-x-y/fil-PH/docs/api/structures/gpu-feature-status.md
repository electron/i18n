# Mga bagay sa GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Profile ng Flash Stage3D Baseline.
* `gpu_compositing` String - Compositing.
* `multiple_raster_threads` String - Maramihang Raster Thread.
* `native_gpu_memory_buffers` String - Likas na mga GpuMemoryBuffer.
* `rasterization` String - Rasterization.
* `video_decode` String - Decode ng Video.
* `video_encode` String - Encode ng Video.
* `vpx_decode` String - Decode ng Vpx Video.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Posibleng mga halaga:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
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
