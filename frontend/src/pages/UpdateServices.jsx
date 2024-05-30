import { Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function UpdateServices() {
	const [service, setService] = useState("");
	const [name, setName] = useState("");
	const [cost, setCost] = useState("");
	const [periodOfExecution, setPeriodOfExecution] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	function addService() {
		if (name && cost && periodOfExecution) {
			fetch('http://localhost:8080/services/add', {
				method: 'POST',
				body: JSON.stringify({
					"id": id,
					"name": name,
					"cost": cost,
					"periodOfExecution": periodOfExecution
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(() => {
					window.location.replace("../../success");
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	useEffect(() => {
		fetch('http://localhost:8080/services/' + id)
			.then((res) => res.json())
			.then((data) => {
				setService(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [id])
	useEffect(() => {
		setName(service.name);
		setCost(service.cost);
		setPeriodOfExecution(service.periodOfExecution);
	}, [service])

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
							<label htmlFor="exampleInputEmail1">Название услуги</label>
							<input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Название" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputPassword1">Стоимость</label>
							<input value={cost} onChange={(e) => { setCost(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Цена" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputMemory1">Срок работы</label>
							<input value={periodOfExecution} onChange={(e) => { setPeriodOfExecution(e.target.value) }} type="text" className="form-control" id="exampleInputMemory1" aria-describedby="emailHelp" placeholder="Срок работы" />
						</div>
						<button onClick={() => addService()} className="btn btn-primary mt-4">Добавить</button>
					</form>
				</main>
			</div>
		</>
	)
}

export default UpdateServices
