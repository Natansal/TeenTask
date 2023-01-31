const mysql = require("mysql");

function objMap(obj, fn) {
   let mapped = {};
   for (let key in obj) {
      mapped[key] = fn(obj[key], key);
   }
   return mapped;
}

function objForEach(obj, fn) {
   for (let key in obj) {
      fn(obj[key], key);
   }
   return obj;
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

   joinSelect(table1, table2, join1, join2 = join1, params1 = [], params2 = [], queryObj1 = {}, queryObj2 = {}) {
      if (!join2) {
         join2 = join1;
      }
      let params = [...params1.map((val) => `${table1}.${val}`), ...params2.map((val) => `${table2}.${val}`)];
      let queryObj = {
         ...objForEach(queryObj1, (val, key) => {
            queryObj1[`${table1}.${key}`] = val;
            delete queryObj1[key];
         }),
         ...objForEach(queryObj2, (val, key) => {
            queryObj2[`${table2}.${key}`] = val;
            delete queryObj2[key];
         }),
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

   async tripleJoinSelect(
      table1,
      table2,
      table3,
      join1,
      join2 = join1,
      join3 = join2,
      join4 = join3,
      params1 = [],
      params2 = [],
      params3 = [],
      queryObj1 = {},
      queryObj2 = {},
      queryObj3 = {},
   ) {
      let params = [
         ...params1.map((val) => `${table1}.${val}`),
         ...params2.map((val) => `${table2}.${val}`),
         params3.map((val) => `${table3}.${val}`),
      ];
      let queryObj = {
         ...objForEach(queryObj1, (val, key) => {
            queryObj1[`${table1}.${key}`] = val;
            delete queryObj1[key];
         }),
         ...objForEach(queryObj2, (val, key) => {
            queryObj2[`${table2}.${key}`] = val;
            delete queryObj2[key];
         }),

         ...objForEach(queryObj3, (val, key) => {
            queryObj3[`${table3}.${key}`] = val;
            delete queryObj3[key];
         }),
      };
      return new Promise((resolve, reject) => {
         let sql = `SELECT ${params.length !== 0 ? params.join(",") : "*"}\
         FROM ${table1}\
         JOIN ${table2}\
         ON ${table1}.${join1}=${table2}.${join2}\
         JOIN ${table3}\
         ON ${table2}.${join3}=${table3}.${join4}\
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

   async query(query) {
      this.con.query(query, (err, res) => {
         if (err) {
            reject(err);
         } else {
            resolve(res);
         }
      });
   }
}

module.exports = new Database("localhost", "root", "z10mz10m", "TeenTask");
