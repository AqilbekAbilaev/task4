import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    const email = localStorage.getItem('email'); // Search for email in localstorage first
    const pwd = localStorage.getItem('pwd'); // Search for pwd in localstorage first (It is not safe but I have not much time to implement JWT or smth like this)
    const id = localStorage.getItem('id');
    if (email && pwd) {
      setAuth({email, pwd});
      navigate('/')
    }
  }, [])


  useEffect(() => {
    userRef.current.focus();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        JSON.stringify({ pwd: pwd, email: email }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(JSON.stringify(response?.data));
      const id = await response?.data?.user?._id;
      setAuth({ email, pwd, id });

      localStorage.setItem('email', email);
      localStorage.setItem('pwd', pwd);
      localStorage.setItem('id', id);
      setEmail("");
      setPwd("");
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrMsg(err.response.data.message);
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label className="label" htmlFor="username">
            Email:
          </Form.Label>
          <Form.Control
            type="text"
            id="email"
            required
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrMsg();
            }}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="label" htmlFor="pwd">
            Password:
          </Form.Label>
          <Form.Control
            type="password"
            id="pwd"
            required
            onChange={(e) => {
              setPwd(e.target.value);
              setErrMsg();
            }}
            value={pwd}
          />
        </Form.Group>
        <Button className="mb-3" variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
      {errMsg ? <p style={{ color: "red" }}>{errMsg}</p> : <p></p>}
      <p>If you have not created an account yet</p>
      <Link to="/register" replace>
        Register
      </Link>
    </div>
  );
};

export default Login;
