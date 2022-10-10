const uuid = require('uuid');
// const ApiError = require('../error/ApiError');
const path = require('path');
const db = require('../db');


class TableController{

    async create(req, res, next){
        try{
            const {name, date, amount, distance} = req.body;
            const newProduct = await db.query('INSERT INTO products (date, name, amount, distance) values ($1, $2, $3, $4) RETURNING *', 
                                              [date, name, amount, distance]);
            return res.json(newProduct.rows[0]);
        }catch(e){
            console.log(e.message);
        }
    }
    async delete(req, res){
        try{
            const {id} = req.params;
            const status = await db.query('DELETE FROM products WHERE id=$1', [id]);
            return res.json(status);
        }catch(e){
            console.log(e.message);
        }
    }
    async get(req, res, next){
        try{
            let {column, filter, text, page, limit} = req.query;
            page = page || 1;
            limit = limit || 5;
            let offset = page * limit - limit;
            let products;
            if (!column || !filter){
                products = await db.query('SELECT *, count(*) over () as all_count FROM products LIMIT $1 OFFSET $2', 
                                          [limit, offset] );
                return res.json(products.rows);   
            }
            if (filter === "up"){
                products = await db.query('SELECT *, count(*) over () as all_count FROM products ORDER BY ' + 
                                           column + ' LIMIT $1 OFFSET $2', 
                                          [limit, offset]);
                return res.json(products.rows);  
            }
            if (filter === "down"){
                products = await db.query('SELECT *, count(*) over () as all_count FROM products ORDER BY ' + 
                                           column + ' DESC LIMIT $1 OFFSET $2', 
                                          [limit, offset]);
                return res.json(products.rows);  
            }
            if (filter === "contains"){
                products = await db.query('SELECT *, count(*) over () as all_count FROM products WHERE ' + 
                                           column + '::text LIKE $1 LIMIT $2 OFFSET $3', 
                                           [`%${text}%`, limit, offset]);
                return res.json(products.rows);  
            }
            if (filter === "equals"){
                products = await db.query('SELECT *, count(*) over () as all_count FROM products WHERE ' + 
                                           column + '=$1 LIMIT $2 OFFSET $3', 
                                        [text, limit, offset]);
                return res.json(products.rows);  
            }           
        }catch(e){
            console.log(e.message);
        }
         
    }
    
   
  
}

module.exports = new TableController();