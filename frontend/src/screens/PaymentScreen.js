import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({ history }) {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentGateway, setPaymentMethod] = React.useState('Paypal');

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentGateway));
    history.push("/placeorder");
  }

  return (
    <Container>
      <Row className="justify-content-md">
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 step3 />
          <h1>Payment Method</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="Paypal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value="Paypal"
                  checked = {paymentGateway === 'Paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
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

export default PaymentScreen;
