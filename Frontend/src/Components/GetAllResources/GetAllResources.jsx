import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GetAllResources.css';
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
            setError(err.response.data.msg || 'Could not load resources. Try again later');
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
        <div className='get-all-resources-container'>
            <h2 className='get-all-resources-title'>All Resources</h2>
            <form onSubmit={handleFilterSubmit} className='get-all-resources-form'>
                <input
                    type="text"
                    name="search"
                    placeholder="Search by title or description"
                    value={filters.search}
                    onChange={handleFilterChange}
                    className='get-all-resources-input'
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    className='get-all-resources-input'
                />
                <input
                    type="number"
                    name="semester"
                    placeholder="Semester"
                    value={filters.semester}
                    onChange={handleFilterChange}
                    className='get-all-resources-input'
                />
                <button type="submit" className='get-all-resources-button'>Apply Filters</button>
            </form>
            {loading ? (
                <div className='get-all-resources-loading'>Loading...</div>
            ) : error ? (
                <div className='get-all-resources-error'>{error}</div>
            ) : (
                <>
                    <div
                        className='get-all-resources-grid'
                    >
                        {resources.length === 0 ? (
                            <div className='get-all-resources-no-resources'>No resources found.</div>
                        ) : (
                            resources.map((resource) => {
                                return <div
                                    key={resource._id}
                                    className='get-all-resources-resource'
                                >
                                    <div>
                                        <h3 className='get-all-resources-resource-title'>{resource.title}</h3>
                                        <div className='get-all-resources-resource-rating'>
                                            <strong>Rating:</strong> {resource.averageRating?.toFixed(1) ?? 'N/A'}
                                        </div>
                                        <div className='get-all-resources-resource-uploaded-by'>
                                            <strong>Uploaded By:</strong>{' '}
                                            {resource.uploadedByEmail || 'Unknown'}
                                        </div>
                                        <div className='get-all-resources-resource-subject'>
                                            <strong>Subject:</strong> {resource.subject}
                                        </div>
                                        <div className='get-all-resources-resource-semester'>
                                            <strong>Semester:</strong> {resource.semester}
                                        </div>
                                    </div>
                                    <button
                                        className='get-all-resources-resource-button'
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
                        <div className='get-all-resources-pagination'>
                            {Array.from({ length: totalPages }, (_, idx) => (
                                <button
                                    key={idx + 1}
                                    className='get-all-resources-pagination-button'
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

