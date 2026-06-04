import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const STORAGE_KEY = 'markdown-notebook:content'

const SAMPLE = `# Welcome to Markdown Notebook 👋

Type **Markdown** on the left and see it rendered live on the right.

## Features
- Live preview powered by [marked](https://marked.js.org/)
- Safe HTML, sanitized with [DOMPurify](https://github.com/cure53/DOMPurify)
- Auto-saves to your browser (no database)
- Word & character count

## Try it
1. Edit this text
2. Add a \`code block\`
3. Make a list

> Everything stays in your browser. Refresh and it's still here.
`

marked.setOptions({ breaks: true, gfm: true })

export default function App() {
  const [text, setText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) ?? SAMPLE
  })

  // Persist to localStorage whenever the text changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, text)
  }, [text])

  const html = useMemo(() => {
    return DOMPurify.sanitize(marked.parse(text))
  }, [text])

  const stats = useMemo(() => {
    const trimmed = text.trim()
    const words = trimmed ? trimmed.split(/\s+/).length : 0
    return { words, chars: text.length }
  }, [text])

  function clearAll() {
    if (confirm('Clear the notebook? This cannot be undone.')) {
      setText('')
    }
  }

  function resetSample() {
    setText(SAMPLE)
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>📝 Markdown Notebook</h1>
        <div className="actions">
          <span className="stats">
            {stats.words} words · {stats.chars} chars
          </span>
          <button onClick={resetSample}>Sample</button>
          <button onClick={clearAll}>Clear</button>
        </div>
      </header>

      <main className="panes">
        <textarea
          className="editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write some Markdown…"
          spellCheck="false"
        />
        <article
          className="preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <footer className="footer">
        Saved locally in your browser · no account, no database
      </footer>
    </div>
  )
}
