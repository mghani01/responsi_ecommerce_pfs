import React, { useState } from 'react';
import { Button, Card, Badge, Row, Col } from 'react-bootstrap';

const ProductList = ({ products, deleteProduct, showEditForm }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const getCategoryIcon = (category) => {
    if (category.includes('Action Figure')) return '🦸‍♂️';
    if (category.includes('Keychain')) return '🔑';
    return '🧊';
  };

  // Format ke Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <div className="mt-4">
      {products.length === 0 ? (
        <div className="text-center text-secondary my-5 py-5 rounded-4" style={{ backgroundColor: '#2d2d2d', border: '1px dashed #444' }}>
          <div className="fs-1 mb-2">🛒</div>
          <h5 className="fw-bold text-white">Etalase Kosong</h5>
          <p>Belum ada produk 3D yang ditambahkan ke toko.</p>
        </div>
      ) : (
        <Row>
          {products.map((product) => {
            // Logika hitung diskon
            const finalPrice = product.price - (product.price * (product.discount / 100));
            const isOutOfStock = product.stock <= 0;

            return (
              <Col md={6} key={product.id}>
                <Card
                  id={`product-card-${product.id}`}
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#2d2d2d',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === product.id ? 'translateY(-4px)' : 'translateY(0)',
                    border: hoveredCard === product.id ? '1px solid #39ff14' : '1px solid #444',
                    borderLeft: isOutOfStock ? '5px solid #dc3545' : '5px solid #39ff14'
                  }}
                  className="mb-3 rounded-4 overflow-hidden shadow-sm text-white"
                >
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div className="rounded-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '24px', backgroundColor: '#1e1e1e', border: '1px solid #444' }}>
                        {getCategoryIcon(product.category)}
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-bold text-white text-truncate">{product.name}</h6>
                        <Badge bg="dark" text="light" className="border border-secondary">{product.category}</Badge>
                        <Badge bg={isOutOfStock ? "danger" : "success"} className="ms-2">
                          Stok: {product.stock}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between align-items-end">
                      <div>
                        {product.discount > 0 ? (
                          <>
                            <small className="text-secondary text-decoration-line-through me-2">{formatRupiah(product.price)}</small>
                            <Badge bg="danger" className="mb-1">-{product.discount}%</Badge>
                            <h5 className="mb-0 fw-bold" style={{ color: '#39ff14' }}>{formatRupiah(finalPrice)}</h5>
                          </>
                        ) : (
                          <h5 className="mb-0 fw-bold text-white">{formatRupiah(product.price)}</h5>
                        )}
                      </div>
                      <div className="d-flex gap-2">
                        <Button variant="outline-light" size="sm" onClick={() => showEditForm(product)}>Ubah</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => deleteProduct(product.id)}>Hapus</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default ProductList;