import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../appwrite/Service';
import { Button, Container } from '../Components';
import parse from 'html-react-parser';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Post = () => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug)
                .then((p) => {
                    if (p) setPost(p);
                    else navigate('/');
                })
                .catch(() => navigate('/'))
                .finally(() => setLoading(false));
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            await service.deleteFile(post.featuredImage);
            const status = await service.deletePost(slug);
            if (status) navigate('/');
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete the post.");
        }
    };

    return (
        <div className="py-8">
            <Container>
                <SkeletonTheme baseColor="#082f49" highlightColor="#444">
                    <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                        {loading ? (
                            <Skeleton height={400} width="100%" enableAnimation={false} />
                        ) : (
                            <img
                                src={post?.featuredImage ? service.previewFile(post.featuredImage) : ''}
                                alt={post?.title || 'Loading...'}
                                className="rounded-xl"
                            />
                        )}

                        {isAuthor && !loading && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="w-full text-white mb-6">
                        {loading ? (
                            <Skeleton width={300} height={30} />
                        ) : (
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                        )}
                    </div>

                    <div className="browser-css text-blue-100">
                        {loading ? <Skeleton count={5} /> : parse(post.content)}
                    </div>
                </SkeletonTheme>
            </Container>
        </div>
    );
};

export default Post;
