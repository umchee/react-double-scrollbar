import React from "react";

"use strict";

class DoubleScrollbar extends React.Component {

  componentDidMount() {
    let outerDiv = this.refs.outerDiv;
    let innerDiv = this.refs.innerDiv;
    let childWrapper = this.refs.childrenWrapper;

    //Set the width of the inner div to the first child's
    innerDiv.style.width = childWrapper.scrollWidth + "px";

    //assoc the scrolls
    outerDiv.onscroll = function() {
      childWrapper.scrollLeft = outerDiv.scrollLeft;
    };

    childWrapper.onscroll= function() {
      outerDiv.scrollLeft = childWrapper.scrollLeft;
    };
  }

  render() {

    let outerDivStyle = { overflowX: "auto", overflowY: "hidden" };
    let innerDivStyle = { paddingTop: "1px"};
    let childDivStyle = { overflow: "auto", overflowY: "hidden" };

    return (
      <div>
        <div ref="outerDiv" style={outerDivStyle}>
          <div ref="innerDiv" style={innerDivStyle}>&nbsp;</div>
        </div>
        <div ref="childrenWrapper" style={childDivStyle} >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default DoubleScrollbar;
