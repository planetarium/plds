import*as React from"react";import CircleIcon from"../../src/esm/MediumCircleIcon";import OriginalIcon from"../../src/esm/MediumOriginalIcon";import SolidIcon from"../../src/esm/MediumSolidIcon";import SolidCircleIcon from"../../src/esm/MediumSolidCircleIcon";const MediumIcon=({solid,circle,...props})=>{switch(solid){case false:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props);case true:return circle?/*#__PURE__*/React.createElement(SolidCircleIcon,props):/*#__PURE__*/React.createElement(SolidIcon,props);default:return circle?/*#__PURE__*/React.createElement(CircleIcon,props):/*#__PURE__*/React.createElement(OriginalIcon,props)}};export default MediumIcon;