// src/components/Item.jsx
import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ prod }) => {
  // Verificar si no hay producto
  if (!prod) return <p>Producto no disponible</p>;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={prod.img || '/imagenes/default-image.jpg'} alt={prod.name} />
      <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
        <Card.Text>${prod.price},00</Card.Text>
        <Link className="btn btn-dark" to={`/item/${prod.id}`}>
          Ver más
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Item;
