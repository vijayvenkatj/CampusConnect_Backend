import { pool, createUsersTable, createUserProjectsTable, createUserExperienceTable } from "./tables";

export const addUser = async (name: string, email: string, rollnumber: string, batch: number, branch: string): Promise<void> => {
    let client;
    try {
      client = await pool.connect();
      await createUsersTable(); // This should ideally be called only once when setting up the application, not on every user addition
      
      await client.query("BEGIN");
      // Insert user data into the users table
      await client.query(
        "INSERT INTO users (name, email, rollnumber, batch, branch) VALUES ($1, $2, $3, $4, $5)",
        [name, email, rollnumber, batch, branch]
      );
      await client.query("COMMIT");

      await createUserProjectsTable(); // This should ideally be called only once when setting up the application, not on every user addition
      await createUserExperienceTable(); // This should ideally be called only once when setting up the application, not on every user addition
      
    } catch (error) {
      if (client) {
        await client.query("ROLLBACK");
      }
      console.error("Error adding user:", error);
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  };
    
  export const checkEmailExists = async (Email: any) => {
    let client;
    try {
      client = await pool.connect();
      await createUsersTable();
      const query = {
        text: "SELECT EXISTS (SELECT 1 FROM users WHERE email = $1)",
        values: [Email],
      };
      const result = await client.query(query);
      client.release();
      return result.rows[0].exists; // Returns true or false
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw error;
    }
  };
  