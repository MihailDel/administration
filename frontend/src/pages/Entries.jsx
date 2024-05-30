import { Link } from 'react-router-dom';
import '../assets/css/Employees.css';
import Header from "./Header";
import { useEffect, useState } from "react";
import useDebounce from '../hooks/useDebounce';
import axios from 'axios';

function Entries() {
    const [entries, setEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    function searchEntries(last_name) {
        return axios.get('http://localhost:8080/entries/search', { params: { lastName: last_name } });
    }

    function deleteEntry(entry) {
        fetch('http://localhost:8080/entries/delete', {
            method: 'POST',
            body: JSON.stringify(entry),
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
            searchEntries(debouncedSearchTerm).then(results => {
                setEntries(results.data);
            });
        } else {
            axios.get('http://localhost:8080/entries')
                .then((data) => {
                    setEntries(data.data);
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
                        <button className="btn btn-secondary">Назад</button>
                    </Link>
                    <Link to="./addEntry">
                        <button className="btn btn-primary ms-3">Добавить заказ</button>
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
                            <th scope="col">Фамилия</th>
                            <th scope="col">Имя</th>
                            <th scope="col">Телефон</th>
                            <th scope="col">Дата</th>
                            <th scope="col">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries && entries.map((entry, index) => (
                            <tr key={entry.id + entry.last_name}>
                                <th scope="row">{index + 1}</th>
                                <td>{entry.last_name}</td>
                                <td>{entry.first_name}</td>
                                <td>{entry.telephoneNumber}</td>
                                <td>{entry.dateEntry}</td>
                                <td>
                                    <div className="d-flex">
                                        <Link to={"update/" + entry.id}>
                                            <button className="btn btn-warning btn-sm me-2">Изменить</button>
                                        </Link>
                                        <button
                                            onClick={() => deleteEntry(entry)}
                                            className="btn btn-danger btn-sm"
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

export default Entries;
