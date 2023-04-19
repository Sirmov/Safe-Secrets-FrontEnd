import React, { ReactNode, useContext, useState } from 'react';

interface PostsContextType {
    posts: Nullable<Post[]>;
    setPosts?: React.Dispatch<React.SetStateAction<Nullable<Post[]>>>;
    likes: Nullable<Like[]>;
    setLikes?: React.Dispatch<React.SetStateAction<Nullable<Like[]>>>;
}

interface Post {
    title: string;
    text: string;
    _ownerId: string;
    _createdOn: number;
    _updatedOn?: number;
}

interface Like {
    _postId: string;
    _ownerId: string;
}

export const PostsContext = React.createContext<PostsContextType>({ posts: null, likes: null });

export function PostsProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState<Nullable<Post[]>>(null);
    const [likes, setLikes] = useState<Nullable<Like[]>>(null);

    return <PostsContext.Provider value={{ posts, setPosts, likes, setLikes }}>{children}</PostsContext.Provider>;
}

export function usePostsContext() {
    return useContext(PostsContext);
}
