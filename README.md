# VibeCheck

Mini app divertida que responde à pergunta: “Devo construir esta ideia?”

## Resumo

O utilizador escreve uma ideia, responde a quatro perguntas através de sliders e recebe uma pontuação entre 0 e 100. O resultado produz um de quatro veredictos:

- `SHIP IT`: começar a construir
- `PROTOTYPE IT`: testar rapidamente
- `TALK ABOUT IT`: falar primeiro com potenciais utilizadores
- `SLEEP ON IT`: guardar a ideia e voltar mais tarde

O resultado inclui um próximo passo concreto e pode ser partilhado. As últimas cinco ideias ficam guardadas apenas no `localStorage` do navegador.

## Estado atual

- Primeira versão funcional
- Sem autenticação
- Sem backend
- Sem integração de IA
- Interface responsiva
- Pontuação calculada localmente
- Histórico local e partilha nativa/cópia
- Páginas de conteúdo `/sobre` (metodologia) e `/privacidade` (política de privacidade)
- Google AdSense com unidades de anúncio manuais (sem auto ads) apenas em ecrãs com conteúdo real

## Executar

```bash
npm install
npm run dev
```

A app usa por defeito `http://127.0.0.1:5174` quando executada juntamente com o portfólio.

## Validar

```bash
npm run check
npm run build
```

## Arquitetura

```text
src/App.tsx           fluxo, perguntas, pontuação e componentes; routing simples por pathname
src/analytics.ts       carregamento de GA4 e AdSense, sempre dependente de consentimento
src/AdSlot.tsx          unidade de anúncio manual e responsiva, só usada em ecrãs com conteúdo real
src/pages/Sobre.tsx      metodologia e explicação do cálculo da pontuação (/sobre)
src/pages/Privacidade.tsx  política de privacidade (/privacidade)
src/styles.css          identidade visual e responsividade
vercel.json             rewrite para servir index.html em qualquer rota (SPA sem router)
AGENTS.md               regras para o agente dedicado à app
```

## Estratégia de anúncios

O AdSense rejeitou uma submissão anterior por "anúncios publicados em ecrãs sem conteúdo do
publicador" e "conteúdo de baixo valor". A causa era o auto ads (`enable_page_level_ads`), que
coloca anúncios em qualquer ecrã — incluindo o ecrã do quiz, que tem muito pouco texto. A
correção:

- Auto ads desligados em `analytics.ts`.
- Unidade de anúncio manual e responsiva (`AdSlot`, slot `9391100354`) colocada apenas no ecrã
  de resultado e nas páginas `/sobre` e `/privacidade`, que têm conteúdo textual substancial.
- Nunca colocar `AdSlot` nos ecrãs `intro` ou `quiz` — são os ecrãs mais pobres em conteúdo.

Depois de o site ser reaprovado, novas unidades de anúncio podem ser adicionadas, mas sempre
seguindo esta regra: só em ecrãs com conteúdo real.

## Próximos passos possíveis

- Testar os textos e pesos das perguntas com utilizadores
- Gerar uma imagem partilhável do resultado
- Adicionar modo inglês
- Publicar num URL próprio
- Avaliar uma análise opcional com IA, sem a tornar obrigatória

O README deve ser atualizado sempre que o comportamento, arquitetura ou prioridades da app mudarem.

## Nota técnica — Google Analytics

O Analytics só é carregado depois de o utilizador aceitar os cookies. A função
`gtag` deve enviar o objeto nativo `arguments` para `dataLayer`:

```js
function gtag() {
  dataLayer.push(arguments)
}
```

Não substituir por `dataLayer.push(args)` com um rest parameter (`...args`):
apesar de o script da Google carregar, o comando `config` e o `page_view` podem
não ser processados.
