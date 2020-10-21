# Ações personalizadas do Launcher do Linux Desktop

Em vários ambientes Linux, você pode adicionar entradas personalizadas ao seu launcher modificando o arquivo `.desktop`. Para a documentação do Unity do Canonical, veja [adicionando atalhos a um Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). Para obter detalhes sobre uma implementação mais genérica de , consulte a [➲ esktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

__Atalhos de lançador do Audacious:__

![audaz](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

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
