const React = require("react");import CircleIcon from"../../src/cjs/ImoCircleIcon";import OriginalIcon from"../../src/cjs/ImoOriginalIcon";import SolidIcon from"../../src/cjs/ImoSolidIcon";import SolidCircleIcon from"../../src/cjs/ImoSolidCircleIcon";const ImoIcon=({solid,circle,...props})=>{switch(solid){case false:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props);case true:return circle?/*#__PURE__*/React.createElement(SolidCircleIcon,props):/*#__PURE__*/React.createElement(SolidIcon,props);default:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props)}};module.exports = ImoIcon;