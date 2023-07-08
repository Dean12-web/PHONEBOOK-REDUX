import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import PhoneBox from './components/PhoneBox';
import PhoneForm from './components/PhoneForm';


function Layout() {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <header>
                <div className="flex-container">
                    <div className="flex-item">
                        <button
                            className="btn btn-brown float-end me-3">
                            <span className="fa-solid fa-arrow-up-z-a text-black"></span>
                        </button>
                    </div>
                    <div className="flex-item input-wrapper">
                        <div className="input-icons mt-1">
                            <i className="fa fa-magnifying-glass icon"></i>
                            <input
                                type="text"
                                className="form-control input-field"
                                placeholder='Search'
                            />
                        </div>
                    </div>
                    <div className="flex-item">
                        <button className="btn btn-brown ms-3" onClick={() => navigate('add')}>
                            <span className="fa-solid fa-user-plus text-black"></span>
                        </button>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}

function NotFound() {
    return (
        <h1>Page Not Found</h1>
    )
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<PhoneBox/>} />
                    <Route path="add" element={<PhoneForm/>} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;