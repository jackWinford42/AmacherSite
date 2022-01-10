"use strict";

const db = require("../db");

class glycerolStocks {
  // Add a glycerol stock to the glycerol stocks table given the complete data on the corresponding plasmid
  static async add(data) {
    console.log("INSIDE ADD MODEL");
    console.log(data);
    const result = await db.query(
      `INSERT INTO glycerolStocks 
      ( plasmid_id,
        plasmid_name,
        number_of_tubes)
        VALUES ($1, $2, $3)`,
        [data.plasmid_id, data.plasmid_name, data.number_of_tubes]
    );

    return result.rows[0];
  }
  //get all the gylcerol stocks
  static async get() {

    const glycerolStocks = await db.query(
      `SELECT 
      id,
      plasmid_id,
      plasmid_name,
      number_of_tubes
      FROM glycerolStocks`
    )

    return glycerolStocks.rows;
  }
} 

module.exports = glycerolStocks;
