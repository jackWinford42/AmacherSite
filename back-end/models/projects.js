"use strict";

const db = require("../db");

class Project{
  // Given a project name, add a single project to the projects table.
  static async add(data) {
    const result = await db.query(
      `INSERT INTO projects
      ( name )
      VALUES ($1)`,
      [data.name]
    );

    return result.rows[0];
  } 

  // Get all the projects from the projects table.
  static async getAll() {
    const allProjects = await db.query(
      `SELECT
      id,
      name
      FROM projects`
    )

    return allProjects.rows;
  }
}

module.exports = Project;
