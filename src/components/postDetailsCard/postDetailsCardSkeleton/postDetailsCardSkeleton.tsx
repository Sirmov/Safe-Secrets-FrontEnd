import React from 'react';

import { IconThumbUp } from '@tabler/icons-react';

function PostDetailsCardSkeleton() {
    return (
        <div className="card">
            <div className="card-header">
                <div className="placeholder col-4" />
            </div>
            <div className="card-body">
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
                <div></div>
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
            </div>
            <div className="card-footer">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="placeholder col-4" />
                    </div>
                    <div className="placeholder col-2"></div>
                    <div className="col-auto">
                        <IconThumbUp size={28} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetailsCardSkeleton;
