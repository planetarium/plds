const React = require("react");import CircleIcon from"../../src/cjs/DribbbleCircleIcon";import OriginalIcon from"../../src/cjs/DribbbleOriginalIcon";import SolidIcon from"../../src/cjs/DribbbleSolidIcon";import SolidCircleIcon from"../../src/cjs/DribbbleSolidCircleIcon";const DribbbleIcon=({solid,circle,...props})=>{switch(solid){case false:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props);case true:return circle?/*#__PURE__*/React.createElement(SolidCircleIcon,props):/*#__PURE__*/React.createElement(SolidIcon,props);default:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props)}};module.exports = DribbbleIcon;