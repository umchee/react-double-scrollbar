jest.unmock("../src/DoubleScrollbar.jsx");

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DoubleScrollbar from "../src/DoubleScrollbar.jsx";

describe('DoubleScrollbar', () => {

  let doubleScrollbar;
  const wrappedId = "wrappedElement";
  const childWidth = 1500;

  beforeEach(function() {

    spyOn(window, "addEventListener").and.callThrough();
    spyOn(window, "removeEventListener").and.callThrough();

    let divStyle = { "width" : childWidth + "px" };
    doubleScrollbar = TestUtils.renderIntoDocument(
      <DoubleScrollbar>
          <div id={wrappedId} style={divStyle}><p>this is a wide div</p></div>
      </DoubleScrollbar>);
  });

  it('renders successfully', () => {
    expect(doubleScrollbar.refs.outerDiv).toBeDefined();
    expect(doubleScrollbar.refs.innerDiv).toBeDefined();
    expect(doubleScrollbar.refs.childrenWrapper).toBeDefined();
    expect(doubleScrollbar.refs.childrenWrapper.firstChild.id).toBe(wrappedId);
    expect(window.addEventListener).toHaveBeenCalledWith("resize", doubleScrollbar.boundCalculateWidth);
    expect(doubleScrollbar.state.width).toBe("999px");
  });

  it('cleans up on unmount', () => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(doubleScrollbar).parentNode);
    expect(window.removeEventListener).toHaveBeenCalledWith("resize", doubleScrollbar.boundCalculateWidth);
  });



});
