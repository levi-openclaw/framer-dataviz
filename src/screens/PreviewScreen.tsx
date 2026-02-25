import { ChartConfig } from '../App'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface PreviewScreenProps {
  config: ChartConfig
  onBack: () => void
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#14b8a6']

export function PreviewScreen({ config, onBack }: PreviewScreenProps) {
  const renderChart = () => {
    switch (config.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={config.data}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill={config.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={config.data}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke={config.color} strokeWidth={2} dot={{ fill: config.color }} />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={config.data}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke={config.color} fill={config.color} fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={config.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {config.data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={config.data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar name="Value" dataKey="value" stroke={config.color} fill={config.color} fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        )
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={config.data}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill={config.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'gauge':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={config.data.slice(0, 1)}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 'dataMax * 1.2']} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill={config.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'funnel':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={config.data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={50} />
              <Tooltip />
              <Bar dataKey="value" fill={config.color} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <>
      <header className="screen-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>Preview</h2>
      </header>

      <div className="preview-container">
        <div className="chart-preview">
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: 'var(--space-3)', color: '#1D1C1A' }}>
            {config.title}
          </h3>
          {renderChart()}
        </div>
      </div>

      <div className="action-footer">
        <button className="btn btn-primary full-width">
          Add to Framer Site
        </button>
      </div>
    </>
  )
}