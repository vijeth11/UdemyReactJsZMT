import { shallow } from "enzyme"
import { SearchInput } from "./search-box.component"
let mockPlaceHolder:string = "test";
let mockCallback = (event: any) => console.log(event)

it("initialization test",() => {
    expect(shallow(<SearchInput placeholder={mockPlaceHolder} handleChange = {mockCallback}/>)).toMatchSnapshot();
})