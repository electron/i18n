# GPU 特性状态对象

* `2d_canvas` String - 画布
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash 舞台3D
* `flash_stage3d_baseline` String - Flash 舞台3D 基线配置
* `gpu_compositing` String - 合成
* `multiple_raster_threads` String - 多光栅线程
* `native_gpu_memory_buffers` String - 原生GPU显存缓冲
* `rasterization` String - 光栅化
* `video_decode` String - 视频解码
* `video_encode` String - 视频编码
* `vpx_decode` String - VPx 视频解码
* `webgl` String - WebGL
* `webgl2` String - WebGL2

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