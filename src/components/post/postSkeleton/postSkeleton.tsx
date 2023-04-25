import { IconThumbUp } from '@tabler/icons-react';

function PostSkeleton() {
    return (
        <div className="card">
            <div className="card-header">
                <div className="placeholder col-4" />
            </div>
            <div className="card-body">
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
                <div className="placeholder col-10" />
            </div>
            <div className="card-footer">
                <div className="row align-items-center">
                    <div className="col">
                        <div className="placeholder col-6" />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary me-2">Read more</button>
                        <IconThumbUp size={28} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostSkeleton;
