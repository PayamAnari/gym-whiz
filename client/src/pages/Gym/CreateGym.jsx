import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const CreateGym = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [picture, setPicture] = useState([]);
  const [rating, setRating] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSuccess = () => {
    setName("");
    setCategory([]);
    setPicture([]);
    setRating(0);
    setIsSuccess(true);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/gym/create",
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, category, picture, rating }),
    });
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div>Error while trying to create gym: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Creating gym...</div>;
  } else if (isSuccess) {
    statusComponent = <div>Gym created successfully!</div>;
  }
  return (
    <div>
      <h1>Create Gym</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
          placeholder="Gym Name"
          type="text"
          required
        />
        <input
          name="category"
          value={category.join(",")}
          onChange={(e) => setCategory(e.target.value.split(","))}
          placeholder="Gym Category"
          type="text"
          required
          list="gym-category-options"
        />
        <datalist id="gym-category-options">
          <option value="Yoga" />
          <option value="Fitness" />
          <option value="Wellness" />
        </datalist>
        <input
          name="rating"
          value={rating}
          onChange={({ target }) => setRating(Number(target.value))}
          placeholder="Gym Rating (1-5)"
          type="number"
          min="1"
          max="5"
          required
        />
        <input
          name="picture"
          value={picture}
          onChange={(e) => setPicture(e.target.value.split(","))}
          placeholder="Picture URL"
          type="text"
          required
        />

        <button type="submit">Submit</button>
        <Link to="/">
          <button>Homepage</button>
        </Link>
      </form>
      {statusComponent}
    </div>
  );
};

export default CreateGym;
