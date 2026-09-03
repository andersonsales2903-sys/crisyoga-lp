# LP CrisYoga — guia de configuração e publicação

Página estática (`index.html`), sem framework, sem backend próprio. Feita pra ser publicada no Netlify e mantida facilmente por qualquer pessoa (edição direta do HTML, sem build).

## 1. Configurar o WhatsApp e ligar/desligar tracking

Tudo fica no topo do `index.html`, dentro de `window.CRISYOGA_CONFIG`:

```js
window.CRISYOGA_CONFIG = {
  WHATSAPP_NUMBER: "5511915287421",   // já preenchido com o número da Cristina
  SHEET_WEBHOOK_URL: "",              // cole aqui a URL do Apps Script (passo 2)
  GA4_MEASUREMENT_ID: "",             // cole o ID do GA4 quando existir (ex: G-XXXXXXX)
  META_PIXEL_ID: ""                   // cole o ID do Pixel da Meta quando existir
};
```

Enquanto `SHEET_WEBHOOK_URL`, `GA4_MEASUREMENT_ID` e `META_PIXEL_ID` estiverem vazios, a página funciona normalmente — só não grava na planilha nem dispara eventos (sem erro no console).

## 2. Configurar a captura de lead no Google Sheets (~5 min)

Isso precisa ser feito manualmente uma vez, na conta Google que vai ser dona da planilha (pode ser a sua ou a da Cristina) — a publicação de um Apps Script como "Web App" exige autorização feita no navegador, não dá pra automatizar por API.

1. Crie uma Google Sheet nova (pode chamar "CrisYoga - Leads").
2. Menu **Extensões → Apps Script**.
3. Apague o código de exemplo e cole o conteúdo do arquivo `apps-script.gs` (está nesta mesma pasta).
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**.
   - Executar como: **Eu** (sua conta).
   - Quem pode acessar: **Qualquer pessoa**.
5. Autorize as permissões pedidas (é a sua própria planilha).
6. Copie a **URL do app da Web** gerada (termina em `/exec`).
7. Cole essa URL em `SHEET_WEBHOOK_URL` no `index.html`.

A aba "Leads" é criada automaticamente no primeiro envio, com as colunas: Data/Hora, Nome, WhatsApp, Modalidade, Formato, Origem, Página.

**Se um dia precisar trocar de planilha**: repita os passos 2-7 numa Sheet nova — o código não muda.

## 3. Tracking (GA4 / Meta Pixel)

Eventos já implementados no `index.html`:

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `cta_click` | Clique em qualquer botão de CTA (nav, hero, WhatsApp flutuante, form) | `local` |
| `form_submit` | Envio do formulário de agendamento | `modalidade`, `formato` |
| `whatsapp_click` | No momento do redirecionamento pro WhatsApp | `origem` |

Assim que tiver os IDs reais, é só colar em `GA4_MEASUREMENT_ID` (formato `G-XXXXXXX`) e `META_PIXEL_ID` (formato numérico) — os scripts do Google/Meta são carregados automaticamente pela própria página, sem precisar mexer em mais nada.

## 4. Publicar no Netlify

Sem domínio próprio ainda, então o destino é o preview padrão `*.netlify.app`. Basta subir a pasta (`index.html` + este README, que não interfere no site) como um novo site estático no Netlify — sem build command, sem variáveis de ambiente.

## 5. Pendências antes de considerar a LP "pronta" (ver critérios de aceite do LP Engine)

- [ ] Configurar `SHEET_WEBHOOK_URL` (passo 2 acima).
- [ ] Fotos reais do studio/aulas e, se possível, depoimentos — hoje a página não usa nenhuma imagem real, só ícones e cores da marca.
- [ ] Logo em PNG/SVG transparente da Cristina (hoje a página usa um wordmark tipográfico + ícone genérico, porque só existiam prints do editor Canva).
- [ ] IDs de GA4 e Meta Pixel.
- [ ] Revisar o texto de privacidade no rodapé com a Cristina antes do lançamento (LGPD — dado mínimo coletado: nome e WhatsApp).
- [ ] QA mobile real (não só redimensionar o navegador) antes de divulgar.
