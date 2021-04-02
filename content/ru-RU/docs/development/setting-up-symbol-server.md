# Настройка сервера символов в отладчике

Символы отладки позволяют лучше отладки сессий. Они содержат информацию функциях, содержащихся в выполнении и динамических библиотеках, и предоставляют информацию для получения чистых стеков вызова. Символ сервер позволяет загружать правильные символы, диз файлы и источники автоматически, не заставляя загружать большие файлы отладки. Сервер функционирует как [сервера символов Microsoft,](https://support.microsoft.com/kb/311503) поэтому документация может быть полезной.

Обратите внимание, что, поскольку выпущенные сборки Electron сильно оптимизированы, отладка не всегда легка. Отггер не сможет показать вам содержание всех переменных и путь выполнения может показаться странным из-за вклинивания, вызовов и других оптимизаций компилятора. Единственным решением является создание локальной сборки.

The official symbol server URL for Electron is https://symbols.electronjs.org. Вы не можете посетить этот URL напрямую, вы должны добавить его в путь символа вашего отладки. В примерах ниже используется локальный каталог кэша, чтобы избежать повторного извлечения PDB с сервера. Замените `c:\code\symbols` соответствующим кэша на вашей машине.

## Использование сервера символов в Windbg

Путь символа Windbg настроен с значением строки, делимитированной звездочкой символами. To use only the Electron symbol server, add the following entry to your symbol path (**Note:** you can replace `c:\code\symbols` with any writable directory on your computer, if you'd prefer a different location for downloaded symbols):

```powershell
SRV*c:\code\symbols\*https://symbols.electronjs.org
```

Установите эту строку `_NT_SYMBOL_PATH` в окружающую среду, используя меню Windbg, или набрав `.sympath` команды. Если вы хотите получить символы от сервера символов Microsoft, вы должны перечислить, что в первую очередь:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://symbols.electronjs.org
```

## Использование сервера символов в Visual Studio

![Инструменты -> варианты](https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg) ![Настройки символов](https://mdn.mozillademos.org/files/2497/2005_options.gif)

## Устранение неполадок: символы не загружаются

Ввемите следующие команды в Windbg, чтобы распечатать, почему символы не загружаются:

```powershell
> !sym шумная
> .reload /f электрон.exe
```
