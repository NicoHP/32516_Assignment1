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
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Mechanical Keyboard',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Mouse',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=500&q=60'
    },
    {
        name: '27-inch 4K Monitor',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60'
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