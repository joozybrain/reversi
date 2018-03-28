import React from "react";
import { shallow } from "enzyme";
import { wrap } from "module";

import ReversiBoard from "./ReversiBoard";

describe("ReversiBoard", () => {
  //Test basic component rendering
  it("should render basic HTML properly", () => {
    const wrapper = shallow(
      <ReversiBoard ctx={{}} G={{ cells: ["0", "1"] }} />
    );

    expect(wrapper.find("table")).toHaveLength(1);
    expect(wrapper.find("img")).toHaveLength(2);
    expect(wrapper.find("img").get(0).props.alt).toEqual("white");
    expect(wrapper.find("img").get(1).props.alt).toEqual("black");
  });
  //Test for events
  it("able to simulate a click activating a title", () => {
    const mockClickCell = jest.fn();
    const mockEndTurn = jest.fn();
    const wrapper = shallow(
      <ReversiBoard
        ctx={{}}
        G={{ cells: [] }}
        isActive
        moves={{ clickCell: mockClickCell }}
        events={{ endTurn: mockEndTurn }}
      />
    );

    wrapper
      .find("td")
      .at(0)
      .simulate("click");

    expect(mockClickCell).toBeCalledWith(0);
    expect(mockEndTurn).toBeCalled();
  });

  //Test for event handler
  it("able to simulate clicking but does not activate a tile", () => {
    const mockClickCell = jest.fn();
    const mockEndTurn = jest.fn();
    const wrapper = shallow(
      <ReversiBoard
        ctx={{}}
        G={{ cells: [] }}
        isActive={false}
        moves={{ clickCell: mockClickCell }}
        events={{ endTurn: mockEndTurn }}
      />
    );

    wrapper
      .find("td")
      .at(0)
      .simulate("click");

    expect(mockClickCell).not.toBeCalled();
  });

  it("should render winner correctly", () => {
    let wrapper = shallow(<ReversiBoard ctx={{}} G={{ cells: [] }} />);
    expect(wrapper.find("#winner")).toHaveLength(1);

    wrapper = shallow(
      <ReversiBoard ctx={{ gameover: null }} G={{ cells: [] }} />
    );
    expect(wrapper.find("#winner")).toHaveLength(0);
  });
});
