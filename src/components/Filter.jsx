import { useEffect, useState, memo } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Filter = ({ getBread }) => {
  const [breads, setBreads] = useState([]);
  console.log("filter");
  useEffect(() => {
    async function fetchBread() {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/breeds",
          {
            headers: {
              "x-api-key":
                "live_JrcEZoNLwhxRfnZdDN1EuvLi6yGbnmhIFZifDGBgmi8d5MLJsJUCz1pimrONos4n",
            },
          }
        );
        setBreads(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchBread();
  }, []);

  return (
    <div>
      <div className="first">
        <div className="form-group">
          <label htmlFor="exampleSelect1" className="form-label mt-4">
            Breed
          </label>
          <select
            className="form-select"
            id="exampleSelect1"
            onChange={(e) => getBread(e.target.value)}
          >
            <option value="all" defaultChecked>
              All
            </option>
            {breads.map((bread) => {
              return (
                <option value={bread.name} key={bread.name}>
                  {bread.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
