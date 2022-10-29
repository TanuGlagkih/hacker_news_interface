import * as React from 'react';
import { Comment } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { getKidComments } from '../../services/main-store';
import { TComment } from '../../services/types';

const { convert } = require('html-to-text');

function parseHtml(html: string) {
    return convert(html, {
        wordwrap: 130
    });
}

export function CommentBranch({ comment, parentId, firstChild }: any) {
    const dispatch = useAppDispatch();
    const { commentsKids } = useAppSelector(state => state.mainStore);
    const [showChildren, setShowChildren] = React.useState(false);

    let items = React.useMemo(() => {
        return commentsKids?.filter(comment => comment.parent == parentId)
    }, [commentsKids]);

    React.useEffect(() => {
        if (comment.kids) {
            //@ts-ignore
            comment.kids.map((item: number) => dispatch(getKidComments(item)))
        }
    }, []);

    const handleClick = () => {
        if (firstChild) setShowChildren(!showChildren);
    };

    if (!commentsKids) return <></>

    return (
        <Comment onClick={handleClick}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{comment.by}</Comment.Author>
                <Comment.Metadata>
                    <div>{new Date(comment.time * 1000).toLocaleString("ru-RU")}</div>
                </Comment.Metadata>
                <Comment.Text>{parseHtml(comment.text)}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
            {showChildren && comment.kids && items?.map(comment => (
                <Comment.Group key={comment.id}>
                    <CommentKid comment={comment} parentId={comment.id} />
                </Comment.Group>
            ))}
        </Comment>
    )
}

function CommentKid({ comment, parentId }: any) {
    const dispatch = useAppDispatch();
    const { commentsKids } = useAppSelector(state => state.mainStore);

    let items = React.useMemo(() => {
        return commentsKids?.filter(comment => comment.parent == parentId)
    }, [commentsKids]);

    React.useEffect(() => {
        if (comment.kids) {
            //@ts-ignore
            comment.kids.map((item: number) => dispatch(getKidComments(item)))
        }
    }, []);

    console.log(commentsKids)

    return (
        <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{comment?.by}</Comment.Author>
                <Comment.Metadata>
                    <div>{new Date(comment?.time * 1000).toLocaleString("ru-RU")}</div>
                </Comment.Metadata>
                <Comment.Text>{parseHtml(comment?.text)}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
            {comment.kids && items?.map(comment => (
                <Comment.Group key={comment.id}>
                    <CommentBranch comment={comment} parentId={comment.id} />
                </Comment.Group>
            ))}
        </Comment>
    )
}




