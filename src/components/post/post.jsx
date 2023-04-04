import React from 'react';

import { IconThumbUp } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { formatDateShort } from '@utils/_';

import styles from './post.module.scss';

function Post({ _id, title, text, _createdOn }) {
    return (
        <div className={`card ${styles.card}`} style={{ height: 250 + 'px' }}>
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <p>{text.split(' ').slice(0, 40).join(' ')} ...</p>
            </div>
            <div className="card-footer">
                <div className="row align-items-center">
                    <div className="col">Uploaded {formatDateShort(_createdOn)}</div>
                    <div className="col-auto">
                        <Link to={`details/${_id}`} className="btn btn-primary me-2">
                            Read more
                        </Link>
                        <IconThumbUp size={28} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
