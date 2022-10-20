import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { routeData } from './route.data.js';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/home" />} />

			{routeData.map((route) => {
				const Element = route.element;
				return (
					<Route
						key={route.path}
						path={route.path}
						element={<Element />}
					>
						{route.children?.map((child) => {
							const ChildElement = child.element;
							return (
								<Route
									key={child.path}
									path={child.path}
									element={<ChildElement />}
								/>
							);
						})}
					</Route>
				);
			})}
		</Routes>
	);
};

export default Router;
