import * as React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { useAppDispatch, useAppSelector } from '../../services/config-store';
import { getKidComments } from '../../services/main-store';
import { CommentBranch } from '../comment-kid/comment-kid';

export function CommentField() {
    const { comments, commentsNumber } = useAppSelector(state => state.mainStore);

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            <p>{commentsNumber} {commentsNumber == 1 ? ' comment' : ' comments'}</p>
            {comments?.map(comment => (
                <CommentBranch key={comment.id} comment={comment} parentId={comment.id} firstChild={true} />
            ))
            }
        </Comment.Group >
    )
}