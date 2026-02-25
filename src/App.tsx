import { useState } from 'react'
import { HomeScreen } from './screens/HomeScreen'
import { ChartTypeScreen } from './screens/ChartTypeScreen'
import { DataScreen } from './screens/DataScreen'
import { PreviewScreen } from './screens/PreviewScreen'

export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'scatter' | 'radar' | 'gauge' | 'funnel'

export interface ChartConfig {
  type: ChartType
  title: string
  data: { name: string; value: number }[]
  color: string
}

const DEFAULT_DATA = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
]

const CHART_ICONS: Record<ChartType, string> = {
  bar: '📊',
  line: '📈',
  pie: '🥧',
  area: '⛰️',
  scatter: '⚡',
  radar: '🕸️',
  gauge: '🎯',
  funnel: '🔻',
}

export function App() {
  const [screen, setScreen] = useState<'home' | 'chart-type' | 'data' | 'preview'>('home')
  const [config, setConfig] = useState<ChartConfig>({
    type: 'bar',
    title: 'My Chart',
    data: DEFAULT_DATA,
    color: '#6366f1',
  })

  const goToChartType = () => setScreen('chart-type')
  const goToData = () => setScreen('data')
  const goToPreview = () => setScreen('preview')
  const goBack = () => {
    const order = ['home', 'chart-type', 'data', 'preview']
    const idx = order.indexOf(screen)
    if (idx > 0) setScreen(order[idx - 1] as any)
  }

  return (
    <div className="app">
      {screen === 'home' && (
        <HomeScreen 
          chartCount={0} 
          onCreate={goToChartType} 
        />
      )}
      {screen === 'chart-type' && (
        <ChartTypeScreen
          selectedType={config.type}
          onSelect={(type) => setConfig({ ...config, type })}
          onContinue={goToData}
          onBack={goBack}
        />
      )}
      {screen === 'data' && (
        <DataScreen
          config={config}
          onUpdateConfig={setConfig}
          onContinue={goToPreview}
          onBack={goBack}
        />
      )}
      {screen === 'preview' && (
        <PreviewScreen
          config={config}
          onBack={goBack}
        />
      )}
    </div>
  )
}

export { CHART_ICONS }