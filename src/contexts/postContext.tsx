import React, { ReactNode, useContext, useState } from 'react';

interface PostContextType {
    post: Nullable<Post>;
    setPost?: React.Dispatch<React.SetStateAction<Nullable<Post>>>;
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

export const PostContext = React.createContext<PostContextType>({ post: null, likes: null });

export function PostProvider({ children }: { children: ReactNode }) {
    const [post, setPost] = useState<Nullable<Post>>(null);
    const [likes, setLikes] = useState<Nullable<Like[]>>(null);

    return <PostContext.Provider value={{ post, setPost, likes, setLikes }}>{children}</PostContext.Provider>;
}

export function usePostContext() {
    return useContext(PostContext);
}
