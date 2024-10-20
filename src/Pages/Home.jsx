import React, { useEffect, useState } from 'react';
import { Container, PostCard, SectionDivider } from '../Components';
import service from '../appwrite/Service';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './Home.css'; // Add animation CSS here
import { h1 } from 'framer-motion/client';
import Services from './Services';
import About from './About';
import Contact from './Contact';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [inProp, setInProp] = useState(true); // For smooth transition

    useEffect(() => {
        setLoading(true);
        service.getPosts([])
            .then((post) => {
                if (post) {
                    setPosts(post.documents);
                }
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
           
    }, [authStatus]);

    const handlePostClick = (id) => {
        setInProp(false); // Trigger exit animation
        setTimeout(() => {
            navigate(`/post/${id}`); // Navigate after animation
        }, 500); // Match the animation duration
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <CSSTransition
            in={inProp}
            timeout={500} // Animation duration
            classNames="fade"
            unmountOnExit
        >
            <div className="w-full py-8">
                <Container>
                    <SectionDivider title="Articles" />
                    {authStatus? <><div className="grid md:grid-cols-4 gap-4">
                        {posts.map((p) => (
                            <div 
                                key={p.$id} 
                                className="p-2 md:col-span-1 w-full"
                                onClick={() => handlePostClick(p.$id)}
                            >
                                <PostCard {...p} />
                            </div>
                        ))}
                        
                    </div>
                    <About/>
                    <Services/>
                    <Contact/></>
                    :<>
                    <h1 className='font-bold text-center text-cyan-100 text-5xl'>Login to view posts</h1>
                    <About/>
                    <Services/>
                    <Contact/>
                    </>
                    
                    }
                </Container>
            </div>
        </CSSTransition>
    );
};

export default Home;
