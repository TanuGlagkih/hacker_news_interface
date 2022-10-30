import * as React from 'react';
import { Feed } from 'semantic-ui-react';
import { useAppSelector } from '../../services/config-store';
import NewsItem from '../news-item/news-item';
import styles from './news-feed.module.css';

export default function NewsFeed() {
    const { news } = useAppSelector(state => state.mainStore);

    return (
        <main className={styles.feed}>
            <Feed >
                {news?.map((item) => (
                    <NewsItem
                        key={item.id}
                        title={item.title}
                        rating={item.score}
                        author={item.by}
                        date={item.time}
                        id={item.id} />
                ))}
            </Feed>
        </main>
    )
}