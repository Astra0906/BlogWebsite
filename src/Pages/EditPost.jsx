import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../Components';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/Service';
import Skeleton from 'react-loading-skeleton'; // Importing the Skeleton component
import 'react-loading-skeleton/dist/skeleton.css';

const EditPost = () => {
    const [post, setpost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((p) => {
                if (p) {
                    setpost(p);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8 w-full'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className='py-8 w-full'>
            <Container>
                {/* Loading skeleton for the post form */}
                <Skeleton count={5} height={30} className="mb-4" />
                <Skeleton height={300} className="mb-4" />
            </Container>
        </div>
    );
};

export default EditPost;
