import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import NewsFeed from '../news-feed/news-feed';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './app.module.css'
import NewsDetails from '../news-details/news-details';
import { fetchData, getNews } from '../../services/main-store';
import { useAppDispatch, useAppSelector } from '../../services/config-store';

export default function App() {
    const { ids } = useAppSelector(state => state.mainStore)
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        //@ts-ignore
        dispatch(fetchData())
        //@ts-ignore
        setInterval(function () { dispatch(fetchData()) }, 60000);
    }, []);

    React.useEffect(() => {
        //@ts-ignore
        ids?.map(id => dispatch(getNews(id)))
    }, [ids]);

    return (
        <>
            <Header />
            <Switch>
                <Route path='/' exact={true}>
                    <NewsFeed />
                </Route>
                <Route path='/:id'>
                    <NewsDetails />
                </Route>
            </Switch>
            <Footer />
        </>
    )
}