# เอกสารแนะนำลักษณะอิเลคตรอน

นี่คือแนวทางสำหรับการเขียนเอกสารของอิเล็กตรอน

## ชื่อเรื่อง:

* แต่ละหน้าจะต้องมี ` # ` - ชื่อระดับเดียวที่ด้านบน
* บทในหน้าเดียวกันจะต้องมี ` ## ` - ชื่อระดับ
* บทย่อยต้องเพิ่มจำนวน ` # ` ในชื่อเรื่องตาม ความลึกในการทำรังของพวกเขา
* คำทั้งหมดในชื่อหน้าจะต้องเป็นตัวพิมพ์ใหญ่ยกเว้นคำสันธาน ชอบ "จาก" และ "และ"
* ต้องใช้อักษรตัวแรกของหัวเรื่องบทเท่านั้น

ใช้ ` การเริ่มต้นอย่างรวดเร็ว ` เป็นตัวอย่าง:

```markdown
# เริ่มต้นอย่างรวดเร็ว

...

## กระบวนการหลัก

...

## กระบวนการแสดงผล

...

## เรียกใช้แอปของคุณ

...

### เรียกใช้เป็นการแจกจ่าย

...

### ไบนารีของอิเล็กตรอนที่ดาวน์โหลดด้วยตนเอง

...
```

สำหรับการอ้างอิง API มีข้อยกเว้นสำหรับกฎนี้

## คุณลักษณะของ Markdown

* ใช้ ` sh ` แทนที่จะเป็น ` cmd ` ในบล็อคโค้ด (เนื่องจากปากกาเน้นข้อความเน้นข้อความ)
* ควรตัดบรรทัดที่ 80 คอลัมน์
* ไม่มีรายการซ้อนกันมากกว่า 2 ระดับ (เนื่องจากตัวเรนเดอร์ markdown)
* บล็อคโค้ด ` js ` และ ` javascript ` ทั้งหมดจะถูกขื่อด้วย  มาตรฐาน markdown </ 1></li> </ul> 
  
  ## การเลือกคำ
  
  * ใช้ "จะ" มากกว่า "จะ" เมื่ออธิบายผลลัพธ์
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
  * วิธีการทั้งหมดที่มีค่าส่งคืนต้องเริ่มต้นคำอธิบายด้วย "ส่งคืน `[TYPE]` - คำอธิบายการส่งคืน " 
    * หากวิธีการส่งกลับวัตถุ ` ` โครงสร้างของมันสามารถระบุได้โดยใช้ลำไส้ใหญ่ตามด้วยขึ้นบรรทัดใหม่แล้วรายการของคุณสมบัติที่ไม่เรียงลำดับในรูปแบบเดียวกับพารามิเตอร์ฟังก์ชั่น
  * เหตุการณ์อินสแตนซ์จะต้องอยู่ในรายการ ` ### เหตุการณ์อินสแตนซ์ ` บท
  * คุณสมบัติอินสแตนซ์จะต้องอยู่ในรายการภายใต้ `### คุณสมบัติอินสแตนซ์` chapter. 
    * Instance properties must start with "A [Property Type] ..."
  
  Using the `Session` and `Cookies` classes as an example:
  
  ```markdown
  # session
  
  ## Methods
  
  ### session.fromPartition(partition)
  
  ## Properties
  
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
  
  ### Methods
  
  The methods chapter must be in the following form:
  
  ```markdown
  ### `objectName.methodName(required[, optional]))`
  
  * `required` String - A parameter description.
  * `optional` Integer (optional) - Another parameter description.
  
  ...
  ```
  
  The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.
  
  For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.
  
  For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.
  
  The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:
  
  ```sh
  required[, optional]
  ```
  
  Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:
  
  * [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  * [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  * [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
  * [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
  * [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
  * Or a custom type like Electron's [`WebContent`](api/web-contents.md)
  
  If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.
  
  ```markdown
  * `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
  ```
  
  `Array` type arguments must specify what elements the array may include in the description below.
  
  The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.
  
  ### อีเวนต์
  
  The events chapter must be in following form:
  
  ```markdown
  ### Event: 'wake-up'
  
  Returns:
  
  * `time` String
  
  ...
  ```
  
  The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.
  
  The arguments of an event follow the same rules as methods.
  
  ### Properties
  
  The properties chapter must be in following form:
  
  ```markdown
  ### session.defaultSession
  
  ...
  ```
  
  The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.
  
  ## การแปลเอกสาร
  
  ดู [electron/i18n](https://github.com/electron/i18n#readme)