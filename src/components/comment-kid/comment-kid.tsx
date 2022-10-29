import * as React from 'react';
import { Comment } from 'semantic-ui-react';
import { useAppSelector } from '../../services/config-store';

export function CommentKid({ id }: any) {
    const { commentsKids } = useAppSelector(state => state.mainStore);

    let comment = React.useMemo(() => {
        return commentsKids?.find(comment => comment.id == id)
    }, [id, commentsKids]);

    const { convert } = require('html-to-text');

    function parseHtml(html: string) {
        return convert(html, {
            wordwrap: 130
        });
    }

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
        </Comment>
    )
}

