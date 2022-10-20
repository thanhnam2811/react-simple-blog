import React, { useEffect, useState } from 'react';
import { callApi } from '../../api/fakeCallApi.js';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { getTimeAgo } from '../../utils/dateUtils.js';

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [listPost, setListPost] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const resp = await callApi('posts');
			if (resp.status === 200) {
				setListPost(resp.data);
			} else {
				await Swal.fire({
					icon: 'error',
					title: 'Lỗi!',
					text: `Không thể lấy dữ liệu! Code: ${resp.status} - ${resp.error}`,
				});
			}
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) {
		return <div className="text-center">Đang tải...</div>;
	}

	return (
		<div className="d-flex flex-column h-100">
			{/* Title */}
			<div className="title-container px-0 pb-2 d-flex justify-content-between">
				<h2>Danh sách bài viết</h2>
				<div className="d-flex align-items-center gap-2">
					<Link
						role="button"
						className="btn btn-outline-primary"
						to={'/posts/new'}
					>
						Thêm bài viết
					</Link>
				</div>
			</div>

			<div className="list-group p-0 flex-grow-1 overflow-auto">
				{/* List post */}
				<div className="list-group">
					{listPost.map((post) => {
						post.timeAgo = getTimeAgo(post.createdAt);
						return (
							<div className="my-1 rounded" key={post.id}>
								<Link
									to={`/posts/${post.id}`}
									className="list-group-item list-group-item-action"
									aria-current="true"
								>
									<div className="d-flex w-100 justify-content-between">
										<h5 className="mb-1">{post.title}</h5>
										<small>{post.timeAgo}</small>
									</div>
									<p className="mb-1 text-overflow-ellipsis">
										{post.content}
									</p>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;
