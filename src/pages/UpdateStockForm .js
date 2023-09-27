import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import
{
    TextField,
    Button,
    Container,
    Typography,
} from '@mui/material';

const UpdateStockForm = () =>
{
    const { id } = useParams();
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API_URL = `${BACKEND_URL}/api/stocks/${id}`;
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
    });
    const navigate = useNavigate();

    useEffect(() =>
    {
        axios
            .get(API_URL)
            .then((response) =>
            {
                setFormData(response.data);
            })
            .catch((error) =>
            {
                console.error('Error fetching stock data: ', error);
            });
    }, [API_URL]);

    const handleUpdate = () =>
    {
        axios.put(API_URL, formData)
            .then((response) =>
            {
                if (response.status === 200)
                {
                    console.log('Stock item updated');
                }

            })
            .catch((error) =>
            {
                console.error('Error updating stock item: ', error);
            });

        navigate('/'); // Redirect to the desired route after update

    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4">Edit Stock Item</Typography>
            <form onSubmit={handleUpdate}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    margin="normal"
                    disabled
                />
                <TextField
                    fullWidth
                    label="Quantity"
                    variant="outlined"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </form>
        </Container>
    );
};

export default UpdateStockForm;
