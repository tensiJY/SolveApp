import React from 'react';
import SQLite from 'react-native-sqlite-storage';

export default class SQLiteScreen extends React.Component {
  constructor() {
    super();
    SQLite.DEBUG = true;

    db = SQLite.openDatabase(
      {
        name: 'solveProblem.sqlite3',
        createFromLocation: '~www/solveProblem.sqlite3',
        location: 'Library',
      },
      (DB) => {
        console.log('success opening db');
      },
      (err) => {
        console.log(err);
      }
    );  

    
  }

  /**
  * Execute sql queries
  * 
  * @param sql
  * @param params
  * 
  * @returns {resolve} results
  */
  executeQuery = (sql, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

 /**
   * Select Query Example
   */
  async selectQuery() {
    let selectQuery = await this.executeQuery('select * from tbl_reg', []);
    var rows = selectQuery.rows;

    var _res = [];
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      _res.push(item);
    }
    return _res;
  }
  
  /**
   * 모든 데이터를 삭제
   */
  async deleteAll(){
    let _query = await this.executeQuery('delete from tbl_reg', []);
  }

  async insertAll(data){
    let _list = data.data_list;
    let _cnt = 0;
    let _query = 'insert into tbl_reg(sol_idx, sol_title, sol_answer, sol_dtl1, sol_dtl2, sol_dtl3, sol_dtl4, sol_dtl5, sol_use_date, sol_is_use,add_user_id, add_date, add_time)'
    _query +=  'values(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    for(var i=0; i<_list.length; i++){
      let _arr = [];
      _arr.push(_list[i].sol_idx);
      _arr.push(_list[i].sol_title);
      _arr.push(_list[i].sol_answer);
      _arr.push(_list[i].sol_dtl1);
      _arr.push(_list[i].sol_dtl2);
      _arr.push(_list[i].sol_dtl3);
      _arr.push(_list[i].sol_dtl4);
      _arr.push(_list[i].sol_dtl5);
      _arr.push(_list[i].sol_use_date);
      _arr.push(_list[i].sol_is_use);
      _arr.push(_list[i].add_user_id);
      _arr.push(_list[i].add_date);
      _arr.push(_list[i].add_time);
      let _selectQuery = await this.executeQuery(_query, _arr);
    
      
      _cnt ++;
    }

    return _cnt;
  }

  /**
   * sol_idx를 가져오기
   */
  async getSelectIdxList(){
    let selectQuery = await this.executeQuery('select sol_idx from tbl_reg', []);
    var rows = selectQuery.rows;

    var _res = [];
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      _res.push(item);
    }
    return _res;
  }

}