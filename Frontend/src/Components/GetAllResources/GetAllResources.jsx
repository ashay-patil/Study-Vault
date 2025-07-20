import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PAGE_SIZE = 8;

const GetAllResources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        subject: '',
        semester: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    // Build query string from filters and page
    const buildQueryString = (filtersObj, page) => {
        const params = Object.entries(filtersObj)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        if (page) params.push(`page=${page}`);
        return params.length ? `?${params.join('&')}` : '';
    };

    // Fetch resources
    const fetchResources = async (page = 1, filtersObj = filters) => {
        setLoading(true);
        setError('');
        try {
            const res = await axios.get(
                `http://localhost:3000/api/v1/resources/public/get-all-resources${buildQueryString(filtersObj, page)}`
            );
            if (res.status !== 200) {
                throw new Error('Failed to fetch resources');
            }
            setResources(res.data.resources || []);
            setTotalPages(res.data.totalPages || 1);
            setCurrentPage(res.data.currentPage || 1);
        } catch (err) {
            setError('Could not load resources.');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchResources(1, filters);
        // eslint-disable-next-line
    }, []);

    // Handle filter input change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle filter form submit
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchResources(1, filters);
    };

    // Handle page change
    const handlePageChange = (page) => {
        fetchResources(page, filters);
    };

    // Handle view details
    const handleViewDetails = (id) => {
        navigate(`/resource/${id}`);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>All Resources</h2>
            <form onSubmit={handleFilterSubmit} style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    name="search"
                    placeholder="Search by title or description"
                    value={filters.search}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    value={filters.semester}
                    onChange={handleFilterChange}
                />
                <button type="submit">Apply Filters</button>
            </form>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : (
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1.5rem',
                        }}
                    >
                        {resources.length === 0 ? (
                            <div style={{ gridColumn: '1/-1' }}>No resources found.</div>
                        ) : (
                            resources.map((resource) => {
                                return <div
                                    key={resource._id}
                                    style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        padding: '1rem',
                                        background: '#fafafa',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div>
                                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{resource.title}</h3>
                                        <div>
                                            <strong>Rating:</strong> {resource.averageRating?.toFixed(1) ?? 'N/A'}
                                        </div>
                                        <div>
                                            <strong>Uploaded By:</strong>{' '}
                                            {resource.uploadedByEmail || 'Unknown'}
                                        </div>
                                    </div>
                                    <button
                                        style={{
                                            marginTop: '1rem',
                                            padding: '0.5rem 1rem',
                                            background: '#1976d2',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleViewDetails(resource._id)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            })
                        )}
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button
                                    key={idx + 1}
                                    style={{
                                        margin: '0 0.25rem',
                                        padding: '0.5rem 1rem',
                                        background: currentPage === idx + 1 ? '#1976d2' : '#eee',
                                        color: currentPage === idx + 1 ? '#fff' : '#333',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: currentPage === idx + 1 ? 'bold' : 'normal',
                                    }}
                                    onClick={() => handlePageChange(idx + 1)}
                                    disabled={currentPage === idx + 1}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GetAllResources;

