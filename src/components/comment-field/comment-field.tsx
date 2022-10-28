import * as React from 'react';
import { Comment, Header } from 'semantic-ui-react';
import { useAppSelector } from '../../services/config-store';
import { CommentHOC } from '../comment-hoc/comment-hoc';

export function CommentField({ id }: any) {
    const { comments } = useAppSelector(state => state.mainStore);

    return (
        <Comment.Group>
            <Header as='h3' dividing>
                Comments
            </Header>
            {comments?.map(comment => (
                <div key={comment.id}>
                    <CommentHOC comment={comment}>
                        {!comment.kids ?
                            <></>
                            :
                            <Comment.Group>
                                <CommentHOC parentId={comment.id} />
                            </Comment.Group>
                        }
                    </CommentHOC>
                </div>
            ))}
        </Comment.Group>
    )
}