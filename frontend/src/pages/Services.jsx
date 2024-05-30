import { Link } from 'react-router-dom';
import '../assets/css/Employees.css';
import Header from "./Header";
import { useEffect, useState } from "react";
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

function Services() {
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    function searchServices(name) {
        return axios.get('http://localhost:8080/services/search', { params: { name: name } });
    }

    function deleteService(service) {
        fetch('http://localhost:8080/services/delete', {
            method: 'POST',
            body: JSON.stringify(service),
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
            searchServices(debouncedSearchTerm).then(results => {
                setServices(results.data);
            });
        } else {
            axios.get('http://localhost:8080/services')
                .then((data) => {
                    setServices(data.data);
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
                    <Link to="../main">
                        <button className='btn btn-secondary'>Назад</button>
                    </Link>
                    <Link to="./addServices">
                        <button className='btn btn-primary'>Добавить услугу</button>
                    </Link>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Поиск'
                    />
                </div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Цена</th>
                            <th scope="col">Срок работы</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services && services.map((service, index) => (
                            <tr key={service.id + service.name}>
                                <th scope="row">{index + 1}</th>
                                <td>{service.name}</td>
                                <td>{service.cost}</td>
                                <td>{service.periodOfExecution}</td>
                                <td>
                                    <div className="d-flex">
                                        <Link to={"update/" + service.id}>
                                            <button className='btn btn-warning btn-sm me-2'>Изменить</button>
                                        </Link>
                                        <button
                                            onClick={() => deleteService(service)}
                                            className='btn btn-danger btn-sm'
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

export default Services;