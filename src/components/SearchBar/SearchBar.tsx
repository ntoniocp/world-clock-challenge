import { useState, useRef, useEffect } from 'react'
import styles from './SearchBar.module.css'
import useClickedOutside from '../../hooks/useClickedOutside'

interface Props {
  onSearch: Function,
  options: Array<any>,
  maxSuggestions?: number
}

export default function SearchBar({ onSearch, options, maxSuggestions } : Props) {
  const [isShowingOptions, setIsShowingOptions] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState(options)

  useEffect(() => setFilteredOptions(options), [options])

  const containerNode: any = useRef(null)
  useClickedOutside(containerNode.current, () => setIsShowingOptions(false))

  const handleKeyDown = ({keyCode, target: input}: {keyCode: number, target: any}) => {
    const enter = 13
    const backspace = 8

    switch(keyCode) {
      case enter: {
        setIsShowingOptions(false)
        onSearch(input.value)
        input.value = ''
        break;
      }
      case backspace: {
        if (input.value.length === 1) setIsShowingOptions(false);
        const filtered = options.filter(opt => opt.includes(input.value))
        setFilteredOptions(() => filtered)
        break;
      }
      default: {
        const typedChar = String.fromCharCode(keyCode).toLowerCase();
        const filtered = options.filter(opt => {
          const lowerCasedOpt = opt.toLowerCase()
          const lowerCasedInputValue = input.value.toLowerCase() 

          return lowerCasedOpt.includes(`${lowerCasedInputValue}${typedChar}`)
        });

        setFilteredOptions(() => filtered)
        setIsShowingOptions(true)
      }
    }
  }

  const handleOptionClick = (tz: string) => {
    onSearch(tz)
    setIsShowingOptions(false)
  }

  return (
    <div 
      className={styles['searchbar_container']} 
      ref={containerNode}
    >
      <input 
        type="text" 
        className={styles.input} 
        onKeyDown={handleKeyDown}
        data-testid="search-bar-input"
      />
      {isShowingOptions && 
        <div className={styles['autocomplete']} data-testid="autocomplete-options-container">
          {
            filteredOptions.slice(0, maxSuggestions).map(tz => 
              <div 
                key={tz}
                className={styles['autocomplete_option']} 
                onClick={() => handleOptionClick(tz)}  
              >
                {tz}
              </div>
            )
          }
        </div> 
      }
    </div>
  )
}
