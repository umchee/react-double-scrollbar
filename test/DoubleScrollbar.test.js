jest.unmock("../src/DoubleScrollbar.jsx");

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import DoubleScrollbar from "../src/DoubleScrollbar.jsx";

describe('DoubleScrollbar', () => {

  let doubleScrollbar;
  const wrappedId = "wrappedElement";
  const childWidth = 1500;

  let createComponent = () => {
    let divStyle = { "width" : childWidth + "px" };
    doubleScrollbar = TestUtils.renderIntoDocument(
      <DoubleScrollbar>
        <div id={wrappedId} style={divStyle}><p>this is a wide div</p></div>
      </DoubleScrollbar>);

    doubleScrollbar.refs.childrenWrapper.scrollWidth = childWidth;

    return doubleScrollbar;
  };

  // beforeEach(function() {
  // });

  it('renders successfully', () => {
    spyOn(window, "addEventListener").and.callThrough();
    let doubleScrollbar = createComponent();
    expect(doubleScrollbar.refs.outerDiv).toBeDefined();
    expect(doubleScrollbar.refs.innerDiv).toBeDefined();
    expect(doubleScrollbar.refs.childrenWrapper).toBeDefined();
    expect(doubleScrollbar.refs.childrenWrapper.firstChild.id).toBe(wrappedId);
    expect(window.addEventListener).toHaveBeenCalledWith("resize", doubleScrollbar.boundCalculateWidth);
  });

  it('handles changes to the inner child width', () => {
    let doubleScrollbar = createComponent();
    doubleScrollbar.refs.childrenWrapper.scrollWidth = childWidth;
    window.resizeTo(2500, 1500);
    expect(doubleScrollbar.state.width).toBe(childWidth + "px");
  });

  it('cleans up on unmount', () => {
    spyOn(window, "removeEventListener").and.callThrough();
    let doubleScrollbar = createComponent();
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(doubleScrollbar).parentNode);
    expect(window.removeEventListener).toHaveBeenCalledWith("resize", doubleScrollbar.boundCalculateWidth);
  });



});
