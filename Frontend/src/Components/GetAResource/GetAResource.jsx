import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GetAResource.css';

const GetAResource = () => {
    const { id } = useParams();
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reviewForm, setReviewForm] = useState({
        rating: '',
        comment: ''
    });
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewError, setReviewError] = useState('');
    const [reviewSuccess, setReviewSuccess] = useState('');

    const fetchResource = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/resources/public/get-single-resource/${id}`);
            setResource(res.data);
        } catch (err) {
            setError(err.response.data.msg || 'Could not load resource. Try again later');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResource();
        // eslint-disable-next-line
    }, [id]);

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewSubmitting(true);
        setReviewError('');
        setReviewSuccess('');
        try {
            await axios.post(
                `http://localhost:3000/api/v1/resources/protected/add-review/${id}`,
                {
                    rating: reviewForm.rating,
                    comment: reviewForm.comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setReviewSuccess('Review added successfully!');
            setReviewForm({ rating: '', comment: '' });
            fetchResource(); // Refresh resource to show new review
        } catch (err) {
            console.log(err);
            setReviewError(err.response.data.message || err.response.data.msg || 'Could not submit review. Try again later');
        } finally {
            setReviewSubmitting(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>{error}</div>;
    }

    if (!resource) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Resource not found.</div>;
    }

    return (
        <div className='get-a-resource-container'>
            <h2>{resource.title}</h2>
            <div className='get-a-resource-subject'>
                <strong>Subject:</strong> {resource.subject}
            </div>
            <div className='get-a-resource-semester'>
                <strong>Semester:</strong> {resource.semester}
            </div>
            <div className='get-a-resource-description'>
                <strong>Description:</strong> {resource.description || 'No description'}
            </div>
            <div className='get-a-resource-uploaded-by'>
                <strong>Uploaded By:</strong> {resource.uploadedByEmail || 'Unknown'}
            </div>
            <div className='get-a-resource-average-rating'>
                <strong>Average Rating:</strong> {resource.averageRating ? resource.averageRating.toFixed(1) : 'No ratings yet'}
            </div>
            <div className='get-a-resource-pdf-url'>
                <a
                    href={resource.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='get-a-resource-pdf-url-link'
                >
                    View PDF
                </a>
            </div>

            <hr />

            <h3>Reviews</h3>
            {resource.reviews && resource.reviews.length > 0 ? (
                <div className='get-a-resource-reviews'>
                    {resource.reviews.map((rev, idx) => (
                        <div
                            key={idx}
                            className='get-a-resource-review'
                        >
                            <div className='get-a-resource-review-email'>
                                <strong>{rev.email || 'Anonymous'}</strong> &nbsp;
                                <span className='get-a-resource-review-rating'>
                                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                </span>
                            </div>
                            <div className='get-a-resource-review-comment'>{rev.comment}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='get-a-resource-no-reviews'>No reviews yet.</div>
            )}

            <h3>Add a Review</h3>
            <form onSubmit={handleReviewSubmit} className='get-a-resource-add-review-form'>
                <div className='get-a-resource-add-review-form-group'>
                    <label>
                        Rating:{' '}
                        <select
                            name="rating"
                            value={reviewForm.rating}
                            onChange={handleReviewChange}
                            required
                            className='get-a-resource-add-review-form-group-select'
                        >
                            <option value="">Select</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className='get-a-resource-add-review-form-group'>
                    <label>
                        Comment:{' '}
                        <textarea
                            name="comment"
                            value={reviewForm.comment}
                            onChange={handleReviewChange}
                            required
                            rows={3}
                            className='get-a-resource-add-review-form-group-textarea'
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className='get-a-resource-add-review-form-group-button'
                >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                {reviewError && (
                    <div className='get-a-resource-add-review-form-group-error'>{reviewError}</div>
                )}
                {reviewSuccess && (
                    <div className='get-a-resource-add-review-form-group-success'>{reviewSuccess}</div>
                )}
            </form>
        </div>
    );
};

export default GetAResource;
