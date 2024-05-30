import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddEmployee() {
	const [last_name, setLast_name] = useState("");
	const [first_name, setFirst_name] = useState("");
	const [patronymic, setPatronymic] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState(0);
	const navigate = useNavigate();

	function addEmployee() {
		if (last_name && first_name && patronymic && position && salary) {
			fetch('http://localhost:8080/employees/add', {
				method: 'POST',
				body: JSON.stringify({
					"last_name": last_name,
					"first_name": first_name,
					"patronymic": patronymic,
					"position": position,
					"salary": salary
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((data) => {
					if (data.status == 200) {
						window.location.replace("../../success");
					}
					else {
						window.location.replace("../../error");
					}
				})
				.catch((er) => {
					console.log(er);
				});
		}
	}

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-elements">
					<Link to={"../"}>
						<div className='btn btn-primary btn-block mb-4'>Назад</div>
					</Link>
					<form>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputEmail1">Фамилия</label>
							<input value={last_name} onChange={(e) => { setLast_name(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Фамилия" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputPassword1">Имя</label>
							<input value={first_name} onChange={(e) => { setFirst_name(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Имя" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputMemory1">Отчество</label>
							<input value={patronymic} onChange={(e) => { setPatronymic(e.target.value) }} type="text" className="form-control" id="exampleInputMemory1" aria-describedby="emailHelp" placeholder="Отчество" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputSsd1">Должность</label>
							<input value={position} onChange={(e) => { setPosition(e.target.value) }} type="text" className="form-control" id="exampleInputSsd1" placeholder="Должность" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputSalary1">Зарплата</label>
							<input value={salary} onChange={(e) => { setSalary(e.target.value) }} type="number" className="form-control" id="exampleInputSalary1" placeholder="зарплата" />
						</div>
						<div onClick={() => addEmployee()} className="btn btn-primary mt-4">Добавить</div>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddEmployee
