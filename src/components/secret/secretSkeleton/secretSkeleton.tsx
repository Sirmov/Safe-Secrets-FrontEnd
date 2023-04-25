import { IconDots } from '@tabler/icons-react';

function SecretSkeleton() {
    return (
        <div className="card mt-3">
            <div className="card-header card-header-light">
                <div className="placeholder col-3"></div>
                <button className="ms-auto btn btn-sm text-white bg-cyan">
                    <IconDots />
                </button>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="placeholder col"></div>
                    <div className="col-auto">
                        <button className="btn btn-warning bg-yellow me-2">Update</button>
                        <button className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <div className="row align-items-center justify-content-between">
                    <div className="placeholder placeholder-xs col-6"></div>
                    <div className="col-auto">
                        <button className="btn btn-success">Decrypt</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SecretSkeleton;
