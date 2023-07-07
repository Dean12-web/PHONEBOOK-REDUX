import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect} from 'react';
import PhoneBox from './components/PhoneBox';
import PhoneForm from './components/PhoneForm';

import {useSelector, useDispatch} from "react-redux"

import { fetchData} from './actions/phonebooks';

function Layout({ handleSearch, searchQuery, sortBy,onSortChange }) {
    const navigate = useNavigate()
    const handleChange = (e) => {
        handleSearch(e.target.value)
    }
    return (
        <div className='container'>
            <header>
                <div className="flex-container">
                    <div className="flex-item">
                        <button
                            className="btn btn-brown float-end me-3"
                            onClick={() => onSortChange(sortBy)}>
                            <span className="fa-solid fa-arrow-up-z-a text-black"></span>
                        </button>
                    </div>
                    <div className="flex-item input-wrapper">
                        <div className="input-icons mt-1">
                            <i className="fa fa-magnifying-glass icon"></i>
                            <input
                                type="text"
                                className="form-control input-field"
                                value={searchQuery}
                                onChange={handleChange}
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
    const data = useSelector((state) => state.phonebooks)
    const dispatch = useDispatch()
    useEffect(() => {
        const page = 1
        dispatch(fetchData(page))
    }, [dispatch])
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<PhoneBox
                        data={data}/>} />
                    <Route path="add" element={<PhoneForm/>} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;