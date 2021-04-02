import TimezoneCard from './TimezoneCard'
import renderer from 'react-test-renderer';

const cardProps = {
  name: 'Test/Timezone',
  date: '14/12/2021',
  time: '03:42PM',
  onClose: () => {}
}

describe('TimezoneCard Component', () => {
  test('It matches the snapshot', () => {
    const tree = renderer.create(<TimezoneCard {...cardProps} />).toJSON();
    expect(tree).toMatchSnapshot()
  })
})