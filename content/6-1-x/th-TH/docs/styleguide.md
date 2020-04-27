# Electron Documentation Style Guide

นี่คือแนวทางสำหรับการเขียนเอกสารของอิเล็กตรอน

## ชื่อเรื่อง:

* Each page must have a single `#`-level title at the top.
* บทในหน้าเดียวกันจะต้องมี ` ## ` - ชื่อระดับ
* บทย่อยต้องเพิ่มจำนวน ` # ` ในชื่อเรื่องตาม ความลึกในการทำรังของพวกเขา
* คำทั้งหมดในชื่อหน้าจะต้องเป็นตัวพิมพ์ใหญ่ยกเว้นคำสันธาน ชอบ "จาก" และ "และ"
* ต้องใช้อักษรตัวแรกของหัวเรื่องบทเท่านั้น

ใช้ ` การเริ่มต้นอย่างรวดเร็ว ` เป็นตัวอย่าง:

```markdown
# Quick Start

...

## Main process

...

## Renderer process

...

## Run your app

...

### Run as a distribution

...

### Manually downloaded Electron binary

...
```

Para referencias API, hay excepciones para esta regla.

## คุณลักษณะของ Markdown

* ใช้ ` sh ` แทนที่จะเป็น ` cmd ` ในบล็อคโค้ด (เนื่องจากปากกาเน้นข้อความเน้นข้อความ)
* ควรตัดบรรทัดที่ 80 คอลัมน์
* ไม่มีรายการซ้อนกันมากกว่า 2 ระดับ (เนื่องจากตัวเรนเดอร์ markdown)
* บล็อคโค้ด ` js ` และ ` javascript ` ทั้งหมดจะถูกขื่อด้วย

 มาตรฐาน markdown </ 1></li> </ul> 
  
  

## การเลือกคำ

* Utilice "podrá" en vez de "podría" al describir resultados.
* ชอบ "ในกระบวนการ ___" มากกว่า "เปิด"



## การอ้างอิง API

กฎต่อไปนี้ใช้กับเอกสารของ API เท่านั้น



### ชื่อหน้า

แต่ละหน้าจะต้องใช้ชื่อวัตถุจริงที่ส่งคืนโดย ` ต้องการ ('อิเล็กตรอน') ` เป็นชื่อเช่น ` BrowserWindow `, ` autoUpdater ` และ ` เซสชัน `

ใต้ชื่อหน้าจะต้องเป็นคำอธิบายหนึ่งบรรทัดที่เริ่มต้นด้วย ` & gt; `

ใช้ ` เซสชัน ` เป็นตัวอย่าง:



```markdown
# เซสชัน

& gt; จัดการเซสชันเบราว์เซอร์คุกกี้แคชการตั้งค่าพร็อกซี ฯลฯ
```




### โมดูลวิธีการและเหตุการณ์

สำหรับโมดูลที่ไม่ได้เรียนวิธีการและเหตุการณ์ของพวกเขาจะต้องอยู่ภายใต้ ` ## วิธีการ ` และ ` ## เหตุการณ์ ` บท

ใช้ ` autoUpdater ` เป็นตัวอย่าง:



```markdown
# autoUpdater

## กิจกรรม

### กิจกรรม: 'ข้อผิดพลาด'

## วิธีการ

### `autoUpdater.setFeedURL (url [, requestHeaders])`
```




### คลาส

* คลาส API หรือคลาสที่เป็นส่วนหนึ่งของโมดูลต้องแสดงรายการภายใต้ ` ## คลาส: TheClassName ` ตอน

* หนึ่งหน้าสามารถมีได้หลายคลาส

* ตัวสร้างต้องอยู่ในรายการด้วย ` ### ` - ชื่อระดับ
* [ วิธีการคงที่ ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) จะต้องอยู่ในรายการภายใต้ ` ### วิธีการคงที่ ` บท
* [ วิธีการคงที่ ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) จะต้องอยู่ในรายการภายใต้ ` ### วิธีการคงที่ ` บท
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description" 
    * หากวิธีการส่งกลับวัตถุ ` ` โครงสร้างของมันสามารถระบุได้โดยใช้ลำไส้ใหญ่ตามด้วยขึ้นบรรทัดใหม่แล้วรายการของคุณสมบัติที่ไม่เรียงลำดับในรูปแบบเดียวกับพารามิเตอร์ฟังก์ชั่น
