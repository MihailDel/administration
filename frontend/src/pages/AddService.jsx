import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddService() {
	const [name, setName] = useState("");
	const [cost, setCost] = useState("");
	const [periodOfExecution, setPeriodOfExecution] = useState("");
	const navigate = useNavigate();

	function AddService() {
		if (name && cost && periodOfExecution) {
			fetch('http://localhost:8080/services/add', {
				method: 'POST',
				body: JSON.stringify({
					"name": name,
					"cost": cost,
					"periodOfExecution": periodOfExecution,
					
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
				.catch((err) => {
					console.log(err.message);
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
							<label htmlFor="exampleInputEmail1">Name</label>
							<input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputPassword1">Cost</label>
							<input value={cost} onChange={(e) => { setCost(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Cost" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputMemory1">Memory</label>
							<input value={periodOfExecution} onChange={(e) => { setPeriodOfExecution(e.target.value) }} type="text" className="form-control" id="exampleInputMemory1" aria-describedby="emailHelp" placeholder="Period Of Execution" />
						</div>
						<Link onClick={() => AddService()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddService
