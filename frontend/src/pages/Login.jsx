import { useState } from 'react'
import '../assets/css/Login.css'
import { redirect, useNavigate } from 'react-router-dom';




function Login() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	function login(name, password) {
		fetch("http://localhost:8080/login", {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
			}),
			body: "name=" + name + "&password=" + password // <-- Post parameters
		})
			.then((res) => {
				if(res.status == 200) {
					navigate("/main");
				}
				else console.log("Error: " + res.status);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<>
			<div className='login-page'>
				<form>
					<div data-mdb-input-init className="form-outline mb-4">
						<input type="email" id="form2Example1" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
						<label className="form-label">Логин</label>
					</div>

					<div data-mdb-input-init className="form-outline mb-4">
						<input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
						<label className="form-label">Пароль</label>
					</div>

					<button onClick={() => { login(name, password); }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Войти</button>
				</form>
			</div>
		</>
	)
}

export default Login
