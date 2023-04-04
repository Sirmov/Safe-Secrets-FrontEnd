import React, { useContext, useState } from 'react';

export const PostsContext = React.createContext();

export function PostsProvider({ children }) {
    const [posts, setPosts] = useState(null);

    return <PostsContext.Provider value={{ posts, setPosts }}>{children}</PostsContext.Provider>;
}

export function usePostsContext() {
    return useContext(PostsContext);
}
