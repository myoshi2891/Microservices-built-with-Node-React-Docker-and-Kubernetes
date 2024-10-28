import React from "react";

function CommentList({ comments }) {
	const renderedComments = comments.map((comment) => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderedComments}</ul>;
}

export default CommentList;
