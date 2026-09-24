import { useEffect } from 'react'
import AdSlot from '../AdSlot'

export default function Sobre() {
  useEffect(() => {
    document.title = 'Como funciona o VibeCheck — Metodologia'
  }, [])

  return (
    <main className="doc-page">
      <article>
        <span className="kicker">O método</span>
        <h1>Como funciona o VibeCheck</h1>

        <p>
          O VibeCheck nasceu de um problema muito comum: todos os dias aparece uma ideia nova
          de app, negócio ou projeto secundário, e é difícil decidir sozinho se vale a pena
          avançar. Em vez de perguntar ao grupo de WhatsApp (que diz sempre que sim), o VibeCheck
          obriga-te a responder a quatro perguntas concretas e devolve um veredicto honesto — e
          um próximo passo prático para o caso de decidires avançar.
        </p>

        <h2>As quatro perguntas</h2>
        <p>
          Cada ideia é avaliada em quatro dimensões, cada uma com um peso diferente na
          pontuação final:
        </p>
        <ul>
          <li><strong>Resolve um problema real? (peso 30%)</strong> — a dimensão mais importante. Uma ideia divertida sem um problema real por trás tende a morrer depois do entusiasmo inicial.</li>
          <li><strong>Conheces alguém que queira usar isto? (peso 25%)</strong> — mede se já existe procura, mesmo que informal, para o que queres construir.</li>
          <li><strong>Consegues prototipar num fim de semana? (peso 20%)</strong> — avalia o esforço necessário para validar a ideia sem um investimento enorme de tempo.</li>
          <li><strong>Quanta vontade tens de começar agora? (peso 25%)</strong> — a motivação importa tanto quanto a lógica: um projeto sem energia raramente chega ao fim.</li>
        </ul>

        <h2>Como calculamos a pontuação</h2>
        <p>
          Cada pergunta é respondida através de um cursor entre 0 e 100. A pontuação final é a
          média ponderada das quatro respostas, arredondada ao número inteiro mais próximo. O
          cálculo acontece inteiramente no teu navegador — nenhuma resposta é enviada para
          nenhum servidor.
        </p>

        <h2>Os quatro veredictos</h2>
        <ul>
          <li><strong>SHIP IT (80 ou mais)</strong> — há problema real, procura e energia suficientes. A recomendação é começar já, com a versão mais pequena possível.</li>
          <li><strong>PROTOTYPE IT (60 a 79)</strong> — a ideia tem potencial, mas ainda precisa de ser testada com um protótipo simples antes de qualquer investimento maior.</li>
          <li><strong>TALK ABOUT IT (40 a 59)</strong> — vale mais a pena conversar com potenciais utilizadores antes de escrever a primeira linha de código.</li>
          <li><strong>SLEEP ON IT (menos de 40)</strong> — a recomendação é guardar a ideia e voltar a avaliá-la mais tarde, com a cabeça mais fria.</li>
        </ul>

        <h2>Porque não usamos inteligência artificial</h2>
        <p>
          O selo "zero IA desperdiçada" que aparece no topo da app não é apenas uma piada: a
          pontuação é calculada com uma fórmula simples e determinística, sempre igual para os
          mesmos valores de entrada. Não há nenhum modelo de linguagem a avaliar a tua ideia —
          apenas aritmética transparente que qualquer pessoa consegue verificar.
        </p>

        <h2>O que fica guardado</h2>
        <p>
          As últimas cinco ideias avaliadas ficam guardadas apenas no <code>localStorage</code>
          do teu navegador, para que as possas consultar mais tarde neste mesmo dispositivo.
          Não existe conta, não existe login e nada é enviado para um servidor. Para mais
          detalhes sobre cookies e publicidade, consulta a{' '}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>

        <h2>Quem fez isto</h2>
        <p>
          O VibeCheck foi criado por Bruno Rendeiro como um pequeno projeto pessoal, parte de um
          conjunto de experiências disponíveis no{' '}
          <a href="https://vibe-portfolio-one.vercel.app/" target="_blank" rel="noreferrer">portfólio</a>.
          Sugestões e críticas são bem-vindas.
        </p>

        <AdSlot />

        <a className="back-link" href="/">← Voltar ao VibeCheck</a>
      </article>
    </main>
  )
}
