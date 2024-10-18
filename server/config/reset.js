import { pool } from './database.js';
import './dotenv.js';
import companiesData from '../data/companies.js';

const createCompaniesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS companies;

    CREATE TABLE IF NOT EXISTS companies (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      logo VARCHAR(255) NOT NULL,
      missionStatement TEXT NOT NULL,
      lobbyingSpend2021 INT NOT NULL,
      workforceDiversityScore INT NOT NULL,
      environmentalResponsibilityScore INT NOT NULL,
      politicalIntrigueScore INT NOT NULL,
      sriScore INT NOT NULL
    );
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 companies table created successfully');
  } catch (err) {
    console.error('⚠️ error creating companies table', err);
  }
};

const seedCompaniesTable = async () => {
  await createCompaniesTable();

  companiesData.forEach((company) => {
    const insertQuery = {
      text: `
        INSERT INTO companies (name, logo, missionStatement, lobbyingSpend2021, workforceDiversityScore, environmentalResponsibilityScore, politicalIntrigueScore, sriScore) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
    };

    const values = [
      company.name,
      company.logo,
      company.missionStatement,
      company.lobbyingSpend2021,
      company.workforceDiversityScore,
      company.environmentalResponsibilityScore,
      company.politicalIntrigueScore,
      company.sriScore,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error(`⚠️ error inserting company ${company.name}`, err);
        return;
      }

      console.log(`✅ ${company.name} added successfully`);
    });
  });
};

seedCompaniesTable();
