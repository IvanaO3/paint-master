import { AppBoard } from "../component/app/AppBoard";
import { ColorPalete } from "../component/layout/ColorPalete";
import { ShapePicker } from "../component/layout/ShapePicker";

export const PainView = () => {
  return (
    <div className="center-layout">
      <AppBoard />
      <ColorPalete />
      <ShapePicker />
    </div>
  );
};
