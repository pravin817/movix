import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  // Create instance of useNavigate

  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  // As we only need data and loading from useFetch we will apply destructuring

  const { data, loading } = useFetch("/movie/upcoming");

  // Set the background

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      // Navigate to the search page

      navigate(`/search/${query}`);
    }
  };

  // Added onclick event on the submit button
  const handleSearch = () => {
    navigate(`/search/${query}`);
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome.</span>
          <span className="subTitle">
            Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie, tv show,person..."
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button onClick={() => handleSearch()}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
