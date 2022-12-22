import React from "react";
import { handleColorSelection } from "../../store/appSlice";
import { useDispatch, useSelector } from "react-redux";

export const ColorPalete = () => {
  const { color } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const colorList = [
    "#FFB2E6",
    "#D972FF",
    "#8447FF",
    "#8CFFDA",
    "#FFFFE8",
    "#2C363F",
    "#E75A7C",
    "#F2F5EA",
    "#C7E8F3",
    "#BBC7A4",
    "#8E4162",
    "#EDA2C0",
  ];

  const handleColorInput = (e) => {
    dispatch(handleColorSelection("#" + e.target.value));
  };

  return (
    <div className="palete neum">
      {colorList.map((c) => (
        <div
          onClick={() => dispatch(handleColorSelection(c))}
          key={c}
          className="palete-color"
          style={{ backgroundColor: c }}
        ></div>
      ))}
      <div
        hidden={!color}
        className="palete-color"
        style={{ backgroundColor: color }}
      ></div>
      <div className="palete-custom-color">
        <span>#</span>
        <input
          type="text"
          placeholder="Enter color code.."
          onChange={handleColorInput}
          maxLength="6"
        ></input>
      </div>
    </div>
  );
};
