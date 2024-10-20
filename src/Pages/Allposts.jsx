import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../Components';
import service from '../appwrite/Service';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Allposts = () => {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setposts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <hr />
                <div className='grid md:grid-cols-4'>
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonTheme
                                key={index} // Added unique key for each skeleton
                                baseColor="#082f49"
                                highlightColor="#444"
                                enableAnimation={true}
                            >
                                <div className='p-2 md:col-span-1 w-full'>
                                    <Skeleton height={200} />
                                </div>
                            </SkeletonTheme>
                        ))
                    ) : (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 md:col-span-1 w-full'>
                                <PostCard {...post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Allposts;
