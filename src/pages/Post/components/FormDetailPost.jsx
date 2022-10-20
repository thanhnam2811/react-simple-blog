import React from 'react';

const FormDetailPost = ({ onSubmit, register }) => {
	return (
		<form className="form-detail-post" onSubmit={onSubmit}>
			<div className="mb-3">
				<label htmlFor="postTitle" className="form-label">
					Chủ đề bài viết
				</label>
				<input
					type="text"
					className="form-control"
					id="postTitle"
					placeholder="Nhập chủ đề bài viết"
					{...register('title', { required: true })}
					required
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="postContent" className="form-label">
					Nội dung bài viết
				</label>
				<textarea
					className="form-control"
					id="postContent"
					rows="3"
					placeholder="Nhập nội dung bài viết"
					{...register('content', { required: true })}
					required
				></textarea>
			</div>
		</form>
	);
};

export default FormDetailPost;
