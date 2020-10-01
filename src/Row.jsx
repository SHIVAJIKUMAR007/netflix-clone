import React, { useEffect, useState } from "react";
import axios from "./axios";
import Loder from "./Loder";

function Row({ name, url }) {
  const [Data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data.results);
    };
    fetchData();
  }, [url]);

  return (
    <div className="rowOfMovie">
      <h3 style={{ fontSize: "1.4rem" }}>{name}</h3>
      <div className="rowList">
        {Data ? (
          Data.map((movie) => (
            <img
              key={`${movie?.id}`}
              className="imageDiv"
              src={`http://image.tmdb.org/t/p/w185${movie?.poster_path}`}
              alt={`${movie?.name}`}
            />
          ))
        ) : (
          <Loder />
        )}
      </div>
    </div>
  );
}

export default Row;
