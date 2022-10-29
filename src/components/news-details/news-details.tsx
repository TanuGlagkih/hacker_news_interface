import * as React from 'react';
import styles from './news-details.module.css';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { TNews } from '../../services/types';
import { cleanComments, getComments } from '../../services/main-store';
import { Container, Icon, Loader } from 'semantic-ui-react';
import { CommentField } from '../comment-field/comment-field';

export default function NewsDetails() {
    const [refresh, setRefresh] = React.useState(false);
    const { id } = useParams<{ id?: string }>();
    const location = useHistory();
    const { news } = useAppSelector(state => state.mainStore);
    const dispatch = useAppDispatch();
    //@ts-ignore
    const item = news?.find((item: TNews) => item.id == `${id}`);
    const date = new Date(item?.time * 1000).toLocaleString("ru-RU");

    console.log(location)

    React.useEffect(() => {
        if (!news) {
            const newId = parseInt(id.substring(1))
            //@ts-ignore
            dispatch(getComments(newId))
        } else {
            //@ts-ignore
            item?.kids?.map(kid => dispatch(getComments(kid)))
        }
        //@ts-ignore
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


