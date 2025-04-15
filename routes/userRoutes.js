const express=require("express");
const mysql = require("mysql");
const router = express.Router();
const { ensureAdmin } = require('../middleware/auth');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",  
    database: "moms_art"
});

router.get('/',(req,res)=>{
    res.render('index');
}
)
router.get('/register',(req,res)=>{
    res.render('register');
}
);
router.get("/login", (req, res) => {
    res.render("login"); 
});
router.get("/admin-dashboard", ensureAdmin, (req, res) => {
    res.render("admin-dashboard");
});
router.delete("/admin/delete-product/:id", (req, res) => {
    const productId = req.params.id;

    console.log("Deleting product with ID:", productId); 

    db.query("DELETE FROM products WHERE id = ?", [productId], (err, result) => {
        if (err) {
            console.error("❌ MySQL Error:", err);  // 
            return res.status(500).send("Error deleting product");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Product not found");
        }

        res.send("Product deleted successfully");
    });
});

module.exports=router;
