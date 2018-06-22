# GPUFeatureStatus Object

* `2d_canvas` String - Canvas
* `flash_3d` String - Flash
* `flash_stage3d` String - Flash Stage3D
* `flash_stage3d_baseline` String - Flash Stage3D Baseline-Profile
* `gpu_compositing` String - Compositing
* `multiple_raster_threads` String - Mehrere Raster-Threads
* `native_gpu_memory_buffers` String - Native GpuMemoryBuffers
* `rasterization` String - Rasterisierung
* `video_decode` String - Video decodierung
* `video_encode` String - Video kodieren
* `vpx_decode` String - VPx Video decodierung
* `webgl` String - WebGL
* `webgl2` String - WebGL2

Mögliche werte:

* `disabled_software` - Nur Software. Hardwarebeschleunigung deaktiviert (gelb)
* `disabled_off` - Deaktiviert (rot)
* `disabled_off_ok` - Deaktiviert (gelb)
* `unavailable_software` - Nur Software, Hardwarebeschleunigung nicht verfügbar (gelb)
* `unavailable_off` - Nicht verfügbar (rot)
* `unavailable_off_ok` - Nicht verfübar (gelb)
* `enabled_readback` - Hardware beschleunigt, aber mit reduzierter Leistung (geld)
* `enabled_force` - Hardware beschleunigt auf jeder Seite (grün)
* `enabled` - Hardware beschleunigt (grün)
* `enabled_on` - Aktiviert (grün)
* `enabled_force_on` - Zwangs Aktiviert (grün)