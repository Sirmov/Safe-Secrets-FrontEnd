import React, { ReactNode, useContext, useState } from 'react';

import { Like } from '@models/like/like';
import { DetailedPost } from '@models/post/detailedPost';

interface PostContextType {
    post: Nullable<DetailedPost>;
    setPost?: React.Dispatch<React.SetStateAction<Nullable<DetailedPost>>>;
    likes: Nullable<Like[]>;
    setLikes?: React.Dispatch<React.SetStateAction<Nullable<Like[]>>>;
}

export const PostContext = React.createContext<PostContextType>({ post: null, likes: null });

export function PostProvider({ children }: { children: ReactNode }) {
    const [post, setPost] = useState<Nullable<DetailedPost>>(null);
    const [likes, setLikes] = useState<Nullable<Like[]>>(null);

    return <PostContext.Provider value={{ post, setPost, likes, setLikes }}>{children}</PostContext.Provider>;
}

export function usePostContext() {
    return useContext(PostContext);
}
