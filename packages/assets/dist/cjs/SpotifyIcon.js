const React = require("react");import CircleIcon from"../../src/cjs/SpotifyCircleIcon";import OriginalIcon from"../../src/cjs/SpotifyOriginalIcon";import SolidIcon from"../../src/cjs/SpotifySolidIcon";import SolidCircleIcon from"../../src/cjs/SpotifySolidCircleIcon";const SpotifyIcon=({solid,circle,...props})=>{switch(solid){case false:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props);case true:return circle?/*#__PURE__*/React.createElement(SolidCircleIcon,props):/*#__PURE__*/React.createElement(SolidIcon,props);default:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props)}};module.exports = SpotifyIcon;