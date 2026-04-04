require('dotenv').config();
const mongoose = require('mongoose');

const ProductionSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});
const Product = mongoose.model('Product', ProductionSchema);

const sampleProducts = [
    {
        name: 'Wireless Headphones',
        price: 299.99,
        image: '/images/headphone.png'
    },
    {
        name: 'Mechanical Keyboard',
        price: 129.99,
        image: '/images/keyboard.png'
    },
    {
        name: 'Mouse',
        price: 79.99,
        image: '/images/mouse.png'
    },
    {
        name: '27-inch 4K Monitor',
        price: 449.99,
        image: '/images/monitor.png'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await Product.deleteMany({});
        console.log('Old products cleared.');

        await Product.insertMany(sampleProducts);
        console.log('Test products added successfully.');

        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
};

seedDB();