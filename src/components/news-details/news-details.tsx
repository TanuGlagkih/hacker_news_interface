import * as React from 'react';
import styles from './news-details.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { TNews } from '../../services/types';
import { cleanAllComments, getComments } from '../../services/main-store';

export default function NewsDetails() {
    const { id } = useParams<{ id?: string }>();
    const { news, comments } = useAppSelector(state => state.mainStore);
    //@ts-ignore
    const item = news.find((item: TNews) => item.id == `${id}`);
    const date = new Date(item.time * 1000).toUTCString();

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        //@ts-ignore
        dispatch(cleanAllComments())

        //@ts-ignore
        news?.map(item => item.kids?.map(kid => dispatch(getComments(kid))))
    }, [news]);

    const commentsCounter = item.comments?.length ? item.comments?.length : 0

    return (
        <div>
            <h1>{item.title}</h1>
            <a>{item.link}</a>

            <p>{date}</p>
            <p>{item.by}</p>
            <p>{item.score}</p>

            <p>{commentsCounter}</p>
            <div>{comments?.map(comment => (
                <p key={comment.id}>{comment.text}</p>
            ))}</div>
        </div>
    )
}