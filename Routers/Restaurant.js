// Importing External Packages

const express=require("express")

// Importing Model

const {Res}=require("../Models/RestaurantModel.js")

// ...............................................................
const ResRouter =express.Router()



// Add A Restaurant

ResRouter.post("/",async(req,res)=>{
    const {name,address,menu}=req.body
    try {
        let temp=new Res({name,address,menu})
        await temp.save()
        res.status(200).send({msg:"Restaurant Added"})
    } catch (error) {
        res.status(400).send({msg:"something went wrong",error:error.message})
    }
})

// ..............Get ALL Restaurant.............

ResRouter.get("/",async(req,res)=>{
    try {
        let allRes=await Res.find()
        res.status(200).send({allRes})
    } catch (error) {
        res.status(400).send({msg:"something went wrong",error:error.message})
        console.log(error)
    }
})


// ..............Get A Single Restaurant.............

ResRouter.get("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let data=await Res.findById(id)
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send({msg:"something went wrong",error:error.message})
        console.log(error)
    }
})


// ..............Get A Restaurant Menu.............

ResRouter.get("/:id/menu",async(req,res)=>{
    const {id}=req.params
    try {
        let data=await Res.findById(id)
        res.status(200).send(data.menu)
    } catch (error) {
        res.status(400).send({msg:"something went wrong",error:error.message})
        console.log(error)
    }
})

// ..............Add A Item to Restaurant Menu.............

ResRouter.post('/:id/menu', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, image } = req.body;
  
     
      const restaurant = await Res.findById(id);
  
      if (!restaurant) {
        return res.status(404).send({ msg: 'Restaurant not found' });
      }
  
      // Adding the new item to the menu
      restaurant.menu.push({ name, description, price, image });
      await restaurant.save();
  
      res.status(201).send({ msg: 'Item added to the menu successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'An error occurred',error:error.message });
    }
  });


// ..............Delete A Item from a Restaurant Menu.............

  ResRouter.delete('/:id/menu/:menuItemId', async (req, res) => {
    try {
      const { id, menuItemId } = req.params;
  
      const updatedRestaurant = await Res.findByIdAndUpdate(
        id,
        { $pull: { menu: { _id: menuItemId } } },
        { new: true }
      );
  

      if (!updatedRestaurant) {
        return res.status(404).send({ msg: 'Restaurant not found' });
      }
  
      res.status(202).send({ msg: 'Menu item deleted successfully' });
    } catch (error) {
      res.status(500).send({ msg: 'An error occurred',error:error.message });
    }
  });




  module.exports={
    ResRouter
  }