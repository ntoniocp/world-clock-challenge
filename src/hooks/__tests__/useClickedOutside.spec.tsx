
import { render } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useClickedOutside from '../useClickedOutside'

describe('useClickedOutside hook', () => {
  test('It detects when the user clicks a different element than specified', () => {
    const {getByText} = render(
      <>
        <div>Specified Element</div>
        <div>Other Element</div>
      </>
    )
    
    const element = getByText('Specified Element')
    const otherElement = getByText('Other Element')
    const callback = jest.fn()

    const {result} = renderHook(() => useClickedOutside(element, callback))
    
    act(() => {
      userEvent.click(otherElement)
    })

    expect(result.current).toBe(true)
  })
})
