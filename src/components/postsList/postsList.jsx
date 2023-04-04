import React, { useEffect } from 'react';

import { toast } from 'react-toastify';

import { usePostsContext } from '@contexts/postsContext';

import { getAllPosts } from '@services/postsService';

import Post from '@components/post/post';
import PostSkeleton from '@components/post/postSkeleton/postSkeleton';

function PostsList() {
    const { posts, setPosts } = usePostsContext();

    useEffect(() => {
        getAllPosts()
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const posts = Object.values(res.data);
                    setPosts(posts);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, []);

    return (
        <>
            {posts === null ? (
                <div className="row row-cards">
                    <div className="col col-lg-4 col-sm-6 col-12">
                        <PostSkeleton />
                    </div>
                    <div className="col col-lg-4 col-sm-6 col-12">
                        <PostSkeleton />
                    </div>
                    <div className="col col-lg-4 col-sm-6 col-12">
                        <PostSkeleton />
                    </div>
                </div>
            ) : posts.length < 1 ? (
                <p className="display-6 text-center">No posts yet 😔.</p>
            ) : (
                <div className="row row-cards gap-2">
                    {posts.map((post) => (
                        <div className="col col-lg-4 col-sm-6 col-12" key={post._id}>
                            <Post {...post} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default PostsList;
