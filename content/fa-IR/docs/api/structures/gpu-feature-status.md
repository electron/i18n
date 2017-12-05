# شئِ وضعیت GPU

* ` بوم دو بعدی` رشته - بوم
* `فلش سه بعدی` رشته - فلش
* ` stage3d فلش ` رشته - فلش stage3d
* `t `flash_stage3d_baseline - رشته - مشخصات پایه فلش Stage3D
* `t `gpu_compositing - رشته - ترکیب
* `t `multiple_raster_threads - رشته - رشته های متعدد شطرنجی
* `t `native_gpu_memory_buffers - رشته - بافرهای بومیِ حافظه ی GPU
* `t `rasterization - رشته - صفحه ای کردن
* `t `video_decode - رشته - کدزایی ویدئو
* `t `video_encode - کد کردنِ ویدئو
* `t `vpx_decode - رشته - کدزایی ویدئوهای VPx
* `t `webgl - رشته - WebGL
* `t `webgl2 - رشته - WebGL2

مقادیر ممکن:

* `t `disabled_software - فقط نرم افزار. افزایش سرعت نرم افزار غیرفعال (زرد)
* `t `disabled_off - غیرفعال (قرمز)
* `disabled_off_ok` - Disabled (yellow)
* `unavailable_software` - Software only, hardware acceleration unavailable (yellow)
* `unavailable_off` - Unavailable (red)
* `unavailable_off_ok` - Unavailable (yellow)
* `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
* `enabled_force` - Hardware accelerated on all pages (green)
* `enabled` - Hardware accelerated (green)
* `enabled_on` - Enabled (green)
* `enabled_force_on` - Force enabled (green)