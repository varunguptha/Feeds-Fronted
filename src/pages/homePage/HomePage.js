import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import
{
    IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const HomePage = () =>
{
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API_URL = `${BACKEND_URL}/api/sales`;
    const [sales, setSales] = useState([]);

    // Define fetchSalesData as a useCallback
    const fetchSalesData = useCallback(() =>
    {
        axios
            .get(API_URL)
            .then((response) =>
            {
                const rowsWithIds = response.data.map((row, index) => ({
                    ...row,
                    id: index + 1,
                }));
                setSales(rowsWithIds);
            })
            .catch((error) =>
            {
                console.error('Error fetching sales data: ', error);
            });
    }, [API_URL]);
    console.log(sales);

    const formatDate = (dateString) =>
    {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    useEffect(() =>
    {
        fetchSalesData();
    }, [fetchSalesData]); // Include fetchSalesData in the dependency array

    const handleDelete = (saleId) =>
    {
        axios
            .delete(`${API_URL}/${saleId}`)
            .then(() =>
            {
                console.log('Sale deleted');
                fetchSalesData();
            })
            .catch((error) =>
            {
                console.error('Error deleting sale: ', error);
            });
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        {
            field: 'totalValue',
            headerName: 'Total Value',
            width: 150,
            valueGetter: (params) => params.row.price * params.row.quantity,
        },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'createdAt',
            headerName: 'Date & Time',
            width: 200,
            valueFormatter: (params) => formatDate(params.value),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <IconButton
                        color="primary"
                        component={Link}
                        to={`/update-sale/${params.row._id}`}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="secondary"
                        onClick={() => handleDelete(params.row._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={sales}
                    columns={columns}
                    getRowId={(row) => row.id}
                    slots={{ toolbar: GridToolbar }}
                />
            </div>
        </div>
    );
};

export default HomePage;
