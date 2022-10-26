import * as React from 'react';
import styles from './feed-item.module.css';

export default function NewsItem() {
    return (
        <li>
            <title>title</title>
            <p>rating</p>
            <p>author</p>
            <p>date</p>
            <p>counter</p>
            <div>comments</div>
        </li>
    )
}