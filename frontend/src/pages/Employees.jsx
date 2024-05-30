import { Link } from 'react-router-dom';
import '../assets/css/Employees.css';
import Header from "./Header";
import { useEffect, useState } from "react";
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    function searchEmployees(lastName) {
        return axios.get('http://localhost:8080/employees/search', { params: { lastName: lastName } });
    }

    function deleteEmployee(employee) {
        fetch('http://localhost:8080/employees/delete', {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            searchEmployees(debouncedSearchTerm).then(results => {
                setEmployees(results.data);
            });
        } else {
            axios.get('http://localhost:8080/employees')
                .then((data) => {
                    setEmployees(data.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [debouncedSearchTerm]);

    return (
        <>
            <Header />
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="btn-group" role="group">
                        <Link to="../main">
                            <button className="btn btn-secondary">Назад</button>
                        </Link>
                        <Link to="./addEmployee">
                            <button className="btn btn-success ms-3">Добавить сотрудника</button>
                        </Link>
                        <Link to="./minmax">
                            <button className="btn btn-info ms-3">Отчеты по сотрудникам</button>
                        </Link>
                    </div>
                    <div className="input-group" style={{ maxWidth: '300px' }}>
                        <input
                            type="text"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Поиск'
                        />
                    </div>
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Фамилия</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Отчество</th>
                            <th scope="col">Должность</th>
                            <th scope="col">Зарплата</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees && employees.map((employee, index) => (
                            <tr key={employee.id + employee.last_name}>
                                <th scope="row">{index + 1}</th>
                                <td>{employee.last_name}</td>
                                <td>{employee.first_name}</td>
                                <td>{employee.patronymic}</td>
                                <td>{employee.position}</td>
                                <td>{employee.salary}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <Link to={"update/" + employee.id}>
                                            <button className="btn btn-warning btn-sm">Изменить</button>
                                        </Link>
                                        <button
                                            onClick={() => deleteEmployee(employee)}
                                            className="btn btn-danger btn-sm ms-2"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Employees;
