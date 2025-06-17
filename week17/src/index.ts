import { Client } from 'pg';

const pgClient = new Client("postgresql://neondb_owner:npg_rFOun1Xfa9Si@ep-round-snow-a1qox9f7-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require");

async function main() {
    await pgClient.connect();
    const respoonse = await pgClient.query("Select * from users");
    console.log(respoonse.rows);
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ($1,$2,$3)";
    const res = await pgClient.query(insertQuery, ['zhengg','zheng0409@gmail.com', 'ilovezheng123'])

    const respoonse2 = await pgClient.query("Select * from users");
    console.log(respoonse2.rows);
}

main() ;