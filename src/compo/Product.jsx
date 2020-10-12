import React from "react";
import { NavLink } from "react-router-dom";

function Product({ id, width, desc, title, image }) {
  return (
    <>
      <div className="card" style={{ width: `${width}%` }}>
        <div className="card-body">
          <NavLink to={`/product/${id}`} className=" mt-4 anchorTag ">
            <p className="card-text">{desc}</p>
            <h3 className="card-title">{title}</h3>

            <center>
              <img
                className=" img-fluid ProductImage mx-auto card-img-top"
                src={image}
                alt={title}
              />
            </center>
            <center>
              <button className="btn mt-4 ">
                <p>see more</p>
              </button>
            </center>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Product;
