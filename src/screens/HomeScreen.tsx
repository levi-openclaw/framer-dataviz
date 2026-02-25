interface HomeScreenProps {
  chartCount: number
  onCreate: () => void
}

export function HomeScreen({ chartCount, onCreate }: HomeScreenProps) {
  return (
    <>
      <header className="plugin-header">
        <div className="logo">
          <div className="logo-icon">📊</div>
          <div className="logo-text">
            <h1>Data Charts</h1>
            <p>Create beautiful visualizations</p>
          </div>
        </div>
      </header>

      <div style={{ flex: 1, padding: 'var(--space-4)', overflow: 'auto' }}>
        {chartCount === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <div className="empty-title">No Charts Yet</div>
            <div className="empty-desc">
              Create your first chart to visualize data on your Framer site
            </div>
            <button className="btn btn-primary" onClick={onCreate} style={{ marginTop: 'var(--space-3)' }}>
              Create Chart
            </button>
          </div>
        ) : (
          <div>
            <div className="stats">
              <div className="stat-card">
                <div className="stat-value">{chartCount}</div>
                <div className="stat-label">Total Charts</div>
              </div>
            </div>
          </div>
        )}

        <div className="features-list">
          <h3>Chart Types</h3>
          <ul>
            <li>📊 Bar & Column Charts</li>
            <li>📈 Line & Area Charts</li>
            <li>🥧 Pie & Donut Charts</li>
            <li>⚡ Scatter Plots</li>
            <li>🕸️ Radar Charts</li>
            <li>🎯 Gauge Charts</li>
          </ul>
        </div>

        <div className="features-list">
          <h3>Data Sources</h3>
          <ul>
            <li>📝 Manual Data Entry</li>
            <li>📁 CSV Upload</li>
            <li>🔗 JSON Import</li>
            <li>☁️ Google Sheets (Pro)</li>
          </ul>
        </div>
      </div>
    </>
  )
}