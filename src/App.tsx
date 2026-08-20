import { useEffect, useMemo, useState } from 'react'
import { getStoredConsent, loadAnalytics, loadAds } from './analytics'
import CookieConsent from './CookieConsent'

type Stage = 'intro' | 'quiz' | 'result'
type Scores = Record<string, number>
type HistoryItem = { idea: string; score: number; label: string; date: string }

const questions = [
  {
    id: 'problem',
    number: '01',
    title: 'Isto resolve um problema real?',
    hint: '“Eu acho giro” não é exatamente um problema real.',
    low: 'Nem por isso',
    high: 'Dói todos os dias',
    weight: 0.3,
  },
  {
    id: 'people',
    number: '02',
    title: 'Conheces alguém que queira usar isto?',
    hint: 'A tua mãe conta, mas só vale meio ponto.',
    low: 'Só eu',
    high: 'Já estão a pedir',
    weight: 0.25,
  },
  {
    id: 'weekend',
    number: '03',
    title: 'Consegues prototipar num fim de semana?',
    hint: 'A primeira versão não precisa de conquistar Marte.',
    low: 'Talvez em 2032',
    high: 'Hoje à noite',
    weight: 0.2,
  },
  {
    id: 'energy',
    number: '04',
    title: 'Quanta vontade tens de começar agora?',
    hint: 'Sê honesto. Há uma nova série à tua espera.',
    low: 'Prefiro uma sesta',
    high: 'Abre o editor!',
    weight: 0.25,
  },
] as const

const resultFor = (score: number) => {
  if (score >= 80) return {
    label: 'SHIP IT', emoji: '🚀', tone: 'ship',
    title: 'Para de pensar. Começa a construir.',
    message: 'Há problema, vontade e espaço para um protótipo. Faz a versão mais pequena possível e põe-na nas mãos de alguém.',
    task: 'Define apenas uma funcionalidade principal e cria-a nas próximas 48 horas.',
  }
  if (score >= 60) return {
    label: 'PROTOTYPE IT', emoji: '🛠️', tone: 'prototype',
    title: 'Há qualquer coisa aqui.',
    message: 'A ideia tem boa energia, mas ainda precisa de provar que não vive apenas na tua cabeça. Um protótipo feio é o próximo passo certo.',
    task: 'Mostra um protótipo a três pessoas antes de acrescentares mais funcionalidades.',
  }
  if (score >= 40) return {
    label: 'TALK ABOUT IT', emoji: '☕', tone: 'talk',
    title: 'Conversa primeiro. Código depois.',
    message: 'Ainda existem algumas nuvens à volta desta ideia. Antes de abrir o editor, confirma que o problema também incomoda outras pessoas.',
    task: 'Fala com cinco potenciais utilizadores e pergunta como resolvem este problema hoje.',
  }
  return {
    label: 'SLEEP ON IT', emoji: '🛌', tone: 'sleep',
    title: 'Talvez fosse o café a falar.',
    message: 'Nem todas as ideias precisam de se transformar numa app. Guarda esta, dorme bem e vê se amanhã ainda parece revolucionária.',
    task: 'Escreve a ideia numa frase e volta a lê-la daqui a sete dias.',
  }
}

const loadHistory = (): HistoryItem[] => {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem('vibecheck-history') ?? '[]')
    if (!Array.isArray(stored)) return []
    return stored.filter((item): item is HistoryItem => {
      if (!item || typeof item !== 'object') return false
      const candidate = item as Partial<HistoryItem>
      return typeof candidate.idea === 'string'
        && typeof candidate.score === 'number'
        && typeof candidate.label === 'string'
        && typeof candidate.date === 'string'
    }).slice(0, 5)
  }
  catch { return [] }
}

function Logo() {
  return <div className="logo" aria-label="VibeCheck"><span>V</span><strong>VibeCheck</strong><small>beta-ish</small></div>
}

