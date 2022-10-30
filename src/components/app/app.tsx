import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import NewsFeed from '../news-feed/news-feed';
import Footer from '../footer/footer';
import Header from '../header/header';
import NewsDetails from '../news-details/news-details';
import { fetchData, getNews } from '../../services/main-store';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { ErrorBoundary } from '../error-boundary/error-boundary';

export default function App() {
    const dispatch = useAppDispatch();
    const { ids } = useAppSelector(state => state.mainStore);

    React.useEffect(() => {
        dispatch(fetchData())
        setInterval(function () { dispatch(fetchData()) }, 60000);
    }, []);

    React.useMemo(() => {
        ids?.map(id => dispatch(getNews(id)))
    }, [ids]);

    return (
        <ErrorBoundary>
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
        </ErrorBoundary>
    )
}