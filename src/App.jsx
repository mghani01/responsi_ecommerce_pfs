import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  // State dengan beberapa data awal (dummy) agar etalase tidak kosong saat di-demo ke dosen
  const [products, setProducts] = useState([
    { id: 1, name: 'Custom Action Figure 15cm', category: 'Action Figure', price: 250000, discount: 10, stock: 5 },
    { id: 2, name: 'Gantungan Kunci Logo (Isi 5)', category: 'Keychain', price: 50000, discount: 0, stock: 15 },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Animasi jQuery saat halaman dimuat (Syarat Modul 4)
  useEffect(() => {
    if (window.$) {
      window.$('.dashboard-container').hide().fadeIn(1200);
    }
  }, []);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    setProductToEdit(null);
  };

  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };
    setProducts([...products, newProduct]);
  };

  const editProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const deleteProduct = (id) => {
    if (window.$) {
      // Animasi jQuery menghapus produk dari etalase
      window.$(`#product-card-${id}`).slideUp(400, () => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      });
    } else {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const showEditForm = (product) => {
    setProductToEdit(product);
    handleShowForm();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-4 dashboard-container" style={{ maxWidth: '950px' }}>
      <div className="p-4 rounded-4 shadow-sm border border-secondary" style={{ backgroundColor: '#1e1e1e', color: 'white' }}>
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="fw-bold mb-0 text-white">📦 Etalase Toko Ghancstm</h2>
            <p className="text-secondary mb-0">Kelola katalog produk 3D, stok, harga, dan diskon toko online.</p>
          </Col>
          <Col xs="auto">
            <Button className="rounded-pill px-4 shadow-sm btn-stabilo" onClick={handleShowForm}>
              + Tambah Produk Baru
            </Button>
          </Col>
        </Row>

        <InputGroup className="mb-4 shadow-sm">
          <InputGroup.Text className="border-end-0" style={{ backgroundColor: '#2d2d2d', borderColor: '#444', color: 'white' }}>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Cari nama produk atau kategori di etalase..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-start-0 border-end-0 ps-0 shadow-none text-white"
            style={{ backgroundColor: '#2d2d2d', borderColor: '#444' }}
          />
          {searchTerm && (
            <Button 
              className="border border-start-0 px-3"
              style={{ backgroundColor: '#2d2d2d', borderColor: '#444', color: 'white' }}
              onClick={() => setSearchTerm('')}
            >
              ✕
            </Button>
          )}
        </InputGroup>

        <ProductList
          products={filteredProducts}
          deleteProduct={deleteProduct}
          showEditForm={showEditForm}
        />

        <ProductForm
          show={showForm}
          handleClose={handleCloseForm}
          addProduct={addProduct}
          editProduct={editProduct}
          productToEdit={productToEdit}
        />
      </div>
    </Container>
  );
}

export default App;