import { useState, useEffect } from "react";
import axios from "../api/axios";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const Users = ({ users, setUsers, deleteUserEvent, isCheck, setIsCheck }) => {
  const [isCheckAll, setIsCheckAll] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response?.data);
        console.log(response?.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
  }, [deleteUserEvent]);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (e) => {
    console.log(isCheck);
    setIsCheckAll(!isCheckAll);
    setIsCheck(users.map((item) => item._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  return (
    <Table striped bordered hover style={{}}>
      <thead>
        <tr>
          <th>
            <Form.Check onChange={handleSelectAll} />
          </th>
          <th>id</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Last login time</th>
          <th>Registration time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {users?.length ? (
          users.map(
            (
              { username, email, lst_login, registered_date, status, _id },
              i
            ) => {
              return (
                <tr key={i}>
                  <Form.Check
                    id={_id}
                    onChange={handleClick}
                    checked={isCheck.includes(_id)}
                  />
                  <td>{i}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>
                    {new Date(lst_login)
                      .toString()
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")}
                  </td>
                  <td>
                    {new Date(registered_date)
                      .toString()
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")}
                  </td>
                  <td>{status}</td>
                </tr>
              );
            }
          )
        ) : (
          <tr>
            <td colSpan="10">
              Congratulation you are the first user to visit this website.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default Users;
