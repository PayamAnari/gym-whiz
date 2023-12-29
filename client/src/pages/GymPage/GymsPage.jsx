import React, { useState, useEffect } from "react";
import GymList from "../../components/GymList/GymList";
import FilterSection from "../../components/GymPageOverview/FilterSection";
import { useGyms } from "../../contexts/GymContext";
import GymNotFound from "../../components/GymPageOverview/GymNotFound";
import "./GymsPage.css";
import Pagination from "../../components/Pagination/Pagination";
import Navbar from "../../components/Navbar/Navbar";
import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";
import Loading from "../../components/Loading/Loading";

const GymPage = () => {
  const { gyms, isLoading } = useGyms();
  const [activeCityFilterList, setActiveCityFilterList] = useState([]);
  const [activeCategoryFilterList, setActiveCategoryFilterList] = useState([]);
  const [activeRatingFilterList, setActiveRatingFilterList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const [cityFilteredGym, setCityFilteredGym] = useState([]);
  const [categoryFilteredGym, setCategoryFilteredGym] = useState([]);
  const [ratingFilteredGym, setRatingFilteredGym] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [numOfResults] = useState(12);

  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const firstIndex = (currentPage - 1) * numOfResults;
  const lastIndex = currentPage * numOfResults;

  useEffect(() => {
    // city filtering
    if (activeCityFilterList.length > 0) {
      let cityGyms = gyms.filter((gym) => {
        if (activeCityFilterList?.includes(gym.city)) {
          return gym;
        }
      });
      setCityFilteredGym(cityGyms);
    } else {
      setCityFilteredGym(gyms);
    }

    // category filtering
    if (activeCategoryFilterList.length > 0) {
      let categoryGyms = gyms.filter((gym) => {
        if (
          gym.category.some((category) =>
            activeCategoryFilterList.includes(category)
          )
        ) {
          return gym;
        }
      });
      setCategoryFilteredGym(categoryGyms);
    } else {
      setCategoryFilteredGym(gyms);
    }

    // rating filtering
    if (activeRatingFilterList.length > 0) {
      let ratingGyms = gyms.filter((gym) => {
        if (activeRatingFilterList?.includes(gym.rating.toString())) {
          return gym;
        }
      });
      setRatingFilteredGym(ratingGyms);
    } else {
      setRatingFilteredGym(gyms);
    }

    // check active filters
    if (
      activeCityFilterList.length > 0 ||
      activeCategoryFilterList.length > 0 ||
      activeRatingFilterList.length > 0
    ) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
    setCurrentPage(1);
  }, [activeCityFilterList, activeCategoryFilterList, activeRatingFilterList]);

  const filteredGyms = cityFilteredGym?.filter((gym) => {
    if (categoryFilteredGym.includes(gym) && ratingFilteredGym.includes(gym)) {
      return gym;
    }
  });

  const handleResetClick = () => {
    setActiveCityFilterList([]);
    setActiveCategoryFilterList([]);
    setActiveRatingFilterList([]);
  };

  const handleToggle = () => setFilterIsOpen(!filterIsOpen);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="gyms-page-navbar">
            <Navbar
              setCurrentPage={setCurrentPage}
              handleResetClick={handleResetClick}
            />
          </div>
          <div className="gyms-page">
            <div className="filter-container">
              <div className="filter-toggle-menu">
                <hr />
                <span onClick={handleToggle} className="filter-icon">
                  {filterIsOpen ? (
                    <MdOutlineFilterListOff />
                  ) : (
                    <MdOutlineFilterList />
                  )}
                </span>
                <hr />
              </div>
              <FilterSection
                toggleControl={filterIsOpen ? "" : "closed-filter"}
                activeCityFilterList={activeCityFilterList}
                setActiveCityFilterList={setActiveCityFilterList}
                activeCategoryFilterList={activeCategoryFilterList}
                setActiveCategoryFilterList={setActiveCategoryFilterList}
                activeRatingFilterList={activeRatingFilterList}
                setActiveRatingFilterList={setActiveRatingFilterList}
                isFiltered={isFiltered}
                handleResetClick={handleResetClick}
              />
            </div>
            <div className="gyms-container">
              {isFiltered === true && filteredGyms.length === 0 ? (
                <GymNotFound />
              ) : (
                <>
                  <GymList
                    isHomePage={false}
                    filteredGyms={filteredGyms}
                    isFiltered={isFiltered}
                    firstIndex={firstIndex}
                    lastIndex={lastIndex}
                  />
                  {filteredGyms?.length <= numOfResults ? null : (
                    <Pagination
                      gymsLength={
                        isFiltered ? filteredGyms?.length : gyms?.length
                      }
                      numOfResults={numOfResults}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GymPage;
