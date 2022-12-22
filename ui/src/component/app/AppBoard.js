import React from "react";
import rough from "roughjs/bundled/rough.esm.js";
import getStroke from "perfect-freehand";
import { useSelector, useDispatch } from "react-redux";
import { handleActionSelection } from "../../store/appSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppBoard = () => {
  const ref = React.useRef(null);
  const [elements, setElement] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const { tool, action, color } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [selectedElement, setSelectedElement] = React.useState(null);

  const generator = rough.generator();

  React.useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      setImage(canvas);
    }
  }, []);

  function createElement(id, x1, y1, x2, y2, type) {
    let element = null;
    if (type === "line" || type === "quadrilateral") {
      element =
        type === "line"
          ? generator.line(x1, y1, x2, y2, { fill: color, fillStyle: "solid" })
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
              fill: color,
              fillStyle: "solid",
            });
      return { id, x1, y1, x2, y2, type, element };
    } else if (type === "pencile") {
      return { id, type, points: [{ x: x1, y: y1 }] };
    } else if (type === "dot") {
      element = generator.circle(x1, y1, 10, {
        fill: color,
        roughness: 0,
        fillStyle: "solid",
      });
      return { id, x1, y1, x2, y2, type, element };
    }
  }

  const isWithinElement = (x, y, element) => {
    const { type, x1, x2, y1, y2 } = element;
    if (type === "quadrilateral") {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
      const a = { x: x1, y: y1 };
      const b = { x: x2, y: y2 };
      const c = { x, y };
      const offset = distance(a, b) - (distance(a, c) + distance(b, c));
      return Math.abs(offset) < 1;
    }
  };

  const distance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

  const getElementByPosition = (x, y, elements) => {
    return elements.find((element) => isWithinElement(x, y, element));
  };

  function getSvgPathFromStroke(stroke) {
    if (!stroke.length) return "";

    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );

    d.push("Z");
    return d.join(" ");
  }

  const drawElement = (roughCanvas, ctx, element) => {
    if (
      element.type === "line" ||
      element.type === "quadrilateral" ||
      element.type === "dot"
    ) {
      console.log(element);
      roughCanvas.draw(element.element);
    } else if (element.type === "pencile") {
      const path = getSvgPathFromStroke(
        getStroke(element.points, {
          smoothing: 1,
          size: 10,
        })
      );
      ctx.fill(new Path2D(path));
    }
  };

  React.useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => drawElement(roughCanvas, ctx, element));
  });

  const updateElement = (id, x1, y1, x2, y2, type) => {
    const elementsCopy = [...elements];
    if (type === "line" || type === "quadrilateral") {
      elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
    } else if (type === "pencile") {
      elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }];
    } else if (type === "dot") {
      elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
    }
    setElement(elementsCopy);
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    if (tool === "select") {
      const element = getElementByPosition(clientX, clientY, elements);
      if (element) {
        dispatch(handleActionSelection("moving"));
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
      }
    } else {
      dispatch(handleActionSelection("drawing"));
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElement((prevState) => [...prevState, element]);
      console.log(elements);
    }
  };
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (tool === "select") {
      e.target.style.cursor = getElementByPosition(clientX, clientY, elements)
        ? "move"
        : "default";
    }
    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX = clientX - offsetX;
      const newY = clientY - offsetY;
      updateElement(id, newX, newY, newX + width, newY + height, type);
    }
  };
  const handleMouseUp = () => {
    dispatch(handleActionSelection("none"));
    setSelectedElement(null);
  };

  const saveImage = async () => {
    await axios
      .post("http://localhost:1337/arts", {
        image: image.toDataURL(),
        author: "Ivana",
      })
      .then(() => toast.success("Image saved"));
  };
  return (
    <div>
      <button className="paint-view-save" onClick={saveImage}>
        Save
      </button>
      <canvas
        id="canvas"
        ref={ref}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      ></canvas>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
