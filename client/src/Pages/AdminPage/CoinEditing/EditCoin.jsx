import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../../../Redux/Features/dataSlice/dataSlice";
import "./EditCoin.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function EditCoin() {
  const { id } = useParams();
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchedCoin = data.find((coin) => coin._id === id);

    if (searchedCoin) {
      setCoin(searchedCoin);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      dispatch(fetchData()).then(() => setIsLoading(false));
    }
  }, [data, dispatch, id]);

  const searchedCoin = data.find((coin) => coin._id === id);
  const [coin, setCoin] = useState(searchedCoin);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoin({ ...coin, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/editCoin/${id}`,
        coin,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": "Elvin1234",
          },
        }
      );

      if (response.data.coin) {
        alert("Successfully saved");
        navigate(`/coin/` + id);
      } else {
        alert("Something went wrong. Check all the values");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/admin-panel/login");
    }
  }, [id, navigate]);
  if (!coin) {
    return <div>Loading...</div>;
  }
  return (
    <div className="admin-panel-container">
      <h1 className="home-page-header">Admin Panel</h1>
      <form
        onSubmit={submitHandler}
        className="admin-panel-main"
        id="add-coin-form"
      >
        <section className="first column">
          <label className="admin-panel-label" htmlFor="coin-name">
            Coin name
          </label>
          <input
            type="text"
            name="coinName"
            id="coin-name"
            value={coin.coinName}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="face-value">
            Face value
          </label>
          <input
            type="text"
            name="denomination"
            id="face-value"
            value={coin.denomination}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="year">
            Year of issue
          </label>
          <input
            type="text"
            name="year"
            id="year"
            value={coin.year}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={coin.price}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={coin.country}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="metal">
            Metal
          </label>
          <input
            type="text"
            name="metal"
            id="metal"
            value={coin.metal}
            onChange={handleChange}
            required
          />
        </section>

        <section className="second-column">
          <label className="admin-panel-label" htmlFor="short-description">
            Short description
          </label>
          <textarea
            name="shortDesc"
            id="short-description"
            value={coin.shortDesc}
            onChange={handleChange}
            required
          ></textarea>

          <label className="admin-panel-label" htmlFor="long-description">
            Long description
          </label>
          <textarea
            name="longDesc"
            id="long-description"
            value={coin.longDesc}
            onChange={handleChange}
            required
          ></textarea>

          <label className="admin-panel-label" htmlFor="quality">
            Quality of the coin
          </label>
          <input
            type="text"
            name="quality"
            id="quality"
            value={coin.quality}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="weight">
            Weight
          </label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={coin.weight}
            onChange={handleChange}
            required
          />
        </section>
        <section className="third-column">
          <label className="admin-panel-label" htmlFor="observe-link">
            Link to obverse image
          </label>
          <input
            type="text"
            name="observeLink"
            id="observe-link"
            value={coin.observeLink}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="reverse-link">
            Link to reverse image
          </label>
          <input
            type="text"
            name="reverseLink"
            id="reverse-link"
            value={coin.reverseLink}
            onChange={handleChange}
            required
          />

          <label className="admin-panel-label" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={coin.category}
            onChange={handleChange}
            required
          />

          <div className="buttons">
            <button type="submit">Save</button>

            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin-panel/editCoin");
              }}
              type="button"
            >
              Cancel
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
