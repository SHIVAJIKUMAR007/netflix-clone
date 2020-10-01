import React, { useEffect, useState } from "react";
import movies from "./movies";
import axios from "./axios";
import img from "./user.png";

function Banner() {
  const [Banner, setBanner] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get(movies.originals);
      const data2 = await data.data.results;
      let index = Math.floor(Math.random() * 20);
      setBanner(data2[index]);
      console.log(data2[index]);
    };
    fetch();
  }, []);

  return (
    <div className="banner">
      <img
        className="banner_poster"
        src={`http://image.tmdb.org/t/p/w185${Banner.backdrop_path}`}
        alt={`${Banner.name}`}
      />
      <div className="banner_desc">
        <div className="logo">
          <div>
            <img
              src="https://lh3.googleusercontent.com/proxy/at1zQaGZJiwOC3BMWZJhMn0qTwF0nbjesBTyFio1cXtn5o9m12EqGwR904kSEELUsibH8-kRtGe4rR2oAAv3NcJESp8elHotAI2bSPiqCeKcbgyEB2g"
              alt="logo"
              style={{
                width: "14rem",
                // objectFit: "contain",
                height: "7rem",
                margin: "0 0",
              }}
            />
          </div>
          <div></div>
          <div style={{ marginTop: "1rem" }}>
            <img
              src={img}
              alt="logo"
              style={{
                width: "4rem",
                marginLeft: "auto",
                height: "4rem",
                margin: "0 0",
              }}
            />
          </div>
        </div>
        {/* title  */}
        <div className="desccription">
          <h1> {`${Banner?.name}` || `${Banner.original_name}`} </h1>
          <div className="banner_button">
            <button>Play Now</button>
            <button>My List</button>
          </div>
          <span> {Banner.overview} </span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
