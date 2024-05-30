import { Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddEntry() {
	const [entry, setEntry] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [dateEntry, setDateEntry] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	function addEntry() {
		if (first_name && last_name && telephoneNumber && dateEntry) {
			fetch('http://localhost:8080/entries/add', {
				method: 'POST',
				body: JSON.stringify({
					"id": id,
					"first_name": first_name,
					"last_name": last_name,
					"telephoneNumber": telephoneNumber,
					"dateEntry": dateEntry
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
		fetch('http://localhost:8080/entries/' + id)
			.then((res) => res.json())
			.then((data) => {
				setEntry(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [id])
	useEffect(() => {
		setFirstName(entry.first_name)
		setLastName(entry.last_name)
		setTelephoneNumber(entry.telephoneNumber)
		setDateEntry(entry.dateEntry)
	}, [entry])

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
							<input value={first_name} onChange={(e) => { setFirstName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Фамилия" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputPassword1">Имя</label>
							<input value={last_name} onChange={(e) => { setLastName(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Имя" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputMemory1">Телефон</label>
							<input value={telephoneNumber} onChange={(e) => { setTelephoneNumber(e.target.value) }} type="text" className="form-control" id="exampleInputMemory1" aria-describedby="emailHelp" placeholder="Телефон" />
						</div>
						<div className="form-group mt-4">
							<label htmlFor="exampleInputSsd1">Дата</label>
							<input value={dateEntry} onChange={(e) => { setDateEntry(e.target.value) }} type="text" className="form-control" id="exampleInputSsd1" placeholder="Дата" />
						</div>
						<Link onClick={() => addEntry()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddEntry
