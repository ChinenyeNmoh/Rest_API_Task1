import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useGetPostsQuery } from '../slices/postApiSlice';
import Post from './Post';
import Message from './Message';
import { Row } from 'react-bootstrap';
import Paginate from './Paginate';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify';
import { addToPosts } from '../slices/postSlice';
import { useDispatch, useSelector } from 'react-redux';

const PostList = ({ isHome = false }) => {
    const [page, setPage] = useState(1);
    const limit = 12;
    const { data: posts, isLoading, error } = useGetPostsQuery();
    const dispatch = useDispatch();
    const location = useLocation();
    // Get the search keyword from the URL
    const query = new URLSearchParams(location.search);
    const keyword = query.get('keyword');

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || 'Failed to fetch data');
        }
    }, [error]);

    const { postItems } = useSelector((state) => state.post);

    // Fetch and add new posts to the Redux store when the initial data is loaded or updated
    useEffect(() => {
        if (posts && postItems?.length === 0) {
            dispatch(addToPosts(posts));
        }
    }, [dispatch, posts]);

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    // Filter posts based on the search keyword
    const filteredPosts = keyword 
        ? postItems.filter(post => post.title.toLowerCase().includes(keyword.toLowerCase()))
        : postItems;

    const displayedPosts = isHome ? filteredPosts?.slice(0, 3) : filteredPosts;
    const indexOfLastPost = page * limit;
    const indexOfFirstPost = indexOfLastPost - limit;
    const currentPosts = displayedPosts?.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <section>
            {isLoading && <Loader />}
            <div>
                {!isHome && (
                    <Link to='/' className='btn btn-light mt-3 rounded'>
                        <FaArrowLeft /> Go Back
                    </Link>
                )}
                <h3 className='fs-3 fw-bolder text-dark mb-6 text-center p-3'>
                    {isHome ? 'Recent Posts' : 'All Posts'}
                </h3>
            </div>
            <Row>
                {currentPosts?.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
                {currentPosts?.length === 0 && <Message variant='danger'>No posts found</Message>}
            </Row>
            {!isHome && filteredPosts?.length > limit && (
                <Paginate
                    total={Math.ceil(filteredPosts?.length / limit)}
                    active={page}
                    onPageChange={handlePageChange}
                />
            )}
        </section>
    );
};

export default PostList;
