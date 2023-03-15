import { shallow } from 'enzyme';
import * as utils from './utils/data.utils';
import App from './App';
import { Monster } from './types/types';
import { SearchInput } from './component/search-box/search-box.component';
import { ChangeEvent, Component } from 'react';
import { CardList } from './component/card-list/card-list.component';

let mockData:Monster[];

beforeEach(() => {
    mockData = [
        {
            email:"test@test.com",
            id:"1",
            name:"test"
        },
        {
            email:"test1@test.com",
            id:"2",
            name:"test2"
        }
    ]
})


it("initial test",() => {
    expect(shallow(<App/>)).toMatchSnapshot();
})

it('correctly filters the cards',() => {
    const mockSearchData = {target:{value:"test1"}} as ChangeEvent<HTMLInputElement>;
    const spy = jest.spyOn(utils,'getData').mockResolvedValue(mockData);
    const wrapper = shallow<Component<{},{searchField:string, monsters:Monster[]}>>(<App/>);
    wrapper.find(SearchInput).prop('handleChange')(mockSearchData);
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state().searchField).toBe("test1");
    expect(wrapper.find(CardList).length).toBe(1);
})