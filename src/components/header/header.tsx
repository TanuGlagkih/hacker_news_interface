import * as React from 'react';
import { useAppDispatch } from '../../services/config-store';
import { cleanStore, fetchData } from '../../services/main-store';
import styles from './header.module.css';

export default function Header() {
    const dispatch = useAppDispatch()

    const handleUpdate = () => {
        //@ts-ignore
        dispatch(fetchData());
    };

    return (
        <header>
            <section>
                <img></img>
                <h1>Hacker News</h1>
            </section>
            <button onClick={handleUpdate}>update</button>
        </header>
    )
}