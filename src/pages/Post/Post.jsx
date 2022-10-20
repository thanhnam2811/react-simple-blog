import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { callApi } from '../../api/fakeCallApi.js';
import Swal from 'sweetalert2';
import CommentArea from './components/CommentArea.jsx';

const Post = () => {
	const [loading, setLoading] = useState(true);
	const { id } = useParams();

	const [post, setPost] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const resp = await callApi(`posts/${id}`);
			if (resp.status === 200) {
				setPost(resp.data);
			} else {
				await Swal.fire({
					icon: 'error',
					title: 'Lỗi!',
					text: `Không thể lấy dữ liệu! Code: ${resp.status} - ${resp.error}`,
				}).then(() => {
					navigate('/home');
				});
			}
			setLoading(false);
		};
		fetchData().then(console.log);
	}, [id]);

	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeletePost = async () => {
		setIsDeleting(true);
		// Show modal confirm
		const result = await Swal.fire({
			title: 'Bạn có chắc chắn muốn xóa bài viết này?',
			text: 'Bạn sẽ không thể khôi phục lại bài viết này!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Xóa',
			cancelButtonText: 'Hủy',
		});

		if (result.isConfirmed) {
			const resp = await callApi(`posts/${id}`, 'DELETE');
			if (resp.status === 200) {
				await Swal.fire({
					icon: 'success',
					title: 'Thành công!',
					text: 'Xóa bài viết thành công!',
				}).then(() => {
					navigate('/home');
				});
			} else {
				await Swal.fire({
					icon: 'error',
					title: 'Lỗi!',
					text: `Không thể xóa bài viết! Code: ${resp.status} - ${resp.error}`,
				});
			}
		}

		setIsDeleting(false);
	};

	if (loading) {
		return <div className="text-center">Đang tải...</div>;
	}
	return (
		<div className="d-flex flex-column h-100">
			{/* Title */}
			<div className="title-container px-0 pb-2 d-flex justify-content-between">
				<h2>Chi tiết bài viết</h2>
				<div className="d-flex align-items-center gap-2">
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={() => navigate(`/posts/${id}/edit`)}
						disabled={isDeleting}
					>
						Chỉnh sửa
					</button>
					<button
						type="button"
						className="btn btn-outline-danger"
						onClick={handleDeletePost}
						disabled={isDeleting}
					>
						{isDeleting && (
							<span className="spinner-border spinner-border-sm me-2"></span>
						)}
						{isDeleting ? 'Đang xóa...' : 'Xóa'}
					</button>
				</div>
			</div>

			{/*	Content */}
			<div className="row flex-fill">
				{/* Post card */}
				<div className="col-12 col-md-7 mb-3">
					<div className="card shadow-sm">
						<div className="card-body">
							<h5 className="card-title">{post.title}</h5>
							<div className="card-text">{post.content}</div>
						</div>
					</div>
				</div>

				{/* Comment list */}
				<div className="col-12 col-md-5 mb-3">
					<CommentArea />
				</div>
			</div>
		</div>
	);
};

export default Post;
