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

  const handleDelete = () => {
    console.log(isCheck);
    try {
      isCheck.forEach(async (item) => {
        await axios.delete("/users:" + item);
      });
    } catch (err) {
      console.log(err);
    }

    if (isCheck.includes(localStorage.getItem('id'))) {
      setAuth('');
      localStorage.clear();
      navigate('/login');
    }

    setTimeout(() => {
      setDeleteUserEvent(!deleteUserEvent);
    }, 1000);
  }

  const handleBlock = () => {
    try {
      isCheck.forEach(async (item) => {
        await axios.put("/block", JSON.stringify({'users': isCheck}), {
          headers: { "Content-Type": "application/json" },
        });
      });
    } catch (err) {
      console.log(err);
    }

    if (isCheck.includes(localStorage.getItem('id'))) {
      setAuth('');
      localStorage.clear();
      navigate('/login');
    }

    setTimeout(() => {
      setDeleteUserEvent(!deleteUserEvent);
    }, 1000);
  };

  const handleUnBlock = () => {
    try {
      isCheck.forEach(async (item) => {
        await axios.put("/unblock", JSON.stringify({'users': isCheck}), {
          headers: { "Content-Type": "application/json" },
        });
      });
    } catch (err) {
      console.log(err);
    }
    
    setTimeout(() => {
      setDeleteUserEvent(!deleteUserEvent);
    }, 1000);
  };

  const handleLogOut = () => {
    setAuth('');
    localStorage.clear();
    navigate('/login')
  }

  return (
    <div className="home-container">
      <header className="mb-4">
        <h1>Admin page</h1>
      </header>

      <Button variant="warning" onClick={handleBlock}>Block</Button>
      <Button className="m-3" variant="success" onClick={handleUnBlock}>
        <FontAwesomeIcon icon={faUnlock} />
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button className="position-fixed fixed-top" style={{width: "10rem", left: "auto", right: "1rem", top: "1rem"}} variant="outline-danger" onClick={handleLogOut}>Logout</Button>

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
