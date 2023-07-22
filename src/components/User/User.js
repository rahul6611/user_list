import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../../App.css';
import columns from './columns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function User() {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    // handle get userlist data
    const fetchData = () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                setData(response.data);
                setFilteredData(response.data);
                setPending(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    // handle searchbar data
    const handleSearch = (e) => {
        const value = e.target.value;
        const res = data.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.username.toLowerCase().includes(value.toLowerCase()) || 
            item.email.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(res);
    }

    return (
        <div className='table_wrapper'>
            <h2>User List</h2>
            <div class="search-box">
                <input class="search-input" type="search" onChange={(e) => handleSearch(e)} placeholder="Search....." />
                <button class="search-btn"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                progressPending={pending}
                pagination
            />
        </div>
    )
}

export default User


