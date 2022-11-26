import { readFile } from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Tour from '../models/tourModel.js';

// LOAD ENVIRONMENT VARIABLES
dotenv.config({ path: './../config/config.env' });

// VARIABLES
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// CONNECT TO DATABASE
try {
  await mongoose.connect(DB);
  console.log('Database connection successful');
} catch (error) {
  console.log('Database connection failed');
  process.exit();
}

// READ FILE
let tours;
try {
  tours = await readFile(path.join(__dirname, 'data', 'tours.json'), 'utf-8');
} catch (error) {
  console.log(error);
  process.exit();
}

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('Data imported successfully');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
