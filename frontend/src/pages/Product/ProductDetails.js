import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import ProductReview from './productReview';
import ReviewForm from './ReviewForm'; // Import the ReviewForm component

export default function ProductDetails({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [showReviewModal, setShowReviewModal] = useState(false); // State for showing the review modal
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { id } = useParams();
    const email = localStorage.getItem("email");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching product with ID:", id);
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log("Product fetched successfully:", res.product);
                setProduct(res.product);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    function addToCart() {
        if (!email) {
            toast.error("Please login to add items to the cart.");
            navigate('/login');
            return;
        }

        if (!product) {
            toast.error("Product information is missing.");
            return;
        }

        const itemExist = cartItems.find((item) => item.product._id === product._id);

        if (!itemExist) {
            const newItem = { product, qty };
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart Item added successfully!");
            navigate('/cart');
        } else {
            toast.info("Item already exists in the cart.");
        }
    }

    function increaseQty() {
        if (product.stock === qty) {
            return;
        }
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }

    function handleReviewSubmit() {
        console.log("Submitting review:", { rating, comment });
        setShowReviewModal(false);
    }

    return product && (
        <div className="container container-fluid my-3">
            <div className="row f-flex justify-content-around details">
                <div className="col-12 col-lg-5 img-fluid" id="product_image">
                    <img src={product.image ? product.image.url : "product"} alt={product.name} height="500" width="500" />
                </div>

                <div className="col-12 col-lg-5 mt-5 dish-box">
                    <h3 style={{ marginTop: '20px' }}>{product.name}</h3>
                    <p id="product_id">Product #{product._id}</p>

                    <hr />

                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                    </div>

                    <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    <hr />
                    <p id="product_price">Rs. {product.price}</p>
                    <hr />
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger s1 minus" onClick={decreaseQty}>-</span>
                        <input type="number" className="form-control count d-inline" value={qty} readOnly />
                        <span className="btn btn-primary s1 plus" onClick={increaseQty}>+</span>
                    </div>

                    <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                    <hr />
                    <h4 className="mt-2">Description:</h4>
                    <p>{product.description}</p>
                    <hr />
                    <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                    <button
                        type="button"
                        onClick={addToCart}
                        disabled={product.stock === 0}
                        id="cart_btn"
                        className="btn btn-primary1 d-inline ml-4">Add to Cart</button>

                    <button onClick={() => setShowReviewModal(true)} id="review_btn" type="button" className="btn btn-primary1 d-inline ml-4">
                        Submit Your Review
                    </button>

                </div>
            </div>

            {product.reviews && product.reviews.length > 0 && <ProductReview reviews={product.reviews} />}

            <ReviewForm // Render the ReviewForm component
                show={showReviewModal}
                handleClose={() => setShowReviewModal(false)}
                submitReview={handleReviewSubmit}
            />
        </div>
    );
}
