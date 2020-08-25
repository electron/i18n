# GPUFeatureStatus nesnesi

* `2d_canvas` Dizeler - tuval.
* `flash_3d` Dize - Flash.
* `flash_stage3d` Dize - Flash Stage3D.
* `flash_stage3d_baseline` Dize - Flash Stage3D temel profil.
* `gpu_compositing` Dize - kompozisyon.
* `multiple_raster_threads` Dize -  Raster konuları.
* `native_gpu_memory_buffers` Dize - Yerli GPU Bellek Tamponları.
* `rasterleştirme` Dize - pikselleştirme.
* `video_encode` Dize - Video kodlama.
* `video_encode` Dize - Video kodlama.
* `video_encode` Dize - Video kodlama.
* `webgl` Dize - WebGL.
* `webgl2` Dize - WebGL2.

Olası değerler:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
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
