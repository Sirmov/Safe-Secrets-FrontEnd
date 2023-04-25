function SecretDetailsCardSkeleton() {
    return (
        <div className="card">
            <div className="card-header">
                <div className="placeholder col-3"></div>
            </div>
            <div className="card-body p-4">
                <form className="text-start">
                    <div className="d-flex gap-3 flex-column flex-md-row">
                        <div className="w-100 w-50-md">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <div className="placeholder col-12"></div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Text</label>
                                <div className="placeholder col-12"></div>
                                <div className="placeholder col-12"></div>
                                <div className="placeholder col-12"></div>
                                <div className="placeholder col-12"></div>
                            </div>
                            <div>
                                <label className="form-label">Favorite</label>
                                <div className="placeholder col-12"></div>
                            </div>
                        </div>
                        <div className="w-100 w-50-md">
                            <div className="mb-3">
                                <label className="form-label">Created on</label>
                                <div className="placeholder col-12"></div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Updated on</label>
                                <div className="placeholder col-12"></div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Author email</label>
                                <div className="placeholder col-12"></div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SecretDetailsCardSkeleton;
