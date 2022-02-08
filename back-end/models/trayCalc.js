"use strict";

const db = require("../db");

class TrayCalc {
  /** Add a single crystal tray row into the crystal tray table
   * */
  static async add(data) {

    const result = await db.query(
      `INSERT INTO plasmids
       (added_by,
        green,
        pink,
        purple,
        gStock,
        piStock,
        puStock,
        gAOne,
        piAOnek,
        puAOnek,
        gStep,
        piStepk,
        total_volume)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) `, [data.user, data.green, data.pink, data.purple, data.gStock, data.piStock, data.puStock, data.gAOne, data.piAOnek, data.ext_co, data.ext_co_M, data.iso_point, data.email]
    );
//finish writing the data. with column names
    return result.rows[0];
  }
  
  static async get() {

    const allCrystals = await db.query(
      `SELECT 
      id,
      time_created,
      added_by,
      green,
      pink,
      purple,
      gStock,
      piStock,
      puStock,
      gAOne,
      piAOnek,
      puAOnek,
      gStep,
      piStepk,
      total_volume
      FROM crystalTray`
    )

    console.log(allCrystals)

    return allCrystals.rows;
  }
} 

module.exports = TrayCalc;
