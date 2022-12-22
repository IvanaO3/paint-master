import axios from "axios";
import React from "react";

export const Board = () => {
  const [arts, setArts] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:1337/arts").then((res) => {
      setArts(res.data.data.reverse());
    });
  }, []);
  return (
    <div className="bord-wrapper">
      <div className="container off-set left-top-layout">
        {arts.map((a) => {
          return (
            <div key={a.ID} className="card">
              <div className="card-box">
                <img src={a.image} alt="" />
                <h6>{a.author}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
