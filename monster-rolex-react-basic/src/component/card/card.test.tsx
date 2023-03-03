import {shallow } from 'enzyme';
import { Monster } from '../../types/types';
import { Card } from './card.component';
let mockData:Monster = {
    email:"test@test.com",
    id:"1",
    name:"test"
}

it("expect to render a card component",() => {
expect(shallow(<Card monster={mockData}/>).length).toEqual(1);
expect(shallow(<Card monster={mockData}/>)).toMatchSnapshot();
});