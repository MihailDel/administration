import { useState } from 'react'
import '../assets/css/Login.css'
import { Link, redirect, useNavigate } from 'react-router-dom';
import Header from './Header';

function Success() {

	return (
		<>
			<Header />
			<div className='page'>
				<Link to={"/main"}>
					<div className='btn btn-primary btn-block mb-4'>На главную</div>
				</Link>
				<div>Успешно добавлено</div>
			</div>
		</>
	)
}

export default Success
