import { shallow } from 'enzyme';
import App from './App';

it("initial test",() => {
    expect(shallow(<App/>)).toMatchSnapshot();
})

it('correctly filters the cards',() => {
    const wrapper = shallow(<App/>);
    
})