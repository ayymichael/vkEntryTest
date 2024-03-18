import { useState } from 'react'
import {
  Button,
  CellButton,
  Group,
  Panel,
  PanelHeader,
  View,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import './App.css'
import GetAge from './components/GetAge'
import GetFact from './components/GetFact'

function App() {
  const [activePanel, setActivePanel] = useState('panel1')

  return (
    <View activePanel={activePanel}>
      <Panel id="panel1">
        <PanelHeader>Panel 1</PanelHeader>
        <Group
          style={{
            backgroundColor: '#c8c9cc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div>
            <GetFact />
          </div>
          <Button
            style={{ width: '200px' }}
            onClick={() => setActivePanel('panel2')}
          >
            Go to panel 2
          </Button>
          <div style={{ height: 600 }} />
        </Group>
      </Panel>
      <Panel id="panel2">
        <PanelHeader>Panel 2</PanelHeader>
        <Group
          style={{
            backgroundColor: '#c8c9cc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ height: 300 }}>
            <GetAge />
          </div>
          <Button
            style={{ width: '200px' }}
            onClick={() => setActivePanel('panel1')}
          >
            Go to panel 1
          </Button>
          <div style={{ height: 600 }} />
        </Group>
      </Panel>
    </View>
  )
}

export default App
