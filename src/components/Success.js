import React from "react";

export const Success = ({message}) => {
  return (
    <div>
      <div class="alert alert-success" role="alert">
        {message}
      </div>
    </div>
  );
};
