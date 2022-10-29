import * as React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { getKidComments } from '../../services/main-store';
import { CommentKid } from '../comment-kid/comment-kid';

export function CommentField() {
    const dispatch = useAppDispatch();
    const { comments, commentsNumber } = useAppSelector(state => state.mainStore);

    function getKids(id: Array<number>) {
        //@ts-ignore
        id.map(item => dispatch(getKidComments(item)))
    };

    React.useMemo(() => {
        comments.forEach(item => item.kids ? getKids(item.kids) : item);
    }, [comments]);


    const { convert } = require('html-to-text');

    function parseHtml(html: string) {
        return convert(html, {
            wordwrap: 130
        });
    }

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            <p>{commentsNumber} {commentsNumber == 1 ? ' comment' : ' comments'}</p>
            {comments?.map(comment => (
                <Comment key={comment.id}>
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
                    {comment && comment.kids && comment.kids.map(comment => (
                        <Comment.Group key={comment}>
                            <CommentKid id={comment} />
                        </Comment.Group>
                    ))}
                </Comment>
            ))}
        </Comment.Group>
    )
}