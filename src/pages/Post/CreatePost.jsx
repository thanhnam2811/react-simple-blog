import React from 'react';
import FormDetailPost from './components/FormDetailPost.jsx';
import { useForm } from 'react-hook-form';
import { callApi } from '../../api/fakeCallApi.js';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const resp = await callApi('posts', 'POST', data);
		if (resp.status === 200) {
			await Swal.fire({
				icon: 'success',
				title: 'Tạo bài viết mới thành công!',
				text: 'Bài viết đã được lưu!',
				showCancelButton: true,
				cancelButtonText: 'Trang chủ',
				confirmButtonText: 'Xem bài viết',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate(`/posts/${resp.data.id}`);
				} else {
					navigate('/home');
				}
			});
		} else {
			await Swal.fire({
				icon: 'error',
				title: 'Lỗi!',
				text: `Không thể lưu bài viết! Code: ${resp.status} - ${resp.error}`,
			});
		}
	};

	return (
		<div>
			{/* Form title */}
			<div className="title-container px-0 pb-2 d-flex justify-content-between">
				<h2>Thêm mới bài viết</h2>
				<div className="d-flex align-items-center gap-2">
					<button
						type="button"
						className="btn btn-outline-dark"
						onClick={() => navigate(-1)}
						disabled={isSubmitting}
					>
						Trở lại
					</button>
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={handleSubmit(onSubmit)}
						disabled={isSubmitting}
					>
						{isSubmitting && (
							<span className="spinner-border spinner-border-sm me-2"></span>
						)}
						{isSubmitting ? 'Đang lưu...' : 'Lưu'}
					</button>
				</div>
			</div>

			{/* Detail form */}
			<FormDetailPost
				onSubmit={handleSubmit(onSubmit)}
				isSubmitting={isSubmitting}
				register={register}
			/>
		</div>
	);
};

export default CreatePost;
