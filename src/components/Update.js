import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setAddress(localStorage.getItem("address"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://63dd362c367aa5a7a40b7ff3.mockapi.io/crud-app/${id}`, {
        name: name,
        email: email,
        address: address,
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Update</h2>
        <Link to="/read">
          <button className="btn btn-info"> Back</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label for="exampleInputName">Name</label>
          <input
            type="name"
            className="form-control"
            id="exampleInputName"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label for="exampleInputName">Address</label>
          <input
            type="name"
            className="form-control"
            id="exampleInputAddress1"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Update;
