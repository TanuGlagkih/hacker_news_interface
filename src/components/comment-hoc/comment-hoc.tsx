import * as React from 'react';
import { Comment } from 'semantic-ui-react';
import { useAppSelector } from '../../services/config-store';

export function CommentHOC({ children, parentId }: any) {
    const { comments } = useAppSelector(state => state.mainStore);

    return (
        <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
            {children}
        </Comment>
    )
}