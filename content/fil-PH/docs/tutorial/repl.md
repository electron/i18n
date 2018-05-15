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

Lumilikha lamang ito ng REPL para sa mga pangunahing proseso. Maaari mong gamitin ang tab ng Console Dev Tools upang makakuha ang REPL para sa mga tagasalin na proseso.

**Note:** `elektron --interactive` ay hindi magagamit sa Windows.

Matatagpuan ang karagdagang impormasyon sa mga [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).