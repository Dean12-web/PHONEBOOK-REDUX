import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import PhoneBox from './components/PhoneBox';
import PhoneForm from './components/PhoneForm';

import { useSelector, useDispatch } from "react-redux"

import { fetchData } from './actions/phonebooks';

function Layout({ handleSearch, searchQuery, sortBy, onSortChange }) {
    const navigate = useNavigate()
    const handleChange = (e) => {
        handleSearch(e.target.value)
    }
    const handleSortChange = () => {
        const sortMode = sortBy === 'asc' ? 'desc' : 'asc'
        onSortChange(sortBy, sortMode)
    }
    return (
        <div className='container'>
            <header>
                <div className="flex-container">
                    <div className="flex-item">
                        <button
                            className="btn btn-brown float-end me-3"
                            onClick={handleSortChange}>
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
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [sortMode, setSortMode] = useState('asc')

    const data = useSelector((state) => state.phonebooks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

    const handleSearch = (query) =>{
        setSearchQuery(query)
    }

    const handleSortChange = (newSortBy) =>{
        if(sortBy === newSortBy){
            setSortMode(sortMode === 'asc' ? 'desc' : 'asc')
        }else{
            setSortBy(sortBy)
            setSortMode('asc')
        }

    }

    const fillteredData = data.filter((entry) => {
        const nameMatch = entry.name.toLowerCase().includes(searchQuery.toLowerCase())
        return nameMatch
    })

    const sortedData = fillteredData.sort((a,b) =>{
        const aValue = a[sortBy].toLowerCase()
        const bValue = b[sortBy].toLowerCase()

        if(aValue < bValue){
            return sortMode === 'asc' ? -1 : 1
        }else if(aValue > bValue){
            return sortMode === 'asc' ? 1 : -1
        }else{
            return 0
        }
    })
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout 
                                            handleSearch={handleSearch} 
                                            searchQuery={searchQuery} 
                                            sortBy={sortBy} 
                                            onSortChange={handleSortChange}/>}>
                    <Route index element={<PhoneBox
                                            data={sortedData} />} />
                    <Route path="add" element={<PhoneForm />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;