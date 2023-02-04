import React from "react";

export const Error = ({message}) => {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {message}
      </div>
    </div>
  );
};
