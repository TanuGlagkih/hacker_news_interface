import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/config-store';
import styles from './feed-item.module.css';

type TNewsProps = {
    title: string,
    rating: number,
    author: string,
    date: number,
    id: number,
};

export default function NewsItem({ title, rating, author, date, id }: TNewsProps) {

    const { } = useAppSelector(state => state)
    const location = useLocation();


    const linkTo = `/${id}`;

    var dat = new Date((+date) * 1000).toUTCString();



    return (
        <>
            <Link
                key={id}
                to={{
                    pathname: linkTo,
                    //state: { background: location }
                }}

            >
                <li>
                    <h2>{title}</h2>
                    <p>{rating}</p>
                    <p>{author}</p>

                    <p>{dat}</p>
                </li>
            </Link>
        </>
    )
}