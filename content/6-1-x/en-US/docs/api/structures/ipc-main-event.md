# IpcMainEvent Object extends `Event`

* `frameId` Integer - The ID of the renderer frame that sent this message
* `returnValue` any - Set this to the value to be returned in a syncronous message
* `sender` WebContents - Returns the `webContents` that sent the message
* `reply` Function - A function that will send an IPC message to the renderer frame that sent the original message that you are currently handling.  You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.
  * `...args` any[]
IpcRenderer
