# Obiekt GPUFeatureStatus

* `2d_canvas` String - Canvas.
* `flash_3d` String - Flash.
* `flash_stage3d` String - Flash Stage3D.
* `flash_stage3d_baseline` String - Profil Flash Stage3D Baseline.
* `gpu_compositing` String - Kompozycja.
* `multiple_raster_threads` String - Wielowątkowa rasteryzacja.
* `native_gpu_memory_buffers` String - Natywne GpuMemoryBuffers.
* `rasterization` String - Rasteryzacja.
* `video_decode` String - Dekodowanie Video.
* `video_encode` String - Kodowanie Video.
* `vpx_decode` String - Dekodowanie VPx Video.
* `webgl` String - WebGL.
* `webgl2` String - WebGL2.

Możliwe wartości:

* `disabled_software` - Software only. Hardware acceleration disabled (yellow)
* `disabled_off` - Wyłączona (kolor czerwony)
* `disabled_off_ok` - Wyłączona (kolor żółty)
* `unavailable_software` - Tylko dla oprogramowania, sprzętowa akceleracja niedostępna (kolor żółty)
* `unavailable_off` - Niedostępna (kolor czerwony)
* `unavailable_off_ok` - Niedostępna (kolor żółty)
* `enabled_readback` - Sprzętowa akceleracja, lecz zredukowana wydajność (kolor żółty)
* `enabled_force` - Sprzętowa akceleracja na wszystkich stronach (kolor zielony)
* `enabled` - Sprzętowa akceleracja (kolor zielony)
* `enabled_on` - Włączona (kolor zielony)
* `enabled_force_on` - Wymuszone włączenie (kolor zielony)
