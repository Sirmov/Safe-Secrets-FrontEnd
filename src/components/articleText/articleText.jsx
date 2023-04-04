import React from 'react';

function ArticleText({ text, children }) {
    const lines = children?.split('\n') ?? text.split('\n');

    return lines.map((line, index) => <p key={index}>{line}</p>);
}

export default ArticleText;
