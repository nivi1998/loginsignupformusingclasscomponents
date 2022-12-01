import React, { Component } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { reduxLogin } from '../../redux/features/login';
import { redirect, Navigate } from 'react-router-dom';
import { APP_ROUTES } from '../../global/constant';
import Loader from '../loader';

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email('Invalid email address format')
		.required('Email is required'),
	password: Yup.string()
		.min(3, 'Password must be 3 characters at minimum')
		.required('Password is required'),
});

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: '',
		};
	}
	navigateTO = () => {
		window.location.href = APP_ROUTES.ROUTE_REGISTER;
		// <Navigate to="/register" />;
	};
	render() {
		return (
			<div className="container">
				{this.props.loading ? (
					<Loader />
				) : (
					<div className="row">
						<div className="col-lg-12">
							<Formik
								initialValues={{ email: '', password: '' }}
								validationSchema={LoginSchema}
								onSubmit={(values) => {
									this.props.dispatch(reduxLogin(JSON.stringify(values)));
									console.log(JSON.stringify(values));
								}}
							>
								<div>
									<div className="row mb-5">
										<div className="col-lg-12 text-center">
											<h1 className="mt-5">Login</h1>
										</div>
									</div>
									<Form>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<Field
												type="email"
												name="email"
												placeholder="Enter email"
												autocomplete="off"
											/>

											<ErrorMessage
												component="div"
												name="email"
												className="invalid-feedback"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="password" className="mt-3">
												Password
											</label>
											<Field
												type="password"
												name="password"
												placeholder="Enter password"
											/>
											<ErrorMessage
												component="div"
												name="password"
												className="invalid-feedback"
											/>
										</div>

										<button
											type="submit"
											className="btn btn-primary btn-block mt-4"
										>
											Submit
										</button>
									</Form>
								</div>
							</Formik>
							<span>Don't have an account ? To create account </span>
							<div
								onClick={() => {
									// redirect(APP_ROUTES.ROUTE_REGISTER);
									// // alert();
									this.navigateTO();
									// <Navigate to="/register" />;
								}}
							>
								Click Here
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		loading: state.login.loading,
	};
}

export default connect(mapStateToProps)(Login);
