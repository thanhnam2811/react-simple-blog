import Home from '../pages/Home/Home.jsx';
import Post from '../pages/Post/Post.jsx';
import CreatePost from '../pages/Post/CreatePost.jsx';
import EditPost from '../pages/Post/EditPost.jsx';
import { Outlet } from 'react-router-dom';
import NotFound from '../pages/404/404.jsx';

export const routeData = [
	{
		path: '/home',
		element: Home,
	},
	{
		path: '/posts',
		element: Outlet,
		children: [
			{
				path: '',
				element: Home,
			},
			{
				path: 'new',
				element: CreatePost,
			},
			{
				path: ':id',
				element: Post,
			},
			{
				path: ':id/edit',
				element: EditPost,
			},
		],
	},
	{
		path: '*',
		element: NotFound,
	},
];
