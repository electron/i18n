# Actualización de Crashpad

1. Obtenga la versión de crashpad que vamos a usar.
    
    - `libcc/src/third_party/crashpad/README.chromium` tendrá una linea `Revision:` con una suma de comprobación
    - Necesitamos verificar la rama correspondiente.
    - El panel de fallos de Google (https://chromium.googlesource.com/crashpad/crashpad)
    - `git clone https://chromium.googlesource.com/crashpad/crashpad`
    - Verifique la rama con la suma de verificación de revisión: 
        - `git checkout <revision checksum>`
    - Agregar la bifurcación del panel de fallos de Electron como un remoto
    - `git remote add electron https://github.com/electron/crashpad`
    - Echa un vistazo a una nueva rama para la actualización
    - `git checkout -b electron-crashpad-vA.B.C.D`
    - `A.B.C.D` es la version de Chromium encontrada en `libcc/VERSION` y será algo como `62.0.3202.94`

2. Haga una lista de verificación de los parches de Electrón que necesitan ser aplicados con `git log --oneline`
    
    - O consulte https://github.com/electron/crashpad/commits/previous-branch-name

3. Para cada parche:
    
    - En `electron-crashpad-vA.B.C.D`, seleccione exclusivamente la suma de comprobación del parche
    - `git cherry-pick <checksum>`
    - Solucione cualquier conflicto
    - Make sure it builds then add, commit, and push work to electron's crashpad fork
    - `git push electron electron-crashpad-vA.B.C.D`

4. Update Electron to build the new crashpad:
    
    - `cd vendor/crashpad`
    - `git fetch`
    - `git checkout electron-crashpad-v62.0.3202.94`
5. Regenerate Ninja files against both targets 
    - From Electron root's root, run `script/update.py`
    - `script/build.py -c D --target=crashpad_client`
    - `script/build.py -c D --target=crashpad_handler`
    - Ambos deberían compilar sin errores
6. Push changes to submodule reference 
    - (From electron root) `git add vendor/crashpad`
    - `git push origin upgrade-to-chromium-62`