import '../assets/css/MainPage.css';
import { Link } from 'react-router-dom';
import Header from './Header';

function MainPage() {
    return (
        <>
            <Header />
            <div className="container">
                <main className="d-flex flex-column align-items-center justify-content-center vh-100">
                    <Link to="/services" className="btn btn-primary btn-lg m-2">
                        Услуги
                    </Link>
                    <Link to="/employees" className="btn btn-primary btn-lg m-2">
                        Сотрудники
                    </Link>
                    <Link to="/entries" className="btn btn-primary btn-lg m-2">
                        Заказы
                    </Link>
                </main>
            </div>
        </>
    );
}

export default MainPage;
