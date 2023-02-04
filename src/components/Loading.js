import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

export const Loading = () => {
  //state
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center">
        <RingLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};
