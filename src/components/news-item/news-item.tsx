import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import Feed from 'semantic-ui-react/dist/commonjs/views/Feed';
import styles from './news-item.module.css';

type TNewsProps = {
    title: string,
    rating: number,
    author: string,
    date: number,
    id: number,
};

export default function NewsItem({ title, rating, author, date, id }: TNewsProps) {
    const publishingDate = new Date((+date) * 1000).toLocaleString("ru-RU");

    return (
        <Feed.Event>
            <Link
                key={id}
                to={{ pathname: `/${id}` }}
                className={styles.box}>
                <Icon disabled color='teal' size='huge' name='hacker news square' />
                <Feed.Content>
                    <Feed.Summary className={styles.summary}>
                        <p className={styles.author}>{author}</p>
                        <Feed.Date className={styles.date}>{publishingDate}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text className={styles.title}>{title}</Feed.Extra>
                    <Feed.Meta className={styles.meta}>
                        <Feed.Like>
                            <Icon name='like' color='teal' />
                            <span>{rating}{rating == 1 ? ' like' : ' likes'}</span>
                        </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Link>
        </Feed.Event>
    )
}