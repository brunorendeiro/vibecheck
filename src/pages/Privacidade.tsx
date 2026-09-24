import { useEffect } from 'react'
import AdSlot from '../AdSlot'

export default function Privacidade() {
  useEffect(() => {
    document.title = 'Política de Privacidade — VibeCheck'
  }, [])

  return (
    <main className="doc-page">
      <article>
        <span className="kicker">Legal</span>
        <h1>Política de Privacidade</h1>
        <p className="doc-updated">Última atualização: setembro de 2026</p>

        <p>
          Esta página explica que dados o VibeCheck (<code>vibecheck-psi-sand.vercel.app</code>)
          recolhe, para que servem e que escolhas tens sobre eles.
        </p>

        <h2>A tua ideia e as tuas respostas</h2>
        <p>
          O texto que escreves e as respostas que dás nos cursores ficam apenas no
          <code> localStorage</code> do teu navegador, no teu dispositivo. Nunca são enviados
          para nenhum servidor nosso — nem sequer temos um servidor a guardar esses dados. Se
          limpares os dados do site no navegador, ou usares outro dispositivo, essas ideias
          desaparecem.
        </p>

        <h2>Cookies e consentimento</h2>
        <p>
          Ao visitar o VibeCheck pela primeira vez, é-te pedido consentimento para usar cookies
          de análise e de publicidade. Enquanto não aceitares, nenhum destes scripts é
          carregado. Podes recusar e continuar a usar a app normalmente — a funcionalidade
          principal não depende de cookies.
        </p>

        <h2>Google Analytics</h2>
        <p>
          Se aceitares, usamos o Google Analytics (GA4) para perceber quantas pessoas visitam o
          site, de onde vêm e que páginas usam mais. Estes dados são agregados e não incluem o
          conteúdo das ideias que escreves. Podes saber mais sobre como a Google trata estes
          dados na{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Política de Privacidade da Google
          </a>.
        </p>

        <h2>Google AdSense</h2>
        <p>
          Se aceitares, o site pode apresentar anúncios fornecidos pela Google através do
          Google AdSense. A Google e os seus parceiros podem usar cookies para personalizar os
          anúncios com base nas tuas visitas a este e a outros sites. Podes gerir ou desativar
          a personalização de anúncios diretamente nas{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer">
            Definições de Anúncios da Google
          </a>{' '}
          e consultar como os anúncios funcionam na página{' '}
          <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer">
            Como a Google usa cookies em publicidade
          </a>.
        </p>

        <h2>Os teus direitos</h2>
        <p>
          Como não guardamos dados pessoais em servidores próprios, não há nada nosso para
          apagar a pedido — a informação já está sob o teu controlo, no teu navegador. Para
          questões sobre esta política, sobre o Analytics ou sobre os anúncios, podes escrever
          para <a href="mailto:brunorendeiro88@gmail.com">brunorendeiro88@gmail.com</a>.
        </p>

        <h2>Alterações a esta política</h2>
        <p>
          Esta política pode ser atualizada sempre que o comportamento da app mudar. A data no
          topo desta página reflete a última revisão.
        </p>

        <AdSlot />

        <a className="back-link" href="/">← Voltar ao VibeCheck</a>
      </article>
    </main>
  )
}
