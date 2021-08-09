import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { saveShippingCart } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { shippingAddress } = cart;
  const [address, setAddress] = React.useState(shippingAddress.address);
  const [city, setCity] = React.useState(shippingAddress.city);
  const [postalCode, setPostalCode] = React.useState(
    shippingAddress.postalCode
  );
  const [country, setCountry] = React.useState(shippingAddress.country);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      history.push("/shipping");
    }
  }, [userInfo, history]);

  function submitHandler(e) {
    e.preventDefault();
    dispatch(
      saveShippingCart({
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
      })
    );
    history.push("/payment");
  }

  return (
    <Container>
      <Row className="justify-content-md">
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ShippingScreen;
