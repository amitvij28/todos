import React from "react";
import { shallow } from "enzyme";
import Home from "../Components/Home";

describe("Home Component", () => {
    const component = shallow(<Home />);
    it("should render", () => {
        expect(component).toMatchSnapshot();
    });
});
