// UpdateSaleForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Container, Box } from '@mui/material';

const UpdateSaleForm = () =>
{
    const { id } = useParams();
    const navigate = useNavigate();

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API_URL = `${BACKEND_URL}/api/sales/${id}`;
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
    });

    useEffect(() =>
    {
        // Fetch sale item data based on the provided ID
        axios
            .get(API_URL)
            .then((response) =>
            {
                setFormData(response.data);
            })
            .catch((error) =>
            {
                console.error('Error fetching sale data: ', error);
            });
    }, [API_URL]);

    const handleUpdate = () =>
    {
        axios
            .put(API_URL, formData)
            .then(() =>
            {
                console.log('Sale item updated');
            })
            .catch((error) =>
            {
                console.error('Error updating sale item: ', error);
            });
        navigate('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Box p={3}>
                    <Typography variant="h5">Edit Sale</Typography>
                    <form onSubmit={handleUpdate}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Update Sale
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default UpdateSaleForm;
