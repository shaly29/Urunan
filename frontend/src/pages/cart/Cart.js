import React, { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect } from 'react';

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        userName: '',
        phoneNo: '',
        address: '',
    });
    const [hasOrders, setHasOrders] = useState(false);
    const userId = localStorage.getItem("userId");

    function increaseQty(item) {
        if (item.product.stock === item.qty) {
            return;
        }
        const updatedItems = cartItems.map((i) => {
            if (i.product._id === item.product._id) {
                i.qty++;
            }
            return i;
        });
        setCartItems(updatedItems);
    }

    function decreaseQty(item) {
        if (item.qty > 1) {
            const updatedItems = cartItems.map((i) => {
                if (i.product._id === item.product._id) {
                    i.qty--;
                }
                return i;
            });
            setCartItems(updatedItems);
        }
    }

    function removeItem(item) {
        const updatedItems = cartItems.filter((i) => i.product._id !== item.product._id);
        setCartItems(updatedItems);
    }

    function placeOrderHandler() {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, cashOnDelivery, cartItems })
        })
            .then(() => {
                setCartItems([]);
                setComplete(true);
                toast.success("Order Success!");
            });
    }

    const makePayment = (token) => {
        const body = {
            token,
            cartItems
        };
        const headers = {
            "Content-Type": "application/json"
        };
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/payment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        }).then((response) => {
            console.log(response);
            placeOrderHandler();
            setCartItems([]);
            setComplete(true);
        }).catch((error) => {
            console.log(error);
        });
    };

    const openFormHandler = () => {
        setIsFormOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const checkUserId = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/check-user-orders/${userId}`);
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                setHasOrders(data.hasOrders);
            } else {
                console.error('Failed to check user orders');
            }
        } catch (error) {
            console.error('Error checking user orders:', error);
        }
    };

    useEffect(() => {
        checkUserId();
    }, [userId]);

    const submitFormHandler = async () => {
        try {
            const formDataWithUserId = {
                ...formData,
                userId: userId,
            };
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithUserId),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }
            console.log('Form data submitted successfully');
        } catch (error) {
            console.error('Error submitting form data:', error);
        }

        // Close the form after submitting
        checkUserId();
        setIsFormOpen(false);
    };

    return cartItems.length > 0 ? (
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5 details" >Your Cart: <b>{cartItems.length} items</b></h2>
                <div className="row d-flex justify-content-between dish-box">
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item) => (
                            <Fragment key={item.product._id}>
                                <hr />
                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.product.image ? item.product.image.url : 'placeholder.jpg'} alt={item.product.name} height="90" width="115" />
                                        </div>
                                        <div className="col-5 col-lg-3">
                                            <Link to={"/product/" + item.product._id}>{item.product.name}</Link>
                                        </div>
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">Rs.{item.product.price}</p>
                                        </div>
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus s1" onClick={() => decreaseQty(item)} >-</span>
                                                <input type="number" className="form-control count d-inline" value={item.qty} readOnly />
                                                <span className="btn btn-primary plus s1" onClick={() => increaseQty(item)}>+</span>
                                            </div>
                                        </div>
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item1" onClick={() => removeItem(item)} className="uil1 uil-trash-alt sec-btn2 "></i>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                    <div className="col-12 col-lg-3 my-4 dish-box">
                        <div id="order_summary ">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal: <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                            <p>Est. total: <span className="order-summary-values">Rs{Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)}</span></p>
                            <hr />
                            <input
                                type="radio"
                                id="cashOnDeliveryTrue"
                                name="cashOnDelivery"
                                value={true}
                                checked={cashOnDelivery}
                                onChange={() => setCashOnDelivery(true)}
                            />
                            <label htmlFor="cashOnDeliveryTrue">Cash on Delivery</label>
                            <input
                                type="radio"
                                id="cashOnDeliveryFalse"
                                name="cashOnDelivery"
                                value={false}
                                checked={!cashOnDelivery}
                                onChange={() => setCashOnDelivery(false)}
                            />
                            <label htmlFor="cashOnDeliveryFalse">Online Payment</label>
                            {hasOrders ? (
                                <button
                                    id="checkout_btn"
                                    onClick={placeOrderHandler}
                                    className="btn btn-primary btn-block"
                                    style={{ display: cashOnDelivery ? 'block' : 'none' }}
                                >
                                    Cash on Delivery
                                </button>
                            ) : (
                                <button id="checkout_btn" onClick={openFormHandler} className="btn btn-primary btn-block" style={{ display: cashOnDelivery ? 'block' : 'none' }}>
                                    Place Order
                                </button>
                            )}
                            {hasOrders ? (
                                <StripeCheckout
                                    stripeKey='pk_test_51OmbnkIKvzHXhlG4X2yyHDzwV4gHzk95Zuc86vRk4OkCaaFh50y0joYCjX0KZ1kZCKPFKVla3jqvzjyXBomdEETr00RSJoXjQz'
                                    token={(token) => makePayment(token)}
                                    currency='LKR'
                                    name={cartItems.length > 0 ? cartItems[0].product.name : 'Default Name'}
                                    amount={cartItems.length > 0 ? cartItems[0].product.price * 100 : 0}
                                >
                                    <button id="checkout_btn" className="btn btn-primary btn-block" style={{ display: cashOnDelivery ? 'none' : 'block' }}>
                                        Place Order
                                    </button>
                                </StripeCheckout>
                            ) : (
                                <button id="checkout_btn" onClick={openFormHandler} className="btn btn-primary btn-block" style={{ display: cashOnDelivery ? 'none' : 'block' }}>
                                    Place Order
                                </button>
                            )}
                            {isFormOpen && (
                                <Modal show={isFormOpen} onHide={() => setIsFormOpen(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Submit Form</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <label>
                                            User Name:
                                            <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} style={{width:"400px"}}/>
                                        </label>
                                        <label>
                                            Phone No:
                                            <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} style={{width:"400px"}} />
                                        </label>
                                        <label>
                                            Address:
                                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} style={{width:"400px"}} />
                                        </label>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setIsFormOpen(false)}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={submitFormHandler}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : (!complete ? (
        <h2 className='mt-5 ' style={{ margin: '250px', paddingTop: "100px" }}>Your Cart is Empty!</h2>
    ) : (
        <Fragment>
            <div className='details' style={{ margin: '0 0 50px 0' }}>
                <h2 className='mt-5' >Order Complete!</h2>
                <p>Your order has been placed successfully.</p>
            </div>
        </Fragment>
    ));
}
