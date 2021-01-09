# REPL

Read-Eval-Print-Loop (REPL) ay isang simpling, interactive computer programming enviroment na tanging gumagamit ng inputs (halimbawa nag-iisang ekspresiyon), pagsusuri, at ibalik ang resulta sa gumagamit.

Ang `repl` modyul na ito ay nagbibigay ng isang REPL implementasyon na maaaring ma-access gamit ang:

* Ipagpalagay na mayroon kang `elektron` o `elektron-prebuilt` naka-install bilang lokal na umaasa sa proyekto:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* Ipagpalagay na mayroon kang `elektron` o `elektron-prebuilt` naka-install pangkalahatan:

  ```sh
  elektron –interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `elektron --interactive` ay hindi magagamit sa Windows.

Matatagpuan ang karagdagang impormasyon sa mga [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).
