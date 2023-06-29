import { memo } from "react";
/**
 * 
 * @description not in use
 */

const Filter = ({ getBread, breads }) => {
  return (
    <>
      <div className="first">
        <div className="form-group">
          <label htmlFor="selectBreed" className="form-label mt-4">
            Breed
          </label>
          <select
            className="form-select"
            id="selectBreed"
            onChange={(e) => getBread(e.target.value)}
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
    </>
  );
};

export default memo(Filter);
