import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// ORIGINAL SEQUELIZE
// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(
//       process.env.DB_NAME || '',
//       process.env.DB_USER || '',
//       process.env.DB_PASSWORD,
//       {
//         host: 'localhost',
//         dialect: 'postgres',
//         dialectOptions: {
//           decimalNumbers: true,
//           charset: 'utf8',
//         },
//       }
//     );

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST || "localhost", // Default to localhost if not provided
//   port:  process.env.DB_PORT ? String(process.env.DB_PORT) : "5432", // Default PostgreSQL port
//   username: process.env.DB_USER || "your_db_user", // Your database username
//   password: process.env.DB_PASSWORD || "your_db_password", // Your database password
//   database: process.env.DB_NAME || "your_db_name", // Your database name
//   dialect: "postgres", // Database dialect (PostgreSQL)
//   logging: false, // Disable logging if not needed
// } as any);

console.log("DB Host:", process.env.DB_HOST);
console.log("DB Port:", process.env.DB_PORT);
console.log("DB User:", process.env.DB_USER);
console.log("DB Name:", process.env.DB_NAME);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB Password:", process.env.FRONTEND_URL);

// const sequelize = new Sequelize(
//   process.env.DB_NAME!, // Force TypeScript to treat this as a string (assuming it's defined in your .env)
//   process.env.DB_USER!,
//   process.env.DB_PASSWORD!,
//   {
//     host: process.env.DB_HOST!,
//     // Convert DB_PORT from string to number explicitly
//     port: parseInt(process.env.DB_PORT || '5432', 10), // Default to 5432 if DB_PORT is undefined
//     dialect: "postgres",
//     logging: false, // Set to true for query logging (helpful for debugging)
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // Ensure you allow SSL connections for Render
//       },
//     },
//   }
// );

const dbUrl = process.env.DB_HOST!;
const { host, pathname, username, password } = new URL(dbUrl);

const sequelize = new Sequelize(
  pathname?.slice(1) || '', // Extract the DB name by removing the leading '/'
  username || '',
  password || '',
  {
    host: host || '',
    port: parseInt(process.env.DB_PORT || '5432', 10), // Ensure port is set or defaults to 5432
    dialect: 'postgres',
    logging: false, // Set to true to log queries for debugging
    dialectOptions: {
      ssl: {
        require: true, // Ensure SSL is required for Render
        rejectUnauthorized: false, // Allow self-signed SSL certs (necessary for Render)
      },
    },
  }
);

// Test connection to the database
sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });



export default sequelize;