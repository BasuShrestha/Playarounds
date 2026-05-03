import { useState } from 'react'
import confetti from 'canvas-confetti'
import './Counter.css'

function Counter() {
  const [items, setItems] = useState([
    { id: 1, label: 'Apples', count: 0 },
    { id: 2, label: 'Bananas', count: 0 },
    { id: 3, label: 'Oranges', count: 0 },
  ])
  const [newLabel, setNewLabel] = useState('')

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newLabel.trim()) {
      const newItem = {
        id: Date.now(),
        label: newLabel.trim(),
        count: 0,
      }
      setItems([...items, newItem])
      setNewLabel('')
    }
  }

  const increment = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    ))
  }

  const decrement = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
    ))
  }

  const resetAll = () => {
    setItems(items.map(item => ({ ...item, count: 0 })))
  }

  const celebrateWinner = () => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00d9ff', '#ff006e', '#8338ec', '#ff9a00', '#38ef7d']
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00d9ff', '#ff006e', '#8338ec', '#ff9a00', '#38ef7d']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  return (
    <div className="counter-container">
      <h1 className="hdr-text">Count Tracker</h1>
      <form onSubmit={addItem} className="add-form">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Enter new label..."
          className="add-input"
        />
        <button type="submit" className="btn btn-plus add-btn">Add</button>
        <button type="button" className="btn btn-reset add-btn" onClick={resetAll}>Reset</button>
        <button type="button" className="btn btn-winner add-btn" onClick={celebrateWinner}>Winner</button>
      </form>
      <div className="items-container">
        {items.map(item => (
          <div key={item.id} className="item-card">
            <span className="item-label">{item.label}</span>
            <div className="item-display">{item.count}</div>
            <div className="item-buttons">
              <button
                className="btn btn-minus"
                onClick={() => decrement(item.id)}
                aria-label={`Decrement ${item.label}`}
              >
                −
              </button>
              <button
                className="btn btn-plus"
                onClick={() => increment(item.id)}
                aria-label={`Increment ${item.label}`}
              >
                +
              </button>
              <button
                className="btn btn-remove"
                onClick={() => setItems(items.filter(i => i.id !== item.id))}
                aria-label={`Remove ${item.label}`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Counter
