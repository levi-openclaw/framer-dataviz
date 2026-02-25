import { useState } from 'react'
import { ChartConfig } from '../App'

interface DataScreenProps {
  config: ChartConfig
  onUpdateConfig: (config: ChartConfig) => void
  onContinue: () => void
  onBack: () => void
}

export function DataScreen({ config, onUpdateConfig, onContinue, onBack }: DataScreenProps) {
  const [dataText, setDataText] = useState(
    config.data.map(d => `${d.name},${d.value}`).join('\n')
  )
  const [title, setTitle] = useState(config.title)
  const [color, setColor] = useState(config.color)

  const handleContinue = () => {
    // Parse CSV-like data
    const lines = dataText.trim().split('\n')
    const data = lines
      .map(line => {
        const [name, value] = line.split(',')
        return { name: name?.trim(), value: parseFloat(value?.trim() || '0') }
      })
      .filter(d => d.name && !isNaN(d.value))

    onUpdateConfig({
      ...config,
      title: title || 'My Chart',
      color,
      data: data.length > 0 ? data : config.data,
    })
    onContinue()
  }

  return (
    <>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Configure Data</h2>
      </header>

      <div className="data-editor">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
            Chart Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Chart"
            style={{
              width: '100%',
              padding: 'var(--space-2) var(--space-3)',
              background: 'var(--bg-inset)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '13px',
            }}
          />
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
            Chart Color
          </label>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            {['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6'].map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-sm)',
                  background: c,
                  border: color === c ? '2px solid var(--text-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
            Data (label, value)
          </label>
          <textarea
            className="data-textarea"
            value={dataText}
            onChange={(e) => setDataText(e.target.value)}
            placeholder="Label, Value&#10;Jan, 400&#10;Feb, 300&#10;Mar, 600"
          />
          <div className="data-hint">
            Enter data as CSV format: label, value (one per line)
          </div>
        </div>
      </div>

      <div className="action-footer">
        <button className="btn btn-primary" onClick={handleContinue}>
          Preview Chart
        </button>
      </div>
    </>
  )
}