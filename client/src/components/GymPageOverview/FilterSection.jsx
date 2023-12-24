import React from "react";
import PropTypes from "prop-types";
import { useGyms } from "../../contexts/GymContext";
import "./FilterSection.css";

const FilterSection = ({
  activeCityFilterList,
  setActiveCityFilterList,
  activeCategoryFilterList,
  setActiveCategoryFilterList,
  activeRatingFilterList,
  setActiveRatingFilterList,
  isFiltered,
  handleResetClick,
  toggleControl,
}) => {
  const { gyms } = useGyms();

  let categoryList = [];
  let cityList = [];
  let ratingList = [1, 2, 3, 4, 5];

  gyms?.map((gym) => {
    gym.category.forEach((category) => {
      if (!categoryList?.includes(category)) {
        categoryList.push(category);
      } else return;
    });
  });

  gyms?.map((gym) => {
    if (!cityList?.includes(gym.city)) {
      cityList.push(gym.city);
    } else return;
  });

  const handleActiveList = (activeList, setActiveList, e) => {
    if (activeList.length > 0) {
      if (activeList?.includes(e.target.value)) {
        setActiveList(activeList.filter((filter) => filter !== e.target.value));
      } else {
        setActiveList([...activeList, e.target.value]);
      }
    } else {
      setActiveList([e.target.value]);
    }
  };

  const handleActiveRatingList = (activeList, setActiveList, e) => {
    const value = e.target.value;
    const valueHalfIncrement = (Number(value) + 0.5).toString();

    let updatedList;

    if (activeList.includes(value)) {
      // Remove both value and its half increment if present
      updatedList = activeList.filter(
        (item) => item !== value && item !== valueHalfIncrement
      );
    } else {
      // Add both value and its half increment
      updatedList = [...new Set([...activeList, value, valueHalfIncrement])];
    }

    setActiveList(updatedList);
  };

  const handleFilterClick = (e) => {
    // add city to activeCityFilterList
    if (e.target.name === "city") {
      handleActiveList(activeCityFilterList, setActiveCityFilterList, e);
    }
    // add category to activeCategoryFilterList
    else if (e.target.name === "category") {
      handleActiveList(
        activeCategoryFilterList,
        setActiveCategoryFilterList,
        e
      );
    }
    // add rating to activeRatingFilterList
    else {
      handleActiveRatingList(
        activeRatingFilterList,
        setActiveRatingFilterList,
        e
      );
    }
  };

  return (
    <div className={`all-filters ${toggleControl}`}>
      <section className="container--filter-bar">
        <div className="header-filter-bar">
          <h1>Filters</h1>
          {isFiltered ? (
            <button onClick={handleResetClick}>Reset filters</button>
          ) : null}
        </div>
        <hr className="filter-divider"></hr>
        <div className="container--filter-list">
          {cityList.length > 0 ? (
            <>
              <fieldset className="container-fieldset">
                <legend className="title-filter">CITY</legend>
                <ul>
                  {cityList?.sort().map((city) => {
                    return (
                      <li key={city}>
                        <input
                          type="button"
                          onClick={handleFilterClick}
                          value={city}
                          name="city"
                          className={
                            activeCityFilterList?.includes(city)
                              ? "filter-buttons active-filter"
                              : "filter-buttons"
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            </>
          ) : null}

          {categoryList.length > 0 ? (
            <>
              <hr className="filter-divider"></hr>
              <fieldset className="container-fieldset">
                <legend className="title-filter">CATEGORY</legend>
                <ul>
                  {categoryList?.sort().map((category) => {
                    return (
                      <li key={category}>
                        <input
                          type="button"
                          onClick={handleFilterClick}
                          value={category}
                          name="category"
                          className={
                            activeCategoryFilterList?.includes(category)
                              ? "filter-buttons active-filter"
                              : "filter-buttons"
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            </>
          ) : null}
          <>
            <hr className="filter-divider"></hr>
            <fieldset className="container-fieldset">
              <legend className="title-filter">RATING</legend>
              <ul>
                {ratingList
                  ?.sort()
                  .reverse()
                  .map((rate) => {
                    return (
                      <li key={rate}>
                        <input
                          type="button"
                          onClick={handleFilterClick}
                          value={rate}
                          name="rate"
                          className={
                            activeRatingFilterList?.includes(rate.toString())
                              ? "filter-buttons active-filter"
                              : "filter-buttons"
                          }
                        />
                      </li>
                    );
                  })}
              </ul>
            </fieldset>
          </>
        </div>
      </section>
    </div>
  );
};

FilterSection.propTypes = {
  activeCityFilterList: PropTypes.array,
  setActiveCityFilterList: PropTypes.func,
  activeCategoryFilterList: PropTypes.array,
  setActiveCategoryFilterList: PropTypes.func,
  activeRatingFilterList: PropTypes.array,
  setActiveRatingFilterList: PropTypes.func,
  isFiltered: PropTypes.bool,
  handleResetClick: PropTypes.func,
  toggleControl: PropTypes.string,
};

export default FilterSection;
