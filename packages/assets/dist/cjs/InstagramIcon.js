const React = require("react");import CircleIcon from"../../src/cjs/InstagramCircleIcon";import OriginalIcon from"../../src/cjs/InstagramOriginalIcon";import SolidIcon from"../../src/cjs/InstagramSolidIcon";import SolidCircleIcon from"../../src/cjs/InstagramSolidCircleIcon";const InstagramIcon=({solid,circle,...props})=>{switch(solid){case false:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props);case true:return circle?/*#__PURE__*/React.createElement(SolidCircleIcon,props):/*#__PURE__*/React.createElement(SolidIcon,props);default:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props)}};module.exports = InstagramIcon;