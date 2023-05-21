import { useState, useEffect, useCallback } from "react";
import Filter from "../components/Filter";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import LazyLoad from "react-lazyload";

const Home = () => {
  const [selectedBread, setSelectedBread] = useState("all");
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("home");
  const handleCallback = useCallback((bread) => {
    try {
      setSelectedBread(bread);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    async function fetchBread() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=100",
          {
            headers: {
              "x-api-key":
                "live_JrcEZoNLwhxRfnZdDN1EuvLi6yGbnmhIFZifDGBgmi8d5MLJsJUCz1pimrONos4n",
            },
          }
        );

        setCats(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
    fetchBread();
  }, [selectedBread]);

  return (
    <div className="container">
      <Filter getBread={handleCallback} />
      <div className="row p-5">
        {loading ? (
          <Spinner />
        ) : (
          cats.map((cat) => {
            return (
              <div
                className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 mb-3 p-2"
                key={cat.id}
              >
                <LazyLoad
                  offset={100}
                  placeholder={
                    <div style={{ height: "200px" }}>Loading...</div>
                  }
                >
                  <Link className="card" style={{ width: "18rem" }}>
                    <img
                      src={cat.url}
                      className="card-img-top"
                      alt="image"
                      loading="lazy"
                    />
                  </Link>
                </LazyLoad>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
