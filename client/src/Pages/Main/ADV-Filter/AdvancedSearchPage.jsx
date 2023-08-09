import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrow from "../../../arrow.svg";
import "./AdvancedSearchPage.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/Features/dataSlice/dataSlice";
export default function AdvancedSearchPage() {
  const data = useSelector((state) => state.data);
  const countryOptions = [...new Set(data.map((coin) => coin.country))].map(
    (country) => ({
      value: country,
      label: country,
    })
  );

  const metalOptions = [...new Set(data.map((coin) => coin.metal))].map(
    (metal) => ({
      value: metal,
      label: metal,
    })
  );

  const categoryOptions = [...new Set(data.map((coin) => coin.category))].map(
    (category) => ({
      value: category,
      label: category,
    })
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [state, setState] = useState({
    priceFrom: "",
    priceTo: "",
    yearFrom: "",
    yearTo: "",
  });
  const [country, setCountry] = useState([]);
  const [category, setCategory] = useState([]);
  const [metal, setMetal] = useState([]);

  //Styles for my React-Select elements
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "48px",
      height: "48px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "48px",
      padding: "0 16px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "48px",
    }),
  };
  const handleValue = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (country.value) {
      state.country = country.value;
    }
    if (category.value) {
      state.category = category.value;
    }
    if (metal.value) {
      state.metal = metal.value;
    }

    const query = Object.entries(state)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    navigate(`/search?q=${searchInputValue}&` + query);
  };

  return (
    <div>
      <h1 className="home-page-header">Homepage</h1>
      <div className="search-input">
        <form
          className="search-input-form"
          action="submit"
          onSubmit={handleSubmit}
        >
          <label htmlFor="search-input">Input field</label>
          <div className="input-button">
            <input
              type="text"
              name="searchInputValue"
              id="search-input"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <button className="search-button" type="submit">
              Search
            </button>
          </div>

          <Link className="adv-link list-page-filter" to="/">
            Advanced filter <img className="arrow up" src={arrow} alt="arrow" />
          </Link>
          <div className="search-parameters">
            <div className="select-boxes">
              <div className="country select">
                <label htmlFor="country">Issuing country</label>
                <Select
                  styles={customStyles}
                  options={countryOptions}
                  defaultValue={country}
                  onChange={setCountry}
                />
              </div>
              <div className="metal select">
                <label htmlFor="metal">Metal</label>
                <Select
                  styles={customStyles}
                  id="metal"
                  options={metalOptions}
                  defaultValue={metal}
                  onChange={setMetal}
                />
              </div>
              <div className="category select">
                <label htmlFor="category">Category</label>
                <Select
                  styles={customStyles}
                  id="category"
                  options={categoryOptions}
                  defaultValue={category}
                  onChange={setCategory}
                />
              </div>
            </div>
            <div className="input-boxes">
              <div className="price">
                <label htmlFor="price">Price</label>
                <span className="from">from</span>
                <input
                  type="number"
                  id="price"
                  name="priceFrom"
                  value={state.priceFrom}
                  onChange={handleValue}
                  required
                  min={0}
                />
                <span className="to">to</span>
                <input
                  type="number"
                  id="price"
                  name="priceTo"
                  value={state.priceTo}
                  onChange={handleValue}
                  required
                />
              </div>
              <div className="year">
                <label htmlFor="year">Year of issue</label>
                <span className="from">from</span>
                <input
                  type="number"
                  id="year"
                  name="yearFrom"
                  value={state.yearFrom}
                  onChange={handleValue}
                  required
                  min={0}
                />
                <span className="to">to</span>
                <input
                  type="number"
                  id="year"
                  name="yearTo"
                  value={state.yearTo}
                  onChange={handleValue}
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
