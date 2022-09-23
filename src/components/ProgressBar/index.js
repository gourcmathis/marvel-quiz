import React from "react";

const ProgressBar = (props) => {
  return (
    <>
      <div className="percentage">
        <div className="progressPercent">
          Question: {props.questionNumb}/{props.maxQuestion}
        </div>
        <div className="progressPercent">
          Progression:{" "}
          {Math.round((props.questionNumb / props.maxQuestion) * 100)}%
        </div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{
            width: `${(props.questionNumb / props.maxQuestion) * 100}%`,
          }}
        ></div>
      </div>
    </>
  );
};

export default React.memo(ProgressBar);
