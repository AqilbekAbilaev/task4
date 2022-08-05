import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const userRef = useRef();
  const navigation = useNavigate();

  const [user, setUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [conPwd, setConPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState(false);
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const match = pwd === conPwd && pwd !== "";
    setMatchPwd(match);
    console.log(match);
  }, [pwd, conPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pwd !== conPwd) {
      alert("passwords are not the same!");
      return;
    }
    try {
      const result = await axios.post(
        "/register",
        JSON.stringify({ user: user, pwd: pwd, email: userEmail }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(result);
      navigation("/login");
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label className="label" htmlFor="username">
            Username:
          </Form.Label>
          <Form.Control
            type="text"
            id="username"
            required
            ref={userRef}
            autoComplete="off"
            onChange={(e) => {
              setUser(e.target.value);
              setErrMsg();
            }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="label" htmlFor="email">
            Email:
          </Form.Label>
          <Form.Control
            type="email"
            id="email"
            required
            onChange={(e) => {
              setUserEmail(e.target.value);
              setErrMsg();
            }}
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
            onChange={(e) => setPwd(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="label" htmlFor="confirm_pwd">
            Confirm Password:
          </Form.Label>
          <Form.Control
            type="password"
            required
            id="confirm_pwd"
            onChange={(e) => setConPwd(e.target.value)}
          />
        </Form.Group>
        <Button
          className="mb-3"
          variant="primary"
          type="submit"
          disabled={!matchPwd}
        >
          Sign up
        </Button>
      </Form>
      {errMsg ? <p style={{ color: "red" }}>{errMsg}</p> : <p></p>}
      <p>If you have already an account.</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
