import React, { useEffect } from "react";
import { useSelector } from "react-redux";
const Elvin = () => {
  const data = useSelector((state) => state.data);
  console.log(data);
  return (
    <div>
      {data.map((elem) => {
        return (
          <div key={elem._id}>
            <h1>{elem.category}</h1>
            <h2>{elem.coinName}</h2>
            <img src={elem.reverseLink} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default Elvin;
