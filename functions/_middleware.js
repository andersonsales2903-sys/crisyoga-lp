// Pages Function — redirect de hostname
//
// www.crisyoga.online é o domínio reservado para a Imersão de Meditação
// (evento avulso da Cristína, ver ETAPA 10-C / ETAPA 06-B do doc do projeto).
// A raiz desse domínio deve entregar direto a página de inscrição, sem exigir
// "/imersao/" na URL compartilhada com a Cristína (bio, WhatsApp etc).
//
// O arquivo _redirects do Cloudflare Pages NÃO suporta redirects baseados em
// hostname (só por path) — por isso esse redirect precisa ser feito aqui,
// via Pages Function, checando o header Host da requisição.

export async function onRequest(context) {
  const url = new URL(context.request.url);

  const isImersaoDomain =
    url.hostname === "www.crisyoga.online" || url.hostname === "crisyoga.online";

  if (isImersaoDomain && url.pathname === "/") {
    return Response.redirect(`${url.origin}/imersao/`, 301);
  }

  return context.next();
}
