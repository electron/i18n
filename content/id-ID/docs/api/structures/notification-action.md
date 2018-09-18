# NotificationAction Object

* `type</ 0>  String - Tipe tindakan, bisa dengan <code>button</ 0> .</li>
<li><code>text` String (optional) - The label for the given action.

## Platform / Action Support

Penggunaan ` teks </ 0></th>
  <th>Default <code> teks </ 0></th>
  <th>Keterbatasan</th>
</tr>
</thead>
<tbody>
<tr>
  <td><code>tombol`</td> 

</tr> </tbody> </table> 

### Dukungan tombol pada macos

In order for extra notification buttons to work on macOS your app must meet the following criteria.

* Aplikasi telah ditandatangani
* App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button won't appear.