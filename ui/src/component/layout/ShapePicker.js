import {
  RxMove,
  RxDotFilled,
  RxSquare,
  RxMinus,
  RxPencil1,
} from "react-icons/rx";
import { AppButton } from "../app/AppButton";
export const ShapePicker = () => {
  const supportedShapes = [
    { name: "Select", icon: RxMove },
    { name: "Dot", icon: RxDotFilled },
    { name: "Line", icon: RxMinus },
    { name: "Quadrilateral", icon: RxSquare },
    { name: "Pencile", icon: RxPencil1 },
  ];
  return (
    <div className="shape-picker neum">
      {supportedShapes.map((s) => (
        <AppButton key={s.name} name={s.name} icon={s.icon} />
      ))}
    </div>
  );
};
