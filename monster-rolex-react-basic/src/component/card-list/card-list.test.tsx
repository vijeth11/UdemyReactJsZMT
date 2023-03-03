import {shallow } from 'enzyme';
import { Monster } from '../../types/types';
import { CardList } from './card-list.component';

let mockData:Monster[] = [
    {
    email:"test@test.com",
    id:"1",
    name:"test"
},
{
    email:"test2@test.com",
    id:"2",
    name:"test2"
}
]

it("expect to render a card component",() => {
    expect(shallow(<CardList monsters={mockData}/>)).toMatchSnapshot();
    });