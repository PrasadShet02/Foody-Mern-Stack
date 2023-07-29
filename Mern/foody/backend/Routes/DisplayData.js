const express = require("express")
const router = express.Router()

router.post('/foodData', (req,res)=>{
    try{
        res.send([global.food_items_data,global.food_category_data])

    }catch(error){
        console.error(error)
        res.send("Server Error")
    }
})

module.exports = router;