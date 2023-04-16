import React, { ReactNode } from 'react';

function ArticleText({ text, children }: { text: string; children?: ReactNode }) {
    let lines: string[] = [];

    if (children) {
        if (typeof children === 'string') {
            lines = children.split('\n');
        } else if (Array.isArray(children)) {
            lines = children
                .filter((x) => typeof x === 'string')
                .join('\n')
                .split('\n');
        }
    } else {
        lines = text.split('\n');
    }

    return lines.map((line, index) => <p key={index}>{line}</p>);
}

export default ArticleText;
