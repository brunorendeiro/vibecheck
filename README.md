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
src/App.tsx       fluxo, perguntas, pontuação e componentes
src/styles.css    identidade visual e responsividade
AGENTS.md         regras para o agente dedicado à app
```

## Próximos passos possíveis

- Testar os textos e pesos das perguntas com utilizadores
- Gerar uma imagem partilhável do resultado
- Adicionar modo inglês
- Publicar num URL próprio
- Avaliar uma análise opcional com IA, sem a tornar obrigatória

O README deve ser atualizado sempre que o comportamento, arquitetura ou prioridades da app mudarem.
