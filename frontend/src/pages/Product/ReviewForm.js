import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const ReviewForm = ({ show, handleClose, submitReview }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = () => {
        submitReview({ rating, comment });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Submit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= rating ? 'star filled' : 'star'}
                            onClick={() => handleRatingChange(star)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Enter your review..."
                    className="form-control mt-3 "
                
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReviewForm;
