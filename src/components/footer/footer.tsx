import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useAppDispatch } from '../../services/config-store';
import { fetchData } from '../../services/main-store';
import styles from './footer.module.css';

export default function Footer() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const handleUpdate = () => {
        dispatch(fetchData());
    };

    return (
        <footer className={styles.footer}>
            <h3 className={styles.h}>2022, Hacker News</h3>
            {location.pathname == '/'
                ?
                <Button onClick={handleUpdate} inverted>Update feed</Button>
                :
                <Link to={{ pathname: '/' }} >
                    <Button inverted>Back to feed</Button>
                </Link>
            }
        </footer>
    )
}