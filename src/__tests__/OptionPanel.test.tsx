import React from "react";
import { mount } from "enzyme";
import OptionPanel from "../Components/OptionPanel";

describe("Option Panel", () => {
    const component = mount(<OptionPanel />);
    it("should render", () => {
        expect(component).toMatchSnapshot();
    });
});
