import { render, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

const props = {
  onSearch: () => {},
  options: ['Timezone AA', 'Timezone BB', 'Timezone AB', 'Timezone CA'],
  maxSuggestions: 2
}

describe('SearchBar component', () => {
  test('It shows suggestions based on typed string (Only if matches)', () => {    
    const testProps = {...props, maxSuggestions: 3}
    const {getByTestId} = render(<SearchBar {...testProps} />)
    
    const inputField: any = getByTestId('search-bar-input')
    userEvent.type(inputField, 'Timezone')

    const optionsContainer = getByTestId('autocomplete-options-container')
    expect(optionsContainer).toBeInTheDocument()
    expect(optionsContainer.children.length).toBe(3)

    inputField.focus()
    userEvent.type(inputField, ' AA')    

    expect(optionsContainer.children.length).toBe(1)
  })

  test('It executes search when the user presses enter key', () => {
    const testProps = {...props, onSearch: jest.fn()}
    const {getByTestId} = render(<SearchBar {...testProps} />)
    const inputField: any = getByTestId('search-bar-input')
    
    userEvent.type(inputField, 'a')
    userEvent.type(inputField, '{enter}')
    expect(testProps.onSearch).toHaveBeenCalledWith('a')

  })
  
  test('It hides the suggested options when the user clears the input field', async () => {
    const testProps = {...props, maxSuggestions: 1}
    
    const {getByTestId, queryByTestId} = render(<SearchBar {...testProps} />)

    const inputField: any = getByTestId('search-bar-input')
    userEvent.type(inputField, 'a')

    const optionsContainer = queryByTestId('autocomplete-options-container')
    expect(optionsContainer).toBeInTheDocument()
       
    userEvent.type(inputField, '{backspace}')
    
    expect(optionsContainer).not.toBeInTheDocument()
  })

  test(`It doesn't show suggestions when the user haven't typed on the input`, () => {
    const {queryByTestId} = render(<SearchBar {...props} />)
    expect(queryByTestId('autocomplete-options-container')).not.toBeInTheDocument()
  })

  test('It executes search when the user clicked a suggested option', () => {
    const testProps = {...props, onSearch: jest.fn()}
    const {getByTestId} = render(<SearchBar {...testProps} />)

    const inputField: any = getByTestId('search-bar-input')    
    userEvent.type(inputField, 'a')

    const optionsContainer = getByTestId('autocomplete-options-container')
    const option = optionsContainer.children[0];

    userEvent.click(option)

    expect(testProps.onSearch).toHaveBeenCalledWith('Timezone AA')
  })

})