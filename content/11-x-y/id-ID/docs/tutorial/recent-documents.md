# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

__jumplist:__

![Daftar Langsung Berkas Terbaru][1]

__Menu dermaga aplikasi:__

![macOS Dock Menu][2]

Untuk menambahkan file ke dokumen baru-baru ini, Anda dapat menggunakan

 app.addRecentDocument </ 0>  API :</p> 



```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```


Dan Anda dapat menggunakan [app.clearRecentDocuments ][clearrecentdocuments] API untuk mengosongkan daftar dokumen baru-baru:



```javascript
onst { app } = require('electron')
app.clearRecentDocuments()
```




## catatan Windows

Agar dapat menggunakan fitur ini pada Windows , aplikasi Anda harus terdaftar sebagai handler dari jenis file dokumen, jika file tersebut tidak akan muncul di jumplist bahkan setelah Anda telah menambahkan. Anda dapat menemukan semuanya di mendaftarkan aplikasi Anda di  Aplikasi Pendaftaran </ 0> .</p> 

Ketika pengguna mengklik file dari jumplist, contoh baru dari aplikasi Anda akan mulai dengan path dari file ditambahkan sebagai argumen baris perintah.



## Catatan macOS



### Adding the Recent Documents list to the application menu:

![macOS Recent Documents menu item][4]

You can add menu items to access and clear recent documents by adding the following code snippet to your menu's template.



```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```


Ketika sebuah file yang diminta dari menu dokumen terakhir, `open-file` acara dari `app` modul akan dipancarkan untuk itu.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[4]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
