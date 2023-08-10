import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./CoinDescription.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/Features/dataSlice/dataSlice";

export default function CoinDescription() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const coin = data.find((coin) => coin._id === id);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (!coin) {
    return <p>Loading...</p>; // or handle the error condition appropriately
  }
  return (
    <div className="coin-list">
      <div className="description-page">
        <div className="coin-images">
          <img src={coin.observeLink} alt={coin.coinName + "-front"} />
          <img src={coin.reverseLink} alt={coin.coinName + "-back"} />
        </div>
        <div className="coin-description">
          <h1>{coin.coinName}</h1>
          {coin.longDesc.split("\n").map((paragraph, index) => {
            return <p key={index}>{paragraph}</p>;
          })}
          <table>
            <tbody>
              <tr>
                <td>Issuing Country</td>
                <td>{coin.country}</td>
              </tr>
              <tr>
                <td>Composition</td>
                <td>{coin.metal}</td>
              </tr>
              <tr>
                <td>Quality</td>
                <td>{coin.quality}</td>
              </tr>
              <tr>
                <td>Denomination</td>
                <td>{coin.denomination}</td>
              </tr>
              <tr>
                <td>Year</td>
                <td>{coin.year}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{coin.weight}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>{coin.price}$</td>
              </tr>
            </tbody>
          </table>
          <Link
            className="back-to-list"
            to={".."}
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            To the previous page
          </Link>
        </div>
      </div>
    </div>
  );
}
