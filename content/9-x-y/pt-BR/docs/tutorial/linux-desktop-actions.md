# Ações personalizadas do Launcher do Linux Desktop

Em vários ambientes Linux, você pode adicionar entradas personalizadas ao seu launcher modificando o arquivo `.desktop`. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

__Atalhos de lançador do Audacious:__

![audaz][3]

Em geral, atalhos são adicionados fornecendo um `Nome` e `Exec` propriedade para cada entrada no menu de atalhos. A unidade executará o campo `Exec` uma vez clicado pelo usuário. O formato é o seguinte:

```plaintext
Ações=PlayPause;Próximo;Anterior

[Ação Desktop PlayPause]
Nome=Play-Pause
Exec=audacious -t
ApenasShowIn=Unity;

[Ação da Área de Trabalho]
Nome=Próximo
Executar=audacious -f
Apenas ShowIn=Unidade;

[Ação da Área de Trabalho Anterior]
Nome=Anterior
Exec=audacious -r
OnlyShowIn=Unity;
```

A maneira preferida da Unity de dizer à sua aplicação o que fazer é usar parâmetros . Você pode encontrá-los em seu aplicativo na variável global `process.argv`.

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
