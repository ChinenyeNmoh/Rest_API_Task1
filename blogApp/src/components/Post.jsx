import { useState } from "react";
import { Card, Col } from "react-bootstrap";

import { Link } from "react-router-dom";

const Post = ({  post }) => {
    const [show, setShow] = useState(false);
    let body = post.body;
    if (!show && body.length > 50) {
        body = body.slice(0, 50) + '...';
    }

    return (
        <Col md={4} className="mb-4">
            <Card className="h-100 mx-3">
            <Card.Header className='fw-bold text-primary mt-3'>{post.title}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {body}
                        <button
                        className=" btn btn-link"
                        onClick={() => setShow(prevState => !prevState)}
                    >
                        {body.length < 50 ? "" : show  ? 'Less' : 'More'}
                    </button>
                    </Card.Text>
                    <Link
                    to={`/post/${post.id}`}
                    className='text-white px-1 py-1 rounded text-center text-decoration-none bg-secondary'
                >
                    Read More
                </Link>
                    
                </Card.Body>
            </Card>
        </Col>
    );
};

export default Post;
