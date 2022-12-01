import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
	const loginResponse = useSelector((state) => state.login.loginResponse);
	console.log('loginResponse', loginResponse);

	const outlet = useOutlet();

	return <>{loginResponse?.token ? [outlet] : <Navigate to="/" />}</>;
};

export default ProtectedRoute;
