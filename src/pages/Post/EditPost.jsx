import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormDetailPost from './components/FormDetailPost.jsx';
import { useForm } from 'react-hook-form';
import { callApi } from '../../api/fakeCallApi.js';
import Swal from 'sweetalert2';

const EditPost = () => {
	const { id } = useParams();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm({
		defaultValues: {
			id: id,
		},
	});
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const resp = await callApi(`posts/${id}`);
			if (resp.status === 200) {
				reset(resp.data);
				setLoading(false);
			} else {
				await Swal.fire({
					icon: 'error',
					title: 'Lỗi!',
					text: `Không thể lấy dữ liệu! Code: ${resp.status} - ${resp.error}`,
				}).then(() => {
					navigate('/home');
				});
			}
		};
		if (id) {
			fetchData();
		} else {
			setLoading(false);
		}
	}, [id]);

	const onSubmit = async (data) => {
		const resp = await callApi(`posts/${data.id}`, 'PUT', data);
		if (resp.status === 200) {
			await Swal.fire({
				icon: 'success',
				title: 'Cập nhật thành công!',
				text: 'Bạn có muốn tiếp tục chỉnh sửa?',
				showCancelButton: true,
				cancelButtonText: 'Tiếp tục',
				showDenyButton: true,
				denyButtonColor: '#333',
				denyButtonText: 'Trang chủ',
				confirmButtonText: 'Xem bài viết',
			}).then((result) => {
				if (result.isConfirmed) {
					navigate(`/posts/${data.id}`);
				} else if (result.isDenied) {
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

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{/* Form title */}
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

			<FormDetailPost
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				isSubmitting={isSubmitting}
				register={register}
			/>
		</div>
	);
};

export default EditPost;
