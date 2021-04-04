import { renderHook } from '@testing-library/react-hooks'
import usePollingStrategy from '../usePollingStrategy'
import { sleep } from '../../utils/utils'

describe('usePollingStrategy hook' , () => {
  test('It executes the polling function every n miliseconds', async () => {
    const pollingFunction = jest.fn()
    const miliseconds = 500
    const nTimes = 2
    const totalMiliseconds = miliseconds * nTimes
    const executionDelay = totalMiliseconds * 0.1
    
    renderHook(() => usePollingStrategy(miliseconds, pollingFunction))
  
    await sleep(totalMiliseconds + executionDelay)
    expect(pollingFunction).toHaveBeenCalledTimes(nTimes)
  })
})
