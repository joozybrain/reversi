import React from "react"
import { shallow } from "enzyme"
import { wrap } from "module"

import ReversiBoard from "./ReversiBoard"

describe("ReversiBoard", () => {

    //Test basic component rendering
    it("should render basic HTML properly", () => {
        const wrapper = shallow(<ReversiBoard  ctx={{}} G={ {cells:["0","1"]}}/>);

        expect(wrapper.find("table")).toHaveLength(1)        
        expect(wrapper.find("img")).toHaveLength(2)
        expect(wrapper.find("img").get(0).props.alt).toEqual("white")
        expect(wrapper.find("img").get(1).props.alt).toEqual("black")
    })
    //Test for events

    //Test for event handler
})