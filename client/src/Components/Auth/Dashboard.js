import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";
import { ProfileCard, LineChart, PieChart } from "../index/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Dashboard() {
  const { dashboard, setDashboard, profile, history, breakdown } = useContext(
    UserContext
  );

  useEffect(() => {
    setDashboard(!dashboard);
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Button to="/spend" as={Link}>
              Add Expenditure
            </Button>
          </Col>
          <Col>
            <ProfileCard profile={profile} history={history} />
          </Col>
        </Row>

        <Row>
          <Col>
            <LineChart history={history} />
          </Col>
          <Col>
            <PieChart breakdown={breakdown} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
