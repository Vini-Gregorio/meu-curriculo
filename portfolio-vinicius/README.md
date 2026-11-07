# Portfólio — Vinícius Gregório

Site estático em HTML, CSS e JavaScript, sem dependências de execução ou etapa de compilação.

## Conteúdo

- Apresentação direta, com atalhos para os repositórios públicos de `Vini-Gregorio`.
- Sete trabalhos: ContabilWeb, MQ-FIRE, Mirante Canaã, Flo, High Business Class, plataforma MQ-FIRE Academy e gestão das mídias sociais da Academy.
- Link complementar para o Projeto POO, em C# e Windows Forms.
- Filtros **Todos**, **Sistemas**, **Sites** e **Conteúdo**, com contagem de resultados.
- Serviços de desenvolvimento, gestão de mídias sociais, marketing digital e edição de vídeos; formação, experiência e contato por e-mail.

Os links dos projetos públicos foram conferidos em 7 de novembro de 2026. As descrições do ContabilWeb, MQ-FIRE, Flo e Projeto POO consideram o código disponível, além dos READMEs. ContabilWeb está em desenvolvimento inicial; Flo e Projeto POO são estudos com partes incompletas. High Business Class e a plataforma Academy são apresentados sem links de acesso público. A atuação em mídias sociais da MQ-FIRE Academy aparece em um cartão próprio, com links para Instagram e TikTok; o identificador `mqfireacademy` foi confirmado no Metricool conectado em 7 de novembro de 2026. Não são publicadas métricas de conta ou resultados não informados.

## Visualizar localmente

Abra `index.html` no navegador ou execute na pasta do projeto:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Acesse `http://localhost:8000`.

## Arquivos

```text
index.html       textos, projetos e metadados
styles.css       visual, responsividade e foco visível
script.js        menu, filtros, contagem e cópia de e-mail
assets/          capturas dos projetos
```

As quatro capturas existentes permanecem na pasta `assets/screenshots/`. ContabilWeb e Flo usam diagramas da estrutura do código, identificados no próprio cartão. Para substituir as capturas, consulte [o guia de imagens](assets/screenshots/LEIA-ME.md).

Sem JavaScript, os projetos, os detalhes e a navegação continuam acessíveis. O menu recolhível, os filtros e a cópia de e-mail dependem de JavaScript. Se a cópia não estiver disponível, o botão abre o aplicativo de e-mail. O site respeita a preferência por menos movimento.

## Publicar no GitHub Pages

1. Envie estes arquivos e a pasta `assets` para um repositório público de sua escolha.
2. Em **Settings → Pages**, selecione **Deploy from a branch**, a branch desejada e `/ (root)`.
3. Use a URL retornada pelo GitHub Pages; ela depende do nome do repositório.

Nenhum formulário coleta dados. Não há backend neste portfólio. As fontes são carregadas do Google Fonts, com alternativas locais no CSS.
