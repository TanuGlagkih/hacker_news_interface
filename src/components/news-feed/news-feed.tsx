import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { getNews } from '../../services/main-store';
import FeedItem from '../news-item/news-item';
import styles from './news-feed.module.css';

export default function NewsFeed() {
    const dispatch = useAppDispatch();
    const { ids, news } = useAppSelector(state => state.mainStore)

    React.useMemo(() => {
        //@ts-ignore
        ids?.map(id => dispatch(getNews(id)))
    }, [ids]);

    return (
        <main>
            {news?.map(item => (
                <FeedItem
                    key={item.id}
                    title={item.title}
                    rating={item.score}
                    author={item.by}
                    date={item.time}
                    id={item.id} />
            ))}

        </main>
    )
}