import { commentsData, postsData } from './fakeData.js';
import { getRandomString } from '../utils/randomUtils.js';

export const callApi = (endpoint, method = 'GET', data) => {
	// Fake delay for api call
	return new Promise((resolve) => {
		try {
			const respData = handleData(endpoint, method, data);
			setTimeout(() => {
				resolve({
					status: 200,
					data: respData,
				});
			}, 200);
		} catch (error) {
			console.error(error);
			resolve({
				status: 500,
				data: error,
			});
		}
	});
};

export const handleData = (endpoint, method, data) => {
	const endpointData = endpoint.split('/');

	const endpointNameIndex = (Math.ceil(endpointData.length / 2) - 1) * 2;

	const endpointName = endpointData[endpointNameIndex];

	switch (endpointName) {
		case 'posts':
			return handleDataPost[method](endpointData, data);
		case 'comments':
			return handleDataComment[method](endpointData, data);
		default:
			throw new Error('Endpoint not found');
	}
};

export const handleDataPost = {
	GET: (endpointData) => {
		if (endpointData.length === 2) {
			const postId = endpointData.pop();
			const post = postsData.find((post) => post.id === postId);
			if (post) {
				return post;
			} else {
				throw new Error('Post not found');
			}
		}
		return postsData;
	},
	POST: (endpointData, data) => {
		const newPost = {
			...data,
			id: `POST-${getRandomString(10)}`,
			createdAt: new Date().toISOString(),
		};
		postsData.push(newPost);
		return newPost;
	},
	PUT: (endpointData, data) => {
		const postId = endpointData.pop();
		const postIndex = postsData.findIndex((post) => post.id === postId);
		if (postIndex < 0) {
			throw new Error('Post not found');
		}
		postsData[postIndex] = {
			...postsData[postIndex],
			...data,
		};
		return postsData[postIndex];
	},
	DELETE: (endpointData) => {
		const postId = endpointData.pop();
		const postIndex = postsData.findIndex((post) => post.id === postId);
		if (postIndex < 0) {
			throw new Error('Post not found');
		}
		return postsData.splice(postIndex, 1);
	},
};

export const handleDataComment = {
	GET: (endpointData) => {
		endpointData.pop(); // remove last element (name of endpoint e.g. 'comments')
		const postId = endpointData.pop();
		console.log('postId', postId);
		return commentsData.filter((comment) => comment.postId === postId);
	},
	POST: (endpointData, data) => {
		const newComment = {
			...data,
			id: `COMMENT-${getRandomString(10)}`,
			createdAt: new Date().toISOString(),
		};
		commentsData.push(newComment);
		return newComment;
	},
	PUT: (endpointData, data) => {
		const commentId = endpointData.pop();
		const commentIndex = commentsData.findIndex(
			(comment) => comment.id === commentId
		);
		if (commentIndex < 0) {
			throw new Error('Comment not found');
		}
		commentsData[commentIndex] = {
			...commentsData[commentIndex],
			...data,
		};
		return commentsData[commentIndex];
	},
	DELETE: (endpointData) => {
		const commentId = endpointData.pop();
		const commentIndex = commentsData.findIndex(
			(comment) => comment.id === commentId
		);
		if (commentIndex < 0) {
			throw new Error('Comment not found');
		}
		return commentsData.splice(commentIndex, 1);
	},
};
