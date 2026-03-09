import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loadingAnimation">
      <ClipLoader color="#000000" size={50} aria-label="Loading Spinner" data-testid="loader" />
      <span>Carregando...</span>
    </div>
  );
};

export default Loading;
