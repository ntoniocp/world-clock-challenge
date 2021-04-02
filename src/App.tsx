import './App.css';

import {useMemo} from 'react'
import SearchBar from './components/SearchBar'
import CardsContainer from './components/CardsContainer'
import TimezoneCard from './components/TimezoneCard'

import useTimezones from './hooks/useTimezones'
import { Timezone } from './models/timezone'

/* TODO:
  - A;adir los tests
  - Revisar el tipado
  - Cambiar el UI
  - A;adir disabled al search bar para cuando se mande la peticion
*/

function App() {
  const [timezones, selectedTimezones, selectTimezone, deselectTimezone] = useTimezones({
    initialSelected: [],
    updateListEvery: 5000
  })

  const autoComplete = useMemo(() => {
    return timezones.filter((tz: string) => !selectedTimezones.find((stz: Timezone) => stz.name === tz))
  }, [timezones])

  return (
    <> 
      <div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
        <SearchBar 
          options={autoComplete}
          maxSuggestions={8}
          onSearch={(name: string) => selectTimezone(name)} 
        />
      </div>
      <CardsContainer>
        {selectedTimezones.map((tz: Timezone) => (
          <TimezoneCard 
            name={tz.name}
            date={tz.date || ''}
            time={tz.time || ''}
            onClose={() => deselectTimezone(tz.name)}
            key={tz.name} 
          />
        ))}
      </CardsContainer>
    </>
  );
}

export default App;
