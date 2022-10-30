import * as React from 'react';
import styles from './news-details.module.css';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { TNews } from '../../services/types';
import { cleanComments, getComments, getNews } from '../../services/main-store';
import { Container, Icon, Loader } from 'semantic-ui-react';
import { CommentField } from '../comment-field/comment-field';

export default function NewsDetails() {
    const [refresh, setRefresh] = React.useState(false);
    const { id } = useParams<{ id?: string }>();
    const { news } = useAppSelector(state => state.mainStore);
    const dispatch = useAppDispatch();

    const item = news?.find((item: TNews) => item.id == parseInt(`${id}`));

    const date = React.useMemo(() => {
        return new Date(item?.time * 1000).toLocaleString("ru-RU");
    }, [item])

    React.useEffect(() => {
        if (!news.length) {
            const newId = parseInt(id);
            dispatch(getComments(newId));
        } else {
            item?.kids?.map(kid => dispatch(getComments(kid)))
        }
        return () => { dispatch(cleanComments()) };
    }, [news, refresh]);

    if (!item) return <Loader active inline='centered' />

    return (
        <div className={styles.wrapper}>
            <Container fluid className={styles.box}>
                <a href={item.url} target="_ blank" className={styles.link}>Explore this news</a>
                <h1>{item.title}</h1>
                <p className={styles.author}>Author: <span className={styles.span}>{item.by}</span></p>
                <p className={styles.date}>{date}</p>
                <div className={styles.container} onClick={() => setRefresh(() => !refresh)}>
                    <Icon circular inverted color='teal' name='refresh' />
                    <p className={styles.refresh}>Refresh comments</p>
                </div>
            </Container>
            <CommentField />
        </div>
    )
}


