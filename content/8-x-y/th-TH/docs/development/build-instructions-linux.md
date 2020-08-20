# คําแนะนําการสร้าง (ลินุกซ์)

ปฏิบัติตามแนวทางด้านล่างสําหรับการสร้างอิเล็กตรอนบน Linux

## Требования

* พื้นที่ดิสก์อย่างน้อย 25GB และแรม 8GB
* Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.

  Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:

  ```sh
  $ npx @electron/check-python-tls
  ```

  https://c.realme.com/in/checkin หรือแวะที่https://www.python.org/downloads/ สําหรับคําแนะนําโดยละเอียด

* Node.js. มีหลายวิธีในการติดตั้งโหนด คุณสามารถดาวน์โหลด รหัสแหล่งที่มาจาก[nodejs.org](https://nodejs.org)และรวบรวมมัน Doing so permits installing Node on your own home directory as a standard user. หรือลองที่เก็บข้อมูล เช่น[NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)
* [clang](https://clang.llvm.org/get_started.html) 3.4 หรือใหม่กว่า
* Development headers of GTK+ and libnotify.

On Fedora, install the following libraries:

```sh
$ sudo ฉลาด- ได้รับการติดตั้งสร้างจําเป็น libdbus - 1 - dev libgtk - 3 - dev \
                       ลิบปลิวเด-
                       2-dev libcap-dev libcups2-dev - dev - dev \
                       1000000000000000000000000000000000000000000000000000000000000000000000000000000000
                       กระทิงหลางไพธอน-dbusmock
```

On Fedora, install the following libraries:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

On Fedora, install the following libraries:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

### บังคับการรวบรวม

ถ้าคุณต้องการสร้างเป้าหมาย`แขน`คุณควรติดตั้งต่อไปนี้ อ้าง อิง:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

ในทํานองเดียวกัน`arm64`ติดตั้งต่อไปนี้:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

และข้ามรวบรวมสําหรับ`แขน`หรือ`ia32`เป้าหมายคุณควรผ่าน `พารามิเตอร์target_cpu` `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## สิ่งก่อสร้าง

ดู [ คำแนะนำในการสร้าง: GN ](build-instructions-gn.md)

## วิธีแก้ปัญหาเบื้องต้น

### ข้อผิดพลาดขณะกําลังโหลดไลบรารีที่ใช้ร่วมกัน: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo - s / usr / lib / libncurses.so.5 /usr / lib / libtinfo.so.5
```

## หัวข้อขั้นสูง

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### การใช้`ระบบ clang`แทนไบนารี`clang`ที่ดาวน์โหลด

โดยเริ่มต้นอิเล็กตรอนถูกสร้างขึ้นด้วยการสร้างไว้ล่วงหน้า ไบนารี[`clang`](https://clang.llvm.org/get_started.html)ที่จัดโดย โครงการโครเมียม ถ้าด้วยเหตุผลบางอย่างที่คุณต้องการที่จะสร้างด้วย`clang` ติดตั้งในระบบของคุณ คุณสามารถระบุอาร์กิวเมนต์`clang_base_path`ใน 08/08/2014

ตัวอย่างเช่นถ้าคุณติดตั้ง`clang`ภายใต้`usr / ท้องถิ่น / bin / clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### การใช้คอมไพเลอร์อื่นที่ไม่ใช่`clang`

Building Electron with compilers other than `clang` is not supported.
