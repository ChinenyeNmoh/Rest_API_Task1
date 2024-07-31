import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {  useGetUsersQuery, useDeletePostMutation, useUpdatePostMutation } from '../slices/postApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FaMapMarker, FaEdit, FaPhone, FaArrowLeft } from "react-icons/fa";
import { MdEmail, MdDelete } from "react-icons/md";
import { removePost, updatePost as updatePostAction } from '../slices/postSlice';
import { useSelector, useDispatch } from 'react-redux';
import Meta from '../components/Meta';
const FullPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postItems } = useSelector((state) => state.post);
  
  let post = postItems?.find(post => post.id.toString() === id.toString());
  
  const { data: users, isLoading } = useGetUsersQuery();
  const user = users?.find(user => user.id === post?.userId) || {};

  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setShow(true);
  };



  const deleteHandler = async () => {
    if (window.confirm('Are you sure?')) {
      try {
        await deletePost(id).unwrap();
        dispatch(removePost(id));
        toast.success("Post deleted successfully");
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'Failed to delete post');
      }
    }
  };

  const editPostHandler = async (e) => {
    e.preventDefault();
    if (title.trim() === '' || body.trim() === '') {
      toast.error('Title and body cannot be empty');
      return;
    }
    try {
      const res = await updatePost({ id, title, body }).unwrap();
      dispatch(updatePostAction({ id, title, body }));
      toast.success("Post updated successfully");
      handleClose();
      setTitle(title);
      setBody(body);
    } catch (err) {
      if(err.originalStatus === 500) {
        dispatch(updatePostAction({ id, title, body }));
        toast.success("Post updated successfully on local storage");
        handleClose();
        setTitle(title);
        setBody(body);
      }else{
        toast.error(err?.data?.message || err.message || 'Failed to update post');
      }
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <Meta title={post.title} description={post.body} />
      <Link to='/all' className='btn btn-light rounded my-3'>
        <FaArrowLeft /> Go Back
      </Link>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header className='fw-bold text-primary'>{post?.title}</Card.Header>
            <Card.Body>
              <Card.Text>{post?.body}</Card.Text>
              <Card.Text><span className='fw-bolder'>Posted by:</span> {user.username || 'Unknown'}</Card.Text>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-center'>
              {isUpdating && <Loader />}
              {isDeleting && <Loader />}
              <Button
                type='button'
                className='btn-block bg-transparent btn btn-link fs-3 text-success'
                onClick={() => handleShow(post)}
                disabled={isUpdating || isDeleting}
              >
                <FaEdit />
              </Button>
              <Modal show={show} onHide={handleClose} centered>
                <Modal.Body>
                  <Form onSubmit={editPostHandler}>
                    <Form.Group className="my-2" controlId="title">
                      <Form.Label className="fw-bold">Title</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="my-2" controlId="body">
                      <Form.Label className="fw-bold">Body</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder="Write post"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                      />
                    </Form.Group>
                    <Modal.Footer>
                      <Button
                        variant="outline-primary"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button 
                        variant="outline-secondary"
                        type="submit"
                      >
                        Update
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Modal>
              <Button
                type='button'
                className='btn-block bg-transparent fs-3 btn btn-link text-danger'
                onClick={deleteHandler}
                disabled={isUpdating || isDeleting}
              >
                <MdDelete />
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header className='fs-2 fw-bold text-center'>Author's Info</Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Card.Text className='fw-bold'>Name:</Card.Text>
                </Col>
                <Col md={9}>
                  <Card.Text>{user.name}</Card.Text>
                </Col>
                <Col md={4}>
                  <Card.Text className='fw-bold'>Username:</Card.Text>
                </Col>
                <Col md={8}>
                  <Card.Text>{user.username}</Card.Text>
                </Col>
                <hr />
                <Col md={1}>
                  <FaMapMarker className='fs-5 text-danger me-2 mb-2' />
                </Col>
                <Col md={11}>
                  <Card.Text className='mb-2'>{user.address?.street} {user.address?.city}</Card.Text>
                </Col>
                <Col md={1}>
                  <FaPhone className='fs-5 me-2 mb-2' />
                </Col>
                <Col md={11}>
                  <Card.Text className='mb-2'>{user.phone}</Card.Text>
                </Col>
                <Col md={1}>
                  <MdEmail className='fs-5 me-2 mb-2 text-primary' />
                </Col>
                <Col md={8}>
                  <Card.Text className='mb-2'>{user.email}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FullPost;
