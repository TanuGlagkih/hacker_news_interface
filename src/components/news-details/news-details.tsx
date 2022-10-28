import * as React from 'react';
import styles from './news-details.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { TNews } from '../../services/types';
import { cleanAllComments, getComments } from '../../services/main-store';
import { Container } from 'semantic-ui-react';
import { CommentField } from '../comment-field/comment-field';

export default function NewsDetails() {
    const { id } = useParams<{ id?: string }>();
    const { news } = useAppSelector(state => state.mainStore);
    //@ts-ignore
    const item = news.find((item: TNews) => item.id == `${id}`);
    const date = new Date(item.time * 1000).toUTCString();

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        //@ts-ignore
        dispatch(cleanAllComments())
        //@ts-ignore
        item.kids?.map(kid => dispatch(getComments(kid)))
    }, [news]);

    return (
        <div>
            <Container fluid>
                <h1>{item.title}</h1>
                <a>{item.link}</a>
                <p>{date}</p>
                <p>{item.by}</p>
                <p>{item.score}</p>
            </Container>

            <CommentField id={id} />
        </div>
    )
}


