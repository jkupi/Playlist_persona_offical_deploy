import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// ORIGINAL SEQUELIZE
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        // host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
          charset: 'utf8',
        },
      }
    );

// let sequelize: Sequelize;

// if (process.env.DB_URL) {
//   // Extract details from the URL if DB_URL is set
//   const dbUrl = new URL(process.env.DB_URL);
  
//   sequelize = new Sequelize(dbUrl.pathname.slice(1),  // DB Name
//     dbUrl.username,  // DB User
//     dbUrl.password,  // DB Password
//     {
//       host: dbUrl.hostname,  // DB Host
//       port: parseInt(dbUrl.port || '5432', 10),  // DB Port
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: {
//           require: true,  // Enable SSL
//           rejectUnauthorized: false,  // Allow self-signed SSL certs
//         },
//         decimalNumbers: true,
//       },
//     }
//   );
// } else {
//   // Fallback to individual environment variables if DB_URL is not set
//   sequelize = new Sequelize(
//     process.env.DB_NAME || '',
//     process.env.DB_USER || '',
//     process.env.DB_PASSWORD,
//     {
//       host: process.env.DB_HOST || 'localhost',
//       port: parseInt(process.env.DB_PORT || '5432', 10),
//       dialect: 'postgres',
//       dialectOptions: {
//         decimalNumbers: true,
//         charset: 'utf8',
//       },
//     }
//   );
// }

console.log("DB Host:", process.env.DB_HOST);
console.log("DB Port:", process.env.DB_PORT);
console.log("DB User:", process.env.DB_USER);
console.log("DB Name:", process.env.DB_NAME);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB url:", process.env.DB_URL);



// const dbUrl = process.env.DB_HOST!;
// const { host, pathname, username, password } = new URL(dbUrl);

// const sequelize = new Sequelize(
//   pathname?.slice(1) || '', // Extract the DB name by removing the leading '/'
//   username || '',
//   password || '',
//   {
//     host: host || '',
//     port: parseInt(process.env.DB_PORT || '5432', 10), // Ensure port is set or defaults to 5432
//     dialect: 'postgres',
//     logging: false, // Set to true to log queries for debugging
//     dialectOptions: {
//       ssl: {
//         require: true, // Ensure SSL is required for Render
//         rejectUnauthorized: false, // Allow self-signed SSL certs (necessary for Render)
//       },
//     },
//   }
// );

// Test connection to the database
sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });



export default sequelize;