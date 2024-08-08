const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://abhishekpa:2UqR6i63M7XdUOWJ@customerdata.4hc5q.mongodb.net/', {
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define the customer schema
const customerSchema = new mongoose.Schema({
    gstin: String,
    gstinType: String,
    businessType: String,
    pan: String,
    name: String,
    email: String,
    website: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    primaryPhone: String,
    secondaryPhone: String,
    fax: String,
    contact: String,
    genBusPostingGroup: String,
    customerClassification: String,
    customerType: String,
    currencyCode: String,
    priority: Number,
    packingInstructions: String,
    defaultLocationCode: String,
    paymentTerms: String,
    merchandisingSalesPersonName: String,
    territoryHeadName: String,
    agent: String,
    agentName: String,
    agentCommission: Number,
    shippingAddress1: String,
    shippingAddress2: String,
    shippingCity: String,
    shippingState: String,
    shippingCountry: String,
    shippingPostalCode: String,
    shippingPrimaryPhone: String,
    shippingFax: String,
    shippingContact: String
});

// Create the model
const Customer = mongoose.model('Customer', customerSchema, 'UserInformation');

// Middleware
app.use(cors()); // Allow all origins
app.use(bodyParser.json()); // Middleware to parse JSON

// Route to handle POST requests
app.post('/', (req, res) => {
    const customerData = req.body;
    console.log('Received Data:', customerData);

    // Convert fields to correct types if necessary
    if (customerData.priority) {
        customerData.priority = parseInt(customerData.priority, 10);
    }
    if (customerData.agentCommission) {
        customerData.agentCommission = parseFloat(customerData.agentCommission);
    }

    const customer = new Customer(customerData);

    customer.save()
        .then(() => {
            console.log('Data saved successfully!');
            res.status(201).json({ message: 'Data saved successfully!' });
        })
        .catch((err) => {
            console.error('Save Error:', err); // Log the error
            res.status(500).json({ error: err.message });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
