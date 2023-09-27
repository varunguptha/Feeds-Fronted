// StockTable.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import
{
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom';

const StockTable = () =>
{
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API_URL = `${BACKEND_URL}/api/stocks`;
  const [stock, setStock] = useState([]);
  const navigate = useNavigate();

  const fetchData = () =>
  {
    axios
      .get(API_URL)
      .then((response) =>
      {
        setStock(response.data);
      })
      .catch((error) =>
      {
        console.error('Error fetching stock data: ', error);
      });
  };

  useEffect(() =>
  {
    fetchData();
  }, []);

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

  const handleDelete = (itemId) =>
  {
    axios
      .delete(`${API_URL}/${itemId}`)
      .then(() =>
      {
        console.log('Stock item deleted');
        fetchData();
      })
      .catch((error) =>
      {
        console.error('Error deleting stock item: ', error);
      });
  };

  const handleEdit = (itemId) =>
  {
    navigate(`/update-stock/${itemId}`);
  };

  return (
    <TableContainer component={Paper}>
      {stock.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date And Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stock.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity * item.price}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    startIcon={<DeleteIcon style={{ paddingLeft: "10px" }} />}
                    onClick={() => handleDelete(item._id)}
                  >
                  </Button>
                  <Button
                    startIcon={<EditIcon style={{ paddingLeft: "10px" }} />}
                    onClick={() => handleEdit(item._id)} s >
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="h6" align="center">
          No stock
        </Typography>
      )}
    </TableContainer>
  );
};

export default StockTable;
