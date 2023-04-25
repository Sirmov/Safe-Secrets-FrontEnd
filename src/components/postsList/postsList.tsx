import { useEffect } from 'react';

import { toast } from 'react-toastify';

import { usePostsContext } from '@contexts/postsContext';

import { Like } from '@models/like/like';
import { Post as PostModel } from '@models/post/post';

import { getAllLikes } from '@services/likesService';
import { getAllPosts } from '@services/postsService';

import Post from '@components/post/post';
import PostSkeleton from '@components/post/postSkeleton/postSkeleton';

function PostsList() {
    const { posts, setPosts, likes, setLikes } = usePostsContext();

    useEffect(() => {
        getAllPosts()
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const posts = Object.values(res.data) as PostModel[];
                    setPosts?.(posts);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, []);

    useEffect(() => {
        getAllLikes()
            .then((res) => {
                if (!res.isOk) {
                    toast.error('Something went wrong.');
                } else {
                    const likes = Object.values(res.data) as Like[];
                    setLikes?.(likes);
                }
            })
            .catch((error) => {
                toast.error('Something went wrong.');
                console.error(error);
            });
    }, []);

    return (
        <>
            {posts === null || likes === null ? (
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
                            <Post {...post} likes={likes.filter((like) => like._postId === post._id)} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default PostsList;
