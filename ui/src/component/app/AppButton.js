import { useDispatch, useSelector } from "react-redux";
import { handleToolSelection } from "../../store/appSlice";

export const AppButton = ({ name, icon }) => {
  const dispatch = useDispatch();
  const { tool } = useSelector((state) => state.app);
  return (
    <button
      className="app-btn center-layout"
      autoFocus={name.toLocaleLowerCase() === tool ? true : false}
      onClick={() => dispatch(handleToolSelection(name.toLocaleLowerCase()))}
    >
      {icon()}
      <span>{name}</span>
    </button>
  );
};
