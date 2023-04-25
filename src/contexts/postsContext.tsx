import { ReactNode, createContext, useContext, useState } from 'react';

import { Like } from '@models/like/like';
import { Post } from '@models/post/post';

interface PostsContextType {
    posts: Nullable<Post[]>;
    setPosts?: React.Dispatch<React.SetStateAction<Nullable<Post[]>>>;
    likes: Nullable<Like[]>;
    setLikes?: React.Dispatch<React.SetStateAction<Nullable<Like[]>>>;
}

export const PostsContext = createContext<PostsContextType>({ posts: null, likes: null });

export function PostsProvider({ children }: { children: ReactNode }) {
    const [posts, setPosts] = useState<Nullable<Post[]>>(null);
    const [likes, setLikes] = useState<Nullable<Like[]>>(null);

    return <PostsContext.Provider value={{ posts, setPosts, likes, setLikes }}>{children}</PostsContext.Provider>;
}

export function usePostsContext() {
    return useContext(PostsContext);
}
