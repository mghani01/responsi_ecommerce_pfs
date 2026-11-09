import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col, InputGroup } from 'react-bootstrap';

const ProductForm = ({ show, handleClose, addProduct, editProduct, productToEdit }) => {
  const [product, setProduct] = useState({ 
    name: '', category: 'Action Figure', price: '', discount: 0, stock: '' 
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    } else {
      setProduct({ name: '', category: 'Action Figure', price: '', discount: 0, stock: '' });
    }
  }, [productToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Pastikan harga, diskon, dan stok dikonversi menjadi angka
    const parsedValue = (name === 'price' || name === 'discount' || name === 'stock') ? Number(value) : value;
    setProduct({ ...product, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.name.trim() || product.price <= 0 || product.stock < 0) return;
    productToEdit ? editProduct(product) : addProduct(product);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton closeVariant="white" className="border-secondary pb-2" style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
        <Modal.Title className="fw-bold text-white">
          {productToEdit ? '✏️ Ubah Detail Produk' : '🛍️ Tambah Produk Baru'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-secondary small fw-bold mb-1">Nama Produk</Form.Label>
            <Form.Control type="text" name="name" placeholder="Misal: Helm Iron Man 3D" value={product.name} onChange={handleChange} required className="bg-dark text-white border-secondary shadow-none" />
          </Form.Group>

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary small fw-bold mb-1">Kategori</Form.Label>
                <Form.Select name="category" value={product.category} onChange={handleChange} className="bg-dark text-white border-secondary shadow-none">
                  <option value="Action Figure">Action Figure</option>
                  <option value="Keychain">Keychain</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary small fw-bold mb-1">Stok Gudang</Form.Label>
                <Form.Control type="number" min="0" name="stock" value={product.stock} onChange={handleChange} required className="bg-dark text-white border-secondary shadow-none" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={7}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary small fw-bold mb-1">Harga Normal</Form.Label>
                <InputGroup>
                  <InputGroup.Text className="bg-dark text-secondary border-secondary">Rp</InputGroup.Text>
                  <Form.Control type="number" min="1" name="price" value={product.price} onChange={handleChange} required className="bg-dark text-white border-secondary shadow-none" />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col sm={5}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary small fw-bold mb-1">Diskon</Form.Label>
                <InputGroup>
                  <Form.Control type="number" min="0" max="100" name="discount" value={product.discount} onChange={handleChange} className="bg-dark text-white border-secondary shadow-none" />
                  <InputGroup.Text className="bg-dark text-secondary border-secondary">%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-secondary pt-2" style={{ backgroundColor: '#1e1e1e' }}>
        <Button variant="outline-secondary" onClick={handleClose}>Batal</Button>
        <Button className="btn-stabilo" onClick={handleSubmit}>{productToEdit ? 'Simpan Perubahan' : 'Tambahkan ke Etalase'}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductForm;