import React from "react";
import { shallow } from "enzyme";
import DisplayPanel from "../Components/DisplayPanel";

describe("Display Panel", () => {
    const component = shallow(<DisplayPanel />);
    it("should render", () => {
        expect(component).toMatchSnapshot();
    });
});
