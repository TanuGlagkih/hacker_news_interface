import * as React from 'react';
import { useAppDispatch } from '../../services/config-store';
import { cleanStore, fetchData } from '../../services/main-store';
import styles from './header.module.css';
import { Button, Icon } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    console.log(location)

    const handleUpdate = () => {
        //@ts-ignore
        dispatch(fetchData());
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <section className={styles.box}>
                    <Icon color='teal' size='huge' name='hacker news' />
                    <h1 className={styles.title}>Hacker News</h1>
                </section>
                {location.pathname == '/'
                    ?
                    <Button onClick={handleUpdate} inverted>Update feed</Button>
                    :
                    <Link to={{ pathname: '/' }} >
                        <Button inverted>Back to feed</Button>
                    </Link>
                }
            </div>
        </header>
    )
}