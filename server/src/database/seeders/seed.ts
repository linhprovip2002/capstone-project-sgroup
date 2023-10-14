import mongoose from 'mongoose';
import dbConfig from '../config/db.config';
import { Permission, Role } from '../models'; 

const dataSeed = require('./migrations/permission.json');

async function seedData() {
  try {
    await dbConfig.connect();
    console.log('Connected to the database successfully.');
    console.log(dataSeed);

    const existingPermissions = await Permission.find({ title: { $in: dataSeed.map(permission => permission.title) } });
    const newPermissions = dataSeed.filter(permission => !existingPermissions.some(existing => existing.title === permission.title));
    
    if (newPermissions.length > 0) {
      await Permission.insertMany(newPermissions);
      console.log(`${newPermissions.length} new permissions inserted.`);
    } else {
      console.log('No new permissions to insert.');
    }

    const allPermissions = await Permission.find({});
    const superUserPermissions = allPermissions.map((permission) => permission._id);

    const superUserRole = new Role({
      roleName: 'superUser',
      roleDescription: 'Super User Role',
      IDPermission: superUserPermissions,
    });

    await superUserRole.save();
    console.log('Role "superUser" saved successfully.');

    console.log('Data seeding completed successfully.');
  } catch (error) {
    console.error('Data seeding failed:', error);
  } finally {
    await mongoose.disconnect(); // Close the database connection in both success and error cases
    console.log('Disconnected from the database.');
  }
}

// Call the seedData function to start the seeding process
seedData();
