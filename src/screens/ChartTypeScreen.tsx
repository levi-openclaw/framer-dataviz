import { ChartType, CHART_ICONS } from '../App'

const CHART_TYPES: { type: ChartType; name: string }[] = [
  { type: 'bar', name: 'Bar' },
  { type: 'line', name: 'Line' },
  { type: 'pie', name: 'Pie' },
  { type: 'area', name: 'Area' },
  { type: 'scatter', name: 'Scatter' },
  { type: 'radar', name: 'Radar' },
  { type: 'gauge', name: 'Gauge' },
  { type: 'funnel', name: 'Funnel' },
]

interface ChartTypeScreenProps {
  selectedType: ChartType
  onSelect: (type: ChartType) => void
  onContinue: () => void
  onBack: () => void
}

export function ChartTypeScreen({ selectedType, onSelect, onContinue, onBack }: ChartTypeScreenProps) {
  return (
    <>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Select Chart Type</h2>
      </header>

      <div className="chart-types-grid">
        {CHART_TYPES.map(({ type, name }) => (
          <button
            key={type}
            className={`chart-type-btn ${selectedType === type ? 'selected' : ''}`}
            onClick={() => onSelect(type)}
          >
            <span className="chart-type-icon">{CHART_ICONS[type]}</span>
            <span className="chart-type-name">{name}</span>
          </button>
        ))}
      </div>

      <div className="action-footer">
        <button className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </>
  )
}