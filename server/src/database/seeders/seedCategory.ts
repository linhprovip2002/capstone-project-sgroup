import { Category } from "../models";
import { dbConfig } from "../config";
const categories =  require('./migrations/category.json');
async function seedData() {
    try {
        await dbConfig.connect();
        await Category.insertMany(categories);
        console.log('Categories seeded successfully');
        return;
    } catch (error) {
        console.log('Error while seeding categories');
        throw error;
    }
}
seedData();