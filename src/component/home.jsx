import { useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock, faTrash } from "@fortawesome/free-solid-svg-icons";
import Users from "./users.component";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth, setAuth } = useAuth();
  const [isCheck, setIsCheck] = useState([]);
  const [users, setUsers] = useState();
  const [deleteUserEvent, setDeleteUserEvent] = useState(false);
  const navigate = useNavigate();

  function updateTable(i) {
    if (i == isCheck.length - 1) {
      setTimeout(() => {
        setDeleteUserEvent(!deleteUserEvent);
      }, 500);
    }
  }

  const handleDelete = () => {
    console.log(isCheck);
    try {
      isCheck.forEach(async (item, i) => {
        await axios.delete("/users" + item);
        updateTable(i);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsCheck([]);
    }

    if (isCheck.includes(localStorage.getItem("id"))) {
      setAuth("");
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleBlock = () => {
    console.log(isCheck);
    try {
      isCheck.forEach(async (item, i) => {
        const result = await axios.put(
          "/block" + item,
          JSON.stringify(
            { status: "block" },
            {
              header: {
                "Content-Type": "application/json",
              },
            }
          )
        );
        console.log(result);
        // update the table after the last request
        updateTable(i);
      });
    } catch (err) {
      console.log(err);
    }

    if (isCheck.includes(localStorage.getItem("id"))) {
      setAuth("");
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleUnBlock = () => {
    console.log(isCheck);
    try {
      isCheck.forEach(async (item, i) => {
        const result = await axios.put(
          "/unblock" + item,
          JSON.stringify({ status: "active" }),
          { header: { "Content-Type": "application/json" } }
        );
        console.log(result);
        updateTable(i);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = () => {
    setAuth("");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home-container">
      <header className="mb-4">
        <h1>Admin page</h1>
      </header>

      <Button variant="warning" onClick={handleBlock}>
        Block
      </Button>
      <Button className="m-3" variant="success" onClick={handleUnBlock}>
        <FontAwesomeIcon icon={faUnlock} />
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button
        className="position-fixed fixed-top"
        style={{ width: "10rem", left: "auto", right: "1rem", top: "1rem" }}
        variant="outline-danger"
        onClick={handleLogOut}
      >
        Logout
      </Button>

      <Users
        users={users}
        setUsers={setUsers}
        deleteUserEvent={deleteUserEvent}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
    </div>
  );
};

export default Home;
