"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ProductForm from "./components/ProductForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Row className="justify-content-center">
          <Col sm={10} md={8} lg={6} xl={5}>
            <ProductForm></ProductForm>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
}
