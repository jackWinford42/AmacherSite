"use strict";

const db = require("../db");

class Plasmid {
  /** Add a single plasmid to the plasmid table given the complete data
 * provided by the user in a form. Also check for a duplicate plasmid with
 * the same name and throw an error in that case.
 */
  static async add(data) {
    const duplicateCheck = await db.query(
          `SELECT name 
          FROM plasmids 
          WHERE name = $1`,
        [data.name],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate plasmid: ${name}`);
    }
    const result = await db.query(
      `INSERT INTO plasmids
      ( name,
        sequence,
        gly_stock,
        puri_protein,
        uc_mole_weight,
        uc_ext_co,
        uc_ext_co_M,
        uc_iso_point,
        mole_weight,
        ext_co,
        ext_co_M,
        iso_point, 
        email)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) `, [data.name, data.sequence, data.gly_stock, data.puri_protein, data.uc_mole_weight, data.uc_ext_co, data.uc_ext_co_M, data.uc_iso_point, data.mole_weight, data.ext_co, data.ext_co_M, data.iso_point, data.email]
    );

    return result.rows[0];
  }
  
  static async get() {

    const allPlasmids = await db.query(
      `SELECT 
      id,
      name,
      time_created,
      sequence,
      gly_stock,
      puri_protein
      FROM plasmids`
    )

    return allPlasmids.rows;
  }
} 

module.exports = Plasmid;
