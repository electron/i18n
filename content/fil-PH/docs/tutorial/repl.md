# REPL

Read-Eval-Print-Loop (REPL) ay isang simpling, interactive computer programming enviroment na tanging gumagamit ng inputs (halimbawa nag-iisang ekspresiyon), pagsusuri, at ibalik ang resulta sa gumagamit.

Ang `repl` modyul na ito ay nagbibigay ng isang REPL implementasyon na maaaring ma-access gamit ang:

* Ipagpalagay na mayroon kang `elektron` o `elektron-prebuilt` naka-install bilang lokal pagiging palaasa sa isang lokal na proyekto:
    
    ```sh
./node_modules/.bin/electron --interactive
```

* Assuming you have `electron` or `electron-prebuilt` installed globally:
    
    ```sh
electron --interactive
```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `electron --interactive` is not available on Windows.

More information can be found in the [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).