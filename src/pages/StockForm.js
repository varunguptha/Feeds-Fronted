import React, { useState } from 'react';
import axios from 'axios';
import
{
    TextField,
    Button,
    Paper,
    Typography,
    Container,
    Box,
    Select, // Import the Select component
    MenuItem, InputLabel, FormControl // Import the MenuItem component
} from '@mui/material';

const StockForm = ({ onStockAdded }) =>
{
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    const API_URL = `${BACKEND_URL}/api/stocks`;

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        description: '',
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) =>
    {
        e.preventDefault();

        axios
            .post(API_URL, formData)
            .then((response) =>
            {
                console.log('Stock item added:', response.data);
                setFormData({
                    name: '',
                    quantity: '',
                    price: '',
                    description: '',
                });

                if (onStockAdded)
                {
                    onStockAdded();
                }
            })
            .catch((error) =>
            {
                console.error('Error adding stock item: ', error);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <Box p={3}>
                    <Typography variant="h5">Add New Stock Item</Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="name-label">Name</InputLabel>
                            <Select
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                inputProps={{
                                    id: 'name-label',
                                }}
                            >
                                <MenuItem value="Thavudu">Thavudu</MenuItem>
                                <MenuItem value="Siri Makka Pindi">Siri Makka Pindi</MenuItem>
                                <MenuItem value="Parimala Makka Pindi">Parimala Makka Pindi</MenuItem>
                                <MenuItem value="Normal Makka Pindi">Normal Makka Pindi</MenuItem>
                                <MenuItem value="Pathi Pindi">Pathi Pindi</MenuItem>
                                <MenuItem value="PesaruPottu">PesaruPottu</MenuItem>
                                <MenuItem value="Mixing">Mixing</MenuItem>
                                <MenuItem value="Pellets">Pellets</MenuItem>
                                <MenuItem value="Bellam Dhana">Bellam Dhana</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="quantity-label">Quantity</InputLabel>
                            <Select
                                label="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                inputProps={{
                                    id: 'quantity-label',
                                }}
                            >
                                {/* Generate options dynamically for values 1 to 100 */}
                                {Array.from({ length: 100 }, (_, index) => (
                                    <MenuItem key={index + 1} value={String(index + 1)}>
                                        {index + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Add Stock Item
                        </Button>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default StockForm;
