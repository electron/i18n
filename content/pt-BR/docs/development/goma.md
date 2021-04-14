# Goma

> Goma é um serviço distribuído de compilador para projetos open-source como Chromium e Android.

O Electron possui uma implantação de um Backend Goma personalizado que nós deixamos disponível para todos que fazem a manutenção do Electron.  Veja a seção [Acesso](#access) abaixo para detalhes sobre autenticação.  Existe também um endpoint Goma `cache-only` que será usado por padrão caso você não tenha credenciais.  Requisições para o cache-only Goma não chamará nosso cluster, mas lerá do nosso cache, o que deve resultar em tempos de build significativamente mais rápidos.

## Habilitando o Goma

Atualmente, a única maneira suportada de utilizar o Goma é usando nossas [Ferramentas de Construção](https://github.com/electron/build-tools). Uma configuração do Goma é automaticamente incluída quando você configurar as `build-tools`.

Se você é um mantenedor e tem acesso ao nosso cluster, por favor, certifique-se de executar `e init` com `--goma=cluster` , a fim de configurar `build-tools` para usar o cluster Goma.  Se você tiver um config existente, você pode apenas definir `"goma": "cluster"` em seu arquivo de configuração.

## Prédio com Goma

Quando você está usando Goma você pode executar `ninja` com um valor de `j` substancialmente maior do que normalmente seria suportado por sua máquina.

Por favor, não defina um valor superior a **200** no Windows ou Linux e **50** no macOS. Monitoramos o uso do sistema Goma, e os usuários que forem abusados -lo com concorrência irracional serão desativados.

```bash
ninja -C out/Testing elétron -j 200
```

Se você estiver usando `build-tools`, os valores `-j` apropriados serão usados automaticamente para você.

## Monitoramento de Goma

Se você acessar [http://localhost:8088](http://localhost:8088) em sua máquina de local, você pode monitorar compilar trabalhos à medida que eles fluem através do sistema goma.

## Acesso

Por razões de segurança e custo, o acesso ao cluster Goma da Electron está atualmente restrito aos Mantenedores de Elétrons.  Se você quiser acesso, vá para `#access-requests` em Slack e ping `@goma-squad` para pedir acesso.  Por favor, esteja ciente de que ser um mantenedor de não *automaticamente* acesso e acesso é determinado em caso a caso.

## Tempo de atividade / Suporte

Temos monitoramento automatizado do nosso cluster e cache Goma em https://status.notgoma.com

Não oferecemos suporte para o uso do Goma e quaisquer questões levantadas pedindo ajuda/ tendo questões _provavelmente_ ser fechados sem muito motivo, não temos a capacidade de lidar com esse tipo de suporte.
