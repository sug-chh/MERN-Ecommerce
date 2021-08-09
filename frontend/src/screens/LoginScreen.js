import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {login} from '../actions/userActions'
import Message from "../components/Message";
import Loader from "../components/Loader";



function LoginScreen({ location, history }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(location)
  const userLogin = useSelector(state => state.userLogin)
  const {userInfo, loading, error} = userLogin

  React.useEffect(() => {
    if (userInfo){
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch location
    dispatch(login(email, password))
  };



  return (
    <>
    <Container>
      <Row className="justify-content-md">
        <Col xs={12} md={6}>
        <h1>Sign In</h1>
        { error  && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >Register</Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default LoginScreen;
