import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { callApi } from '../../../api/fakeCallApi.js';
import { getTimeAgo } from '../../../utils/dateUtils';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import moment from 'moment';

const CommentArea = () => {
	const { id: postId } = useParams();

	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm({ defaultValues: { content: '', postId: postId, author: '' } });

	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);

	const fetchData = async () => {
		const resp = await callApi(`posts/${postId}/comments`);
		if (resp.status === 200) {
			const comments = resp.data?.sort((a, b) =>
				moment(b.createdAt).diff(a.createdAt)
			);
			setComments(comments);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchData();
	}, [postId]);

	const onSubmit = async (data) => {
		const resp = await callApi(`posts/${postId}/comments`, 'POST', data);
		if (resp.status === 200) {
			await fetchData();
			reset();
		} else {
			await Swal.fire({
				icon: 'error',
				title: 'Lỗi!',
				text: `Không thể bình luận bài viết! Code: ${resp.status} - ${resp.error}`,
			});
		}
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="d-flex flex-column overflow-hidden h-100">
			{/* Title */}
			<div className="title-container px-0 pb-2 d-flex justify-content-between">
				<h2>Danh sách bình luận</h2>
				<div className="d-flex align-items-center">
					<button
						id="add-comment-btn"
						className="btn btn-outline-info"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseFormComment"
						aria-expanded="false"
						aria-controls="collapseFormComment"
						onClick={() => {
							const btn =
								document.getElementById('add-comment-btn');
							if (btn.innerText === 'Đóng lại') {
								btn.innerText = 'Bình luận';
							} else {
								btn.innerText = 'Đóng lại';
							}
						}}
					>
						Bình luận
					</button>
				</div>
			</div>

			{/*	New comment form*/}
			<div className="collapse" id="collapseFormComment">
				<form
					className="form-comment"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="mb-3">
						<label htmlFor="commentAuthor" className="form-label">
							Tên của bạn
						</label>
						<input
							type="text"
							className="form-control"
							id="commentAuthor"
							placeholder="Nhập tên của bạn..."
							{...register('author', { required: true })}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="commentContent" className="form-label">
							Nội dung bình luận
						</label>
						<textarea
							className="form-control"
							id="commentContent"
							rows="3"
							placeholder="Nhập nội dung bình luận..."
							{...register('content', { required: true })}
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="btn btn-outline-info float-end mb-3"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<span
								className="spinner-border spinner-border-sm"
								role="status"
								aria-hidden="true"
							></span>
						) : (
							'Bình luận'
						)}
					</button>
				</form>
			</div>

			{/* List comments */}
			<div className="d-flex flex-column h-100 pd-5 flex-grow-1 overflow-auto gap-2">
				{comments.map((comment) => {
					comment.timeAgo = getTimeAgo(comment.createdAt);
					return (
						<div className="card shadow-sm" key={comment.id}>
							<div className="card-body">
								<h5 className="card-title">
									{comment.author}
									<span className="float-end fw-normal fs-6">
										{comment.timeAgo}
									</span>
								</h5>
								<div className="card-text">
									{comment.content}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default CommentArea;
