import React from 'react';

import styles from './feature.module.scss';

function Feature({ icon, description }) {
    return (
        <div className={`${styles.feature} col col-3 bg-light border border-wide rounded-circle`}>
            {icon}
            <p className={styles['feature-description']}>{description}</p>
        </div>
    );
}

export default Feature;
