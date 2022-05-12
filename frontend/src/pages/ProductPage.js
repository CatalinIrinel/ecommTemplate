import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductPage() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existingItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return (
    <div className="mt-4 d-flex align-items-start justify-content-center vh-100">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="mt-4">
          <Row>
            <Col md={4}>
              <img
                className="img-large"
                src={product.image}
                alt={product.name}
              />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush" style={{ height: '234px' }}>
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1 className="mb-0" style={{ fontSize: '2rem' }}>
                    {product.name}
                  </h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2 className="mb-0" style={{ fontSize: '1.5rem' }}>
                    Price: <b>{product.price}&euro;</b>
                  </h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p> {product.description} </p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card style={{ height: '234px' }}>
                <Card.Body>
                  <ListGroup
                    variant="flush"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      height: '100%',
                    }}
                  >
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <b>{product.price}&euro;</b>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          {product.countInStock > 0 ? (
                            <Badge
                              bg="success"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              In Stock
                            </Badge>
                          ) : (
                            <Badge
                              bg="danger"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              Out of Stock
                            </Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to Cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
