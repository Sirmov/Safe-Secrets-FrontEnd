import { ReactNode } from 'react';

import styles from './feature.module.scss';

function Feature({ icon, description }: { icon: ReactNode; description: string }) {
    return (
        <div className={`${styles.feature} col col-3 my-2 my-md-0 bg-light border border-wide rounded-circle`}>
            {icon}
            <p className={styles['feature-description']}>{description}</p>
        </div>
    );
}

export default Feature;
