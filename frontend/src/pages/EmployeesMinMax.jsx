import { Link } from 'react-router-dom';
import '../assets/css/Employees.css';
import Header from "./Header";
import { useEffect, useState } from "react";
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

function EmployeesMinMax() {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [averageSalary, setAverageSalary] = useState(null);
    const [employeeCount, setEmployeeCount] = useState(null);
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

    function fetchAverageSalary() {
        axios.get('http://localhost:8080/employees/average-salary')
            .then((response) => {
                setAverageSalary(response.data.averageSalary);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    function fetchEmployeeCount() {
        axios.get('http://localhost:8080/employees/count')
            .then((response) => {
                setEmployeeCount(response.data.employeeCount);
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

        // Fetch the average salary and employee count when the component loads
        fetchAverageSalary();
        fetchEmployeeCount();
    }, [debouncedSearchTerm]);

    return (
        <>
            <Header />
            <div className="container my-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to="/employees">
                        <button className="btn btn-secondary">Назад</button>
                    </Link>
                    <div className="input-group" style={{ maxWidth: '300px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Поиск по фамилии"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between mt-4">
                    {averageSalary !== null && (
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">Средняя зарплата</h5>
                                <p className="card-text">{averageSalary}</p>
                            </div>
                        </div>
                    )}
                    {employeeCount !== null && (
                        <div className="card" style={{ width: '18rem' }}>
                            <div className="card-body">
                                <h5 className="card-title">Общее количество сотрудников</h5>
                                <p className="card-text">{employeeCount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default EmployeesMinMax;