export default function App() {
  const [stage, setStage] = useState<Stage>('intro')
  const [idea, setIdea] = useState('')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [scores, setScores] = useState<Scores>(() => Object.fromEntries(questions.map(question => [question.id, 50])))
  const [history, setHistory] = useState<HistoryItem[]>(loadHistory)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (getStoredConsent() === 'granted') {
      loadAnalytics()
      loadAds()
    }
  }, [])

  const score = useMemo(() => Math.round(questions.reduce((total, question) => total + scores[question.id] * question.weight, 0)), [scores])
  const result = resultFor(score)
  const question = questions[questionIndex]

  const start = () => {
    if (!idea.trim()) return
    setStage('quiz')
    setQuestionIndex(0)
  }

  const finish = () => {
    const outcome = resultFor(score)
    const entry: HistoryItem = { idea: idea.trim(), score, label: outcome.label, date: new Date().toLocaleDateString('pt-PT') }
    const nextHistory = [entry, ...history.filter(item => item.idea.toLowerCase() !== entry.idea.toLowerCase())].slice(0, 5)
    setHistory(nextHistory)
    localStorage.setItem('vibecheck-history', JSON.stringify(nextHistory))
    setStage('result')
  }

  const reset = () => {
    setStage('intro')
    setIdea('')
    setQuestionIndex(0)
    setScores(Object.fromEntries(questions.map(item => [item.id, 50])))
    setCopied(false)
  }

  const share = async () => {
    const text = `A minha ideia “${idea}” teve ${score}% no VibeCheck: ${result.label} ${result.emoji}`
    if (navigator.share) {
      try { await navigator.share({ title: 'O meu VibeCheck', text }); return } catch { /* partilha cancelada */ }
    }
    try {
      if (!navigator.clipboard) throw new Error('Clipboard indisponível')
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('Copia o teu resultado:', text)
    }
  }

  return <div className={`app stage-${stage}`}>
    <header>
      <button className="logo-button" onClick={reset} aria-label="Voltar ao início"><Logo /></button>
      <div className="tiny-status"><i /> zero IA desperdiçada</div>
    </header>

    {stage === 'intro' && <main className="intro-screen">
      <div className="intro-copy">
        <span className="kicker">O teste cientificamente duvidoso</span>
        <h1>Devo construir<br />esta <em>ideia?</em></h1>
        <p>Quatro perguntas. Um veredicto brutalmente honesto. Provavelmente melhor do que perguntar ao teu grupo de WhatsApp.</p>
        <form onSubmit={(event) => { event.preventDefault(); start() }}>
          <label htmlFor="idea">Qual é a grande ideia?</label>
          <div className="idea-input">
            <input id="idea" value={idea} onChange={event => setIdea(event.target.value)} maxLength={70} placeholder="Uma app que..." autoFocus />
            <button type="submit" disabled={!idea.trim()} aria-label="Começar teste">→</button>
          </div>
          <small>{idea.length}/70 · Não vamos roubar a tua ideia, prometido.</small>
        </form>
      </div>
      <div className="intro-art" aria-hidden="true">
        <div className="stamp">100%<br /><span>vibes</span></div>
        <div className="idea-card card-one"><span>💡</span><p>“É tipo Uber,<br />mas para plantas.”</p></div>
        <div className="idea-card card-two"><span>🤔</span><p>problema real<br /><s>feature fixe</s></p></div>
        <div className="scribble">ship it?</div>
      </div>
      {history.length > 0 && <section className="history">
        <div className="history-title"><span>Ideias recentes</span><small>guardadas apenas neste dispositivo</small></div>
        <div className="history-list">{history.slice(0, 3).map((item, index) => <button key={`${item.idea}-${index}`} onClick={() => setIdea(item.idea)}><span>{item.idea}</span><strong>{item.score}%</strong><small>{item.label}</small></button>)}</div>
      </section>}
    </main>}

    {stage === 'quiz' && <main className="quiz-screen">
      <div className="quiz-top">
        <button onClick={() => questionIndex === 0 ? setStage('intro') : setQuestionIndex(questionIndex - 1)}>← Voltar</button>
        <span>Pergunta {questionIndex + 1} de {questions.length}</span>
      </div>
      <div className="progress"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
      <section className="question-card" key={question.id}>
        <span className="question-number">{question.number}</span>
        <h2>{question.title}</h2>
        <p>{question.hint}</p>
        <div className="range-wrap" style={{ '--value': `${scores[question.id]}%` } as React.CSSProperties}>
          <output aria-live="polite">{scores[question.id]}%</output>
          <input type="range" min="0" max="100" step="5" value={scores[question.id]} onChange={event => setScores(current => ({ ...current, [question.id]: Number(event.target.value) }))} aria-label={question.title} />
          <div><span>{question.low}</span><span>{question.high}</span></div>
        </div>
        <button className="next-button" onClick={() => questionIndex === questions.length - 1 ? finish() : setQuestionIndex(questionIndex + 1)}>
          {questionIndex === questions.length - 1 ? 'Revelar o meu destino' : 'Próxima pergunta'} <span>→</span>
        </button>
      </section>
    </main>}

    {stage === 'result' && <main className={`result-screen ${result.tone}`}>
      <div className="confetti" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <i key={index} />)}</div>
      <section className="result-card">
        <span className="result-overline">O veredicto para “{idea}”</span>
        <div className="score-ring" style={{ '--score': `${score * 3.6}deg` } as React.CSSProperties}>
          <div><strong>{score}</strong><span>%</span></div>
        </div>
        <div className="verdict"><span>{result.emoji}</span><strong>{result.label}</strong></div>
        <h1>{result.title}</h1>
        <p>{result.message}</p>
        <div className="next-task"><span>O teu próximo passo</span><p>{result.task}</p></div>
        <div className="result-actions">
          <button className="share-button" onClick={share}>{copied ? 'Copiado! ✓' : 'Partilhar resultado'} </button>
          <button className="again-button" onClick={reset}>Testar outra ideia</button>
        </div>
      </section>
    </main>}

    <footer>
      <span>Feito para pessoas com demasiadas ideias.</span>
      <span>Sem contas · Sem julgamentos sérios</span>
      <a href="https://vibe-portfolio-one.vercel.app/" target="_blank" rel="noreferrer">Created by Bruno Rendeiro</a>
      <span className="powered-badge">⚡ Powered by AI</span>
    </footer>
    <CookieConsent />
  </div>
}
