import * as React from 'react';
import { Switch, Route } from "react-router-dom";
import NewsFeed from '../news-feed/news-feed';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './app.module.css'
import NewsDetails from '../news-details/news-details';

export default function App() {

    return (
        <>
            <Header />
            <Switch>
                <Route path="/">
                    <NewsFeed />
                </Route>
                <Route path="/details">
                    <NewsDetails />
                </Route>
            </Switch>
            <Footer />
        </>
    )
}