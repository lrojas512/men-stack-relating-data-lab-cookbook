const express = require('express')
const router = express.Router()
const User = require('../models/user.js')


//INDEX
router.get('/', async (req,res)=>{
    try{
        const user = await User.findById(req.session.user._id)
        res.render('foods/index.ejs',{
            pantry: user.pantry || [],
        }) 
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
})
//NEW
router.get('/new', (req,res)=>{
    res.render('foods/new.ejs')
})

//DELETE
router.delete('/:itemId', async(req,res)=>{
    const user = await User.findById(req.session.user._id)
    user.pantry.id(req.params.itemId).deleteOne()
    await user.save()
    res.redirect(`/users/${user._id}/foods`)
})

//UPDATE

router.put('/:itemId', async (req,res)=>{
    const user = await User.findById(req.session.user._id)
    const food = user.pantry.id(req.params.itemId)
    food.set(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/foods`)
})

//CREATE
router.post('/', async (req,res)=>{
    const user = await User.findById(req.session.user._id)
    user.pantry.push(req.body)
    await user.save()
    res.redirect(`/users/${user._id}/foods`)
})

//EDIT
router.get('/:itemId/edit',async (req,res)=>{
    const user = await User.findById(req.session.user._id)
    const food = user.pantry.id(req.params.itemId)
    res.render('foods/edit.ejs', { food })
})



module.exports = router