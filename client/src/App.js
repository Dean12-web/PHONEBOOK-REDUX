import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import PhoneBox from './components/PhoneBox';
import PhoneForm from './components/PhoneForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateParams, fetchData } from './actions/phonebooks';

function Layout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('')
    const { sortBy, sortMode } = useSelector(state => state.pagination);


    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Dispatch action to update search params
        dispatch(updateParams({ searchQuery: value}));

        // Fetch data with updated search params
        dispatch(fetchData());
    };

    const handleSort = () => {
        // Determine the new sort mode based on the current state
        const newSortMode = sortBy === 'name' && sortMode === 'desc' ? 'asc' : 'desc';

        // Dispatch action to update sort parameters
        dispatch(updateParams({ sortBy: 'name', sortMode: newSortMode}));

        // Fetch data with updated sort parameters
        dispatch(fetchData());
    };

    return (
        <div className='container'>
            <header>
                <div className="flex-container">
                    <div className="flex-item">
                        <button
                            className="btn btn-brown float-end me-3" onClick={handleSort}>
                            {sortMode === 'desc' ? (
                                <span className="fa-solid fa-arrow-down-z-a text-black"></span>
                            ) : (
                                <span className="fa-solid fa-arrow-down-a-z text-black"></span>
                            )}
                        </button>
                    </div>
                    <div className="flex-item input-wrapper">
                        <div className="input-icons mt-1">
                            <i className="fa fa-magnifying-glass icon"></i>
                            <input
                                type="text"
                                className="form-control input-field"
                                placeholder='Search'
                                value={searchTerm}
                                onChange={handleSearch}
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
                <Route path="/" element={<Layout />}>
                    <Route index element={<PhoneBox />} />
                    <Route path="add" element={<PhoneForm />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;