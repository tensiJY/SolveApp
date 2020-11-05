import React, {Component} from 'react';
import SQLite from 'react-native-sqlite-storage';
// let _Sql = {};
// _Sql.info = {
//                 name: 'solveProblem.db',
//                 createFromLocation:  '~www/solveProblem.db',
//                 location: 'Library',
//             };


class Sql extends Component{
    constructor() {
        super();

        SQLite.DEBUG = true;

        db = SQLite.openDatabase(
            {
              name: 'solveProblem.db',
              createFromLocation:  '~www/solveProblem.db',
              location: 'Library',
            },
            (DB) => {
                console.log('success opening db');
            },
            (err)=>{
                console.log(err);
            }
        );  

        
    }

    ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
          },
            (error) => {
              reject(error);
            });
        });
    });


    async SelectQuery(){
        let selectQuery = await this.ExecuteQuery("SELECT * FROM tbl_reg",[]);
        var rows = selectQuery.rows;
        var result = [];
        for (let i = 0; i < rows.length; i++) {
            var item = rows.item(i);
            // console.log(item);
            result.push(item);
        }

        return result;
    }

}



export default Sql;
   
// const db = SQLite.openDatabase(
//         {
//           name: 'solveProblem.db',
//           createFromLocation:  '~www/solveProblem.db',
//           location: 'Library',
//         },
//         (DB) => {
//             console.log('success opening db');
//         },
//         (err)=>{
//             console.log(err);
//         }
// );      


// db.transaction((txn)=> {
//     txn.executeSql(
//       'select * from tbl_reg',  //Query to execute as prepared statement
//       [],  //Argument to pass for the prepared statement
//       (tx, res)=> {
//           //console.log(tx)
//           console.log(res.rows.length)
//           console.log(res.rows.item(0))
//       }  //Callback function to handle the result
//     );
//   });





