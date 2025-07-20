import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
            setError('Could not load resource.');
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
            setReviewError(
                err.response?.data?.message ||
                'Could not submit review. You may need to log in or you have already reviewed.'
            );
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
        <div style={{ maxWidth: '700px', margin: '2rem auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #eee', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>{resource.title}</h2>
            <div style={{ marginBottom: '1rem' }}>
                <strong>Subject:</strong> {resource.subject}
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong>Semester:</strong> {resource.semester}
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong>Description:</strong> {resource.description || 'No description'}
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong>Uploaded By:</strong> {resource.uploadedByEmail || 'Unknown'}
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <strong>Average Rating:</strong> {resource.averageRating ? resource.averageRating.toFixed(1) : 'No ratings yet'}
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <a
                    href={resource.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        color: '#1976d2',
                        textDecoration: 'underline',
                        fontWeight: 'bold'
                    }}
                >
                    View PDF
                </a>
            </div>

            <hr style={{ margin: '2rem 0' }} />

            <h3>Reviews</h3>
            {resource.reviews && resource.reviews.length > 0 ? (
                <div style={{ marginBottom: '2rem' }}>
                    {resource.reviews.map((rev, idx) => (
                        <div
                            key={idx}
                            style={{
                                border: '1px solid #eee',
                                borderRadius: '4px',
                                padding: '1rem',
                                marginBottom: '1rem',
                                background: '#fafbfc'
                            }}
                        >
                            <div>
                                <strong>{rev.email || 'Anonymous'}</strong> &nbsp;
                                <span style={{ color: '#f39c12' }}>
                                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                                </span>
                            </div>
                            <div style={{ marginTop: '0.5rem' }}>{rev.comment}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ marginBottom: '2rem', color: '#888' }}>No reviews yet.</div>
            )}

            <h3>Add a Review</h3>
            <form onSubmit={handleReviewSubmit} style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Rating:{' '}
                        <select
                            name="rating"
                            value={reviewForm.rating}
                            onChange={handleReviewChange}
                            required
                            style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Comment:{' '}
                        <textarea
                            name="comment"
                            value={reviewForm.comment}
                            onChange={handleReviewChange}
                            required
                            rows={3}
                            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={reviewSubmitting}
                    style={{
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.5rem 1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                {reviewError && (
                    <div style={{ color: 'red', marginTop: '1rem' }}>{reviewError}</div>
                )}
                {reviewSuccess && (
                    <div style={{ color: 'green', marginTop: '1rem' }}>{reviewSuccess}</div>
                )}
            </form>
        </div>
    );
};

export default GetAResource;
