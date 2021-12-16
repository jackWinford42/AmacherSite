"use strict";

const db = require("../db");

class purifiedProtein {
  /** Add a single purified protein to the purified protein table given the complete data
 * provided by the user in a form. Purified proteins can have the same name and other overlapping fields.
 * */
  static async add(data) {
    console.log("INSIDE ADD MODEL");
    console.log(data);
    const result = await db.query(
      `INSERT INTO purified_protein 
      ( plasmid_name,
        cleaved,
        concentration,
        tube_count,
        box)
        VALUES ($1, $2, $3, $4, $5)`,
        [data.plasmid_name, data.cleaved, data.concentration, data.tube_count, data.box]
    );

    return result.rows[0];
  }
  
  static async get() {

    const purifiedProteins = await db.query(
      `SELECT 
      id,
      plasmid_name,
      cleaved,
      concentration,
      tube_count,
      time_created,
      box
      FROM purified_protein`
    )

    return purifiedProteins.rows;
  }
} 

module.exports = purifiedProtein;
