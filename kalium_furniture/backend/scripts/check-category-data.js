const mongoose = require('mongoose');
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');

const MONGO_URI = 'mongodb://127.0.0.1:27017/kalium_furniture';

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to DB');

        const categories = await Category.find({});
        console.log('--- Categories ---');
        categories.forEach(c => {
            console.log(`Slug: ${c.slug}`);
            console.log(`  H1: ${c.h1Tag}`);
            console.log(`  Desc: ${c.description ? c.description.substring(0, 50) + '...' : 'MISSING'}`);
        });

        const subcategories = await Subcategory.find({});
        console.log('\n--- Subcategories ---');
        subcategories.forEach(s => {
            console.log(`Slug: ${s.slug} (Parent: ${s.parentCategory})`);
            console.log(`  H1: ${s.h1Tag}`);
            console.log(`  Desc: ${s.description ? s.description.substring(0, 50) + '...' : 'MISSING'}`);
        });

        mongoose.disconnect();
    })
    .catch(err => console.error(err));
