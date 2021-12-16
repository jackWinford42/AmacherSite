"use strict";

const db = require("../db");

class ProteinPreps {
   /** Add a single prep to the protein prep table given the complete data
 * provided by the user in a form.
 */
  static async add(data) {

    const result = await db.query(
      `INSERT INTO preps 
      ( plasmid_name,
        plasmid_id,
        prepped_by,
        growth_starter,
        gly_stock )
        VALUES ($1, $2, $3, $4, $5)`, 
      [data.plasmid_name, data.plasmid_id, data.user, data.growth_starter, data.gly_stock]
    );

    return result.rows[0];
  }
  
  static async get() {

    const allPreps = await db.query(
      `SELECT 
      id,
      plasmid_name,
      plasmid_id,
      time_created,
      prepped_by
      FROM preps`
    )

    return allPreps.rows;
  }
} 

module.exports = ProteinPreps;
