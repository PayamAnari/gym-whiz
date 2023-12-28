import React from "react";
import Header from "../../components/Header/Header";
import TEST_ID from "./Home.testid";
import WhyGymWhiz from "../../components/WhyGymWhiz/WhyGymWhiz";
import Subscribe from "../../components/Subscribe/Subscribe";
import GymList from "../../components/GymList/GymList";
import Advertisement from "../../components/Advertisement/Advertisement";
import Bmi from "../../components/Bmi/Bmi";
import OurStory from "../../components/OurStory/OurStory";
import "./Home.css";
import { useGyms } from "../../contexts/GymContext";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const { isLoading } = useGyms();
  return (
    <div data-testid={TEST_ID.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <WhyGymWhiz />
          <Subscribe />
          <GymList isHomePage={true} />
          <Bmi />
          <Advertisement />
          <OurStory />
        </>
      )}
    </div>
  );
};

export default Home;
