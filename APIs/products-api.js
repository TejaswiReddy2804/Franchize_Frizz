//create mini express app
const exp = require('express')
const productApi = exp.Router();
const expressErrorHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { request } = require('http');

//add body parsing middleware
productApi.use(exp.json())



//ADD PRODUCT


productApi.post("/addproduct", expressErrorHandler(async (req, res, next) => {

    let productCollectionObj = req.app.get("productCollectionObj")

    let newProdObject = req.body;

    
    //find usercartcollection 
    let productObj = await productCollectionObj.findOne({ franchisename: newProdObject.franchisename })

    //if FranchiseObject is not existed
    if (productObj === null) {

        //create new object
        let products = [];
        products.push(newProdObject)

        let newProductObject = { franchisename: newProdObject.franchisename, products }

        //insert it
        await productCollectionObj.insertOne(newProductObject)


        res.send({ message: "New product Added" })

    }
    //if existed
    else {

        //push productObject to products array
        productObj.products.push(newProdObject)
        //update document
        await productCollectionObj.updateOne({ franchisename: newProdObject.franchisename }, { $set: { ...productObj } })

        res.send({ message: "New product Added" })
    }


}))



productApi.get("/getproducts/:franchisename", expressErrorHandler(async (req, res) => {

    let productCollectionObj = req.app.get("productCollectionObj")
    let name=req.params.franchisename
    let merchList = await productCollectionObj.findOne({franchisename:name})
    res.send({ message: merchList })

}))
ki


//export
module.exports = productApi;
