const mysql = require("mysql");

function objMap(obj, fn) {
   let mapped = {};
   for (let key in obj) {
      mapped[key] = fn(obj[key]);
   }
   return mapped;
}

class Database {
   constructor(host, user, password, database, onConnection = () => {}) {
      this.con = mysql.createConnection({
         host,
         user,
         password,
         database,
      });
      this.con.connect((err) => {
         if (err) {
            throw err;
         }
         console.log("Connection to database successful!");
         onConnection();
      });
   }

   createQueryFromRequest(queryObj, startChar = "") {
      if (!queryObj) {
         return "";
      }
      let query = "WHERE ";
      for (let key in queryObj) {
         if (Number.isNaN(Number(queryObj[key]))) {
            queryObj[key] = `'${queryObj[key]}'`;
         }
         if (query !== "WHERE ") {
            query += "AND ";
         }
         query += `${startChar}${key}=${queryObj[key]} `;
      }
      return query === "WHERE " ? "" : query.substring(0, query.length - 1);
   }

   select(table, params = ["*"], queryObj = undefined) {
      return new Promise((resolve, reject) => {
         let sql = `SELECT ${params.join(",")} FROM ${table} ${this.createQueryFromRequest(queryObj)}`;
         this.con.query(sql, (err, res) => {
            if (err) {
               reject(err);
            } else {
               resolve(res);
            }
         });
      });
   }

   joinSelect(table1, table2, join1, join2, params1 = [], params2 = [], queryObj1 = {}, queryObj2 = {}) {
      if (!join2) {
         join2 = join1;
      }
      let params = [...params1.map((val) => `${table1}.${val}`), ...params2.map((val) => `${table2}.${val}`)];
      let queryObj = {
         ...objMap(queryObj1, (val) => `${table1}.${val}`),
         ...objMap(queryObj2, (val) => `${table2}.${val}`),
      };
      console.log(params, queryObj);
      return new Promise((resolve, reject) => {
         let sql = `SELECT ${params.length !== 0 ? params.join(",") : "*"}\
         FROM ${table1}\
         JOIN ${table2}\
         ON ${table1}.${join1}=${table2}.${join2}\
         ${this.createQueryFromRequest(queryObj)}`;
         this.con.query(sql, (err, res) => {
            if (err) {
               reject(err);
            } else {
               resolve(res);
            }
         });
      });
   }

   insert(table, params, values) {
      values = values.map((val) => `'${val}'`);
      return new Promise((resolve, reject) => {
         let sql = `INSERT INTO ${table}\
        (${params.join(",")}) VALUES\
        (${values.join(",")})`;
         this.con.query(sql, (err, res) => {
            if (err) {
               reject(err);
            } else {
               resolve(res);
            }
         });
      });
   }

   update(table, cols, values, queryObj) {
      let params = [];
      for (let i = 0; i < cols.length; i++) {
         params.push(`${cols[i]}='${values[i]}'`);
      }
      return new Promise((resolve, reject) => {
         try {
            let sql = `UPDATE ${table}\
            SET ${params.join(",")}\
            ${this.createQueryFromRequest(queryObj)}`;
            this.con.query(sql, (err, res) => {
               if (err) {
                  reject(err);
               } else {
                  resolve(res);
               }
            });
         } catch (err) {
            reject(err);
         }
      });
   }

   delete(table, queryObj) {
      let sql = `DELETE FROM ${table}\
    ${this.createQueryFromRequest(queryObj)}`;
      return new Promise((resolve, reject) => {
         this.con.query(sql, (err, res) => {
            if (err) {
               reject(err);
            } else {
               resolve(res);
            }
         });
      });
   }

   async checkCookie(cookie) {
      if (!cookie) {
         return -1;
      }
      let user = await this.select("user_access", ["user_id"], { cookie });
      if (user.length === 0) {
         return -1;
      }
      let id = user[0].user_id;
      return id;
   }
}

module.exports = new Database("localhost", "root", "z10mz10m", "TeenTask");
