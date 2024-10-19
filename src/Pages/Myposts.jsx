import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../Components';
import service from '../appwrite/Service';
import Skeleton from 'react-loading-skeleton'; // Importing the Skeleton component
import 'react-loading-skeleton/dist/skeleton.css';

const Myposts = () => {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setposts(posts.documents);
            }
            setLoading(false); // Set loading to false after fetching posts
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <hr />
                <div className='grid md:grid-cols-4'>
                    {loading ? ( // Show skeletons while loading
                        Array.from({ length: 4 }).map((_, index) => ( // Adjust the length based on your grid
                            <div key={index} className='p-2 md:col-span-1 w-full'>
                                <Skeleton height={200} /> {/* Adjust height based on your PostCard design */}
                            </div>
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

export default Myposts;
