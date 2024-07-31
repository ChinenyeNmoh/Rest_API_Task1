import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCreatePostMutation } from '../slices/postApiSlice';
import { toast } from 'react-toastify';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { newPost } from '../slices/postSlice';
import Loader from '../components/Loader';
import { useDispatch} from 'react-redux';
import {Meta} from '../components/Meta';

const CreatePost = () => {
  const [title, setTitle] = useState(''); //set state for every field in the form
  const [body, setBody] = useState('');
  const [createPost, {isLoading, error}] = useCreatePostMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to create post');
    }
  }, [error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await createPost({ title, body, userId: 1 }).unwrap(); 
    dispatch(newPost(res));
    toast.success('Post created successfully');
    navigate('/');
    
  };

  return (
    <>
    <Meta title="Create post" />
      {isLoading  && <Loader />}
        <h2 className="text-center mt-3">Add Post</h2>
        <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
        <Card className="my-5">
        <Form className="m-3" onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="title">
            <Form.Label className='fw-bold'>Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="body">
            <Form.Label className='fw-bold'>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write post"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>

          <Button
            disabled={isLoading}
            type="submit"
            variant="primary"
            className="d-block me-auto ms-auto mt-4"
          >
            Add
          </Button>
        </Form>
         
          </Card>
        </Col>
      </Row>
    </Container>
       

     
    </>
  );
};
export default CreatePost;