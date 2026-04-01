require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connect to mongoDB using url in .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err))

//mongoose models
const ProductionSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});
const Product = mongoose.model('Product', ProductionSchema);

const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
});
const CartItem = mongoose.model('CartItem', CartItemSchema);

//CURD

// READ: get products
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// READ: get cart
app.get('/api/cart', async (req, res) => {
    const cart = await CartItem.find().populate('productId');
    res.json(cart);
});

// CREATE: add item to cart
app.post('/api/cart', async (req,res) => {
    const { productId } = req.body;
    //check item exist in cart
    let item = await CartItem.findOne({ productId });
    if (item) {
        item.quantity += 1;
        await item.save();
    } else {
        item = new CartItem({ productId });
        await item.save();
    }
    res.status(201).json(item);
});

// UPDATE: edit quantity of cart item
app.put('/api/cart/:id', async (req, res) => {
    const { quantity } = req.body;
    const item = await CartItem.findByIdAndUpdate(req.params.id, { quantity }, { returnDocument: 'after' });
    res.json(item);
});

// DELETE: remove from cart
app.delete('/api/cart/:id', async (req, res) => {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));