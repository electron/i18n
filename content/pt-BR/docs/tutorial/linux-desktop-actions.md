# Ações personalizadas do Launcher do Linux Desktop

## Visão Geral

Em muitos ambientes Linux, você pode adicionar entradas personalizadas ao lançador do sistema modificando o arquivo `.desktop` . Para obter a documentação da Unidade da Canonical, consulte [adicionando atalhos a um][unity-launcher]do Launcher . Para obter detalhes sobre uma implementação mais genérica , consulte o</a>de Especificação

freedesktop.org .</p> 

![audaz][2]



> NOTA: A captura de tela acima é um exemplo de atalhos de lançamento no Audacious leitor de áudio

Para criar um atalho, você precisa fornecer propriedades `Name` e `Exec` para a entrada que deseja adicionar ao menu de atalho. A Unity executará o comando definido no campo `Exec` depois que o usuário clicar no item do menu do atalho. Um exemplo do arquivo `.desktop` pode parecer o seguinte:



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


A maneira preferida da Unity instruir sua aplicação sobre o que fazer é usando parâmetros. Você pode encontrá-los em sua aplicação na variável global `process.argv`.

[2]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