* เหตุการณ์อินสแตนซ์จะต้องอยู่ในรายการ ` ### เหตุการณ์อินสแตนซ์ ` บท
* Instance Properties must be listed under an `### Instance Properties` chapter. 
    * คุณสมบัติอินสแตนซ์จะต้องเริ่มต้นด้วย "A [ประเภทคุณสมบัติ] ... "

การใช้คลาส ` เซสชัน ` และ ` คุกกี้ ` เป็นตัวอย่าง:



```markdown
# session

## Methods

### session.fromPartition(partition)

## Static Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize()`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```




### วิธีการ

บทวิธีการจะต้องอยู่ในรูปแบบต่อไปนี้:



```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```


ชื่อสามารถเป็น ` ### ` หรือ ` #### ` - ระดับขึ้นอยู่กับว่ามันเป็นวิธีการของ โมดูลหรือคลาส

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

ตัวอย่างเช่นวิธีการของคลาส ` เซสชัน ` ภายใต้โมดูล ` เซสชัน ` จะต้อง ใช้ ` ses ` เป็น ` objectName `

อาร์กิวเมนต์ตัวเลือกจะได้รับการระบุด้วยวงเล็บเหลี่ยม ` [] ` ล้อมรอบอาร์กิวเมนต์ที่เลือกได้ เช่นเดียวกับจุลภาคที่จำเป็นถ้าอาร์กิวเมนต์ตัวเลือกนี้เป็นไปตามอื่น ข้อโต้แย้ง:



```sh
ต้องการ [, ตัวเลือก]
```


Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* หรือประเภทที่กำหนดเองเช่น [` WebContent `](api/web-contents.md) ของอิเล็กตรอน

หากมีข้อโต้แย้งหรือวิธีการที่ไม่ซ้ำกันในบางแพลตฟอร์มแพลตฟอร์มเหล่านั้นคือ แสดงโดยใช้รายการตัวเอียงที่คั่นด้วยเว้นวรรคตามประเภทข้อมูล ค่า สามารถเป็น ` macOS `, ` Windows ` หรือ ` Linux `



```markdown
* `animate` Boolean (เป็นทางเลือก) _macOS_ _Windows_ - สร้างภาพเคลื่อนไหว
```


` อาร์เรย์ ` อาร์กิวเมนต์ประเภทต้องระบุองค์ประกอบที่อาเรย์อาจรวมอยู่ด้วย คำอธิบายด้านล่าง

คำอธิบายสำหรับอาร์กิวเมนต์ประเภท ` Function ` ควรทำให้ชัดเจนว่าเป็นอย่างไร เรียกและรายการประเภทของพารามิเตอร์ที่จะถูกส่งไปยังมัน



### อีเวนต์

บทเหตุการณ์ต้องอยู่ในรูปแบบต่อไปนี้:



```markdown
### กิจกรรม: 'ปลุก'

ผลตอบแทน:

* `time` String

...
```


ชื่อสามารถเป็น ` ### ` หรือ ` #### ` - ระดับขึ้นอยู่กับว่าเป็นเหตุการณ์ของ โมดูลหรือคลาส

อาร์กิวเมนต์ของเหตุการณ์เป็นไปตามกฎเดียวกันกับวิธีการ



### คุณสมบัติ

บทคุณสมบัติต้องอยู่ในรูปแบบต่อไปนี้:



```markdown
### session.defaultSession

...
```


ชื่อสามารถเป็น ` ### ` หรือ ` #### ` - ระดับขึ้นอยู่กับว่ามันเป็นวิธีการของ โมดูลหรือคลาส



## การแปลเอกสาร

ดู [electron/i18n](https://github.com/electron/i18n#readme)
