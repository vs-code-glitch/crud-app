import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Read = () => {
  const [data, setData] = useState([]);
  const [inputText, setText] = useState("");
  const [tabledark, setDark] = useState();

  const getData = () => {
    axios
      .get("https://63dd362c367aa5a7a40b7ff3.mockapi.io/crud-app")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://63dd362c367aa5a7a40b7ff3.mockapi.io/crud-app/${id}`)
      .then(() => {
        getData();
      });
  };

  const setToLocalStorage = (id, name, address, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("address", address);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  const inputHandler = (e) => {
    setText(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="form-check form-switch mt-3">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setDark("");
            else setDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <div className="mb-3">
          <input
            type="search"
            placeholder="search"
            className="form-control"
            onChange={inputHandler}
          />
        </div>
        <Link to="/">
          <button className="btn btn-success">Create Data</button>
        </Link>
      </div>
      <table className={`table table-striped ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {data
          .filter((el) => {
            if (el === "") {
              return el;
            } else {
              return (
                el.name.toLowerCase().includes(inputText) ||
                el.email.toLowerCase().includes(inputText)
              );
            }
          })
          .map((em) => {
            return (
              <>
                <tbody>
                  <tr>
                    <th scope="row">{em.id}</th>
                    <td>{em.name}</td>
                    <td>{em.email}</td>
                    <td>{em.address}</td>
                    <td>
                      <Link to="/update">
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            setToLocalStorage(
                              em.id,
                              em.name,
                              em.address,
                              em.email
                            )
                          }
                        >
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(em.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
      </table>
    </>
  );
};

export default Read;
