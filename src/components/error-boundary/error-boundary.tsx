import React from "react";
import styles from './error-boundary.module.css'

export class ErrorBoundary extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: any) {
        console.log("Возникла ошибка!", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={styles.box}>
                    <p style={styles.header}>Something went wrong :( </p>
                    <p style={styles.text}>
                        An error has occurred. Try to reload the page
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

