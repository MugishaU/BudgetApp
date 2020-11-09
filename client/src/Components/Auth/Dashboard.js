import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext ";
import { ProfileCard, LineChart, PieChart } from "../index/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

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
          <Col className="colDiv">
            <Card>
              <Card.Body>
                <ProfileCard profile={profile} history={history} />
              </Card.Body>
            </Card>
          </Col>
          <Col className="colDiv">
            <Container>
              <Row>
                <Col className="colDiv">
                  <Card>
                    <Card.Body>
                      <Card.Title className="graduate text-center">
                        SPENT MORE THIS MONTH?
                      </Card.Title>
                      <Button
                        className="colDiv"
                        size="lg"
                        to="/spend"
                        as={Link}
                      >
                        ADD EXPENDITURE
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col className="colDiv">
                  <Card>
                    <Card.Body>
                      <Card.Title className="graduate text-center">
                        WANT MORE DETAIL?
                      </Card.Title>
                      <Button
                        className="colDiv"
                        variant="secondary"
                        size="lg"
                        to="/statement"
                        as={Link}
                      >
                        VIEW STATEMENT
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>

        <Row>
          <Col className="colDiv">
            <Card>
              <Card.Body>
                <LineChart history={history} />
              </Card.Body>
            </Card>
          </Col>
          <Col className="colDiv">
            <Card>
              <Card.Body>
                <PieChart breakdown={breakdown} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
