import { useFetch } from "../customHooks/useFetch";
import CatList from "../components/CatList";
import { useState } from "react";

const Home = () => {
  const [breed, setBreed] = useState('')
  const { data: breads } = useFetch('breeds');

  return (
    <>
      <div className="first container">
        <div className="form-group">
          <label htmlFor="selectBreed" className="form-label mt-4">
            Breed
          </label>
          <select
            className="form-select"
            id="selectBreed"
            onChange={(e) => setBreed(e.target.value)}
          >
            <option value="all" defaultChecked>
              All
            </option>
            {breads.map((bread) => {
              return (
                <option value={bread.id} key={bread.id}>
                  {bread.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <CatList breed={breed} />
    </>
  );
};

export default Home;
