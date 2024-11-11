import mysql from "mysql2/promise";
import { Venda } from "@/lib/definitions";

export const createConnection = async () => {
  // Create the connection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  return connection;
};

export async function getData(id?: string): Promise<Venda[]> {
  // Fetch data from your API here.
  const data = [
    // Generate fake data to test the table.
    {
      id: "1",
      description: "Payment 1",
      amount: 100,
      datetime: "2021-01-01",
    },
    {
      id: "2",
      description: "Payment 2",
      amount: 200,
      datetime: "2021-01-02",
    },
    {
      id: "3",
      description: "Payment 3",
      amount: 300,
      datetime: "2021-01-03",
    },
  ];

  // If `id` is provided, filter the data by `id`. Otherwise, return all data.
  return id ? data.filter((d) => d.id === id) : data;
}

// export async function getVendas() {
//   const connection = await createConnection();
//   const [rows] = await connection.query("SELECT * FROM vendas");
//   return rows;
// }
