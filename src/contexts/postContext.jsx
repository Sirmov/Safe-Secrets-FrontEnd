import React, { useContext, useState } from 'react';

export const PostContext = React.createContext();

export function PostProvider({ children }) {
    const [post, setPost] = useState(null);

    return <PostContext.Provider value={{ post, setPost }}>{children}</PostContext.Provider>;
}

export function usePostContext() {
    return useContext(PostContext);
}
