const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js");
const User = require("../models/user.js");
router.use(express.urlencoded({extended : true}));
router.use(express.json());
const q  = [
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "Who is the current President of the United States?",
        answer: "Joe Biden"
    },
    {
        question: "What is the world's largest ocean?",
        answer: "Pacific Ocean"
    },
    {
        question: "What is the currency of Japan?",
        answer: "Japanese yen"
    },
    {
        question: "What is the tallest mountain in the world?",
        answer: "Mount Everest"
    }
];
const jum = [
    { jumble: "wolb", answer: "blow" },
    { jumble: "knurt", answer: "trunk" },
    { jumble: "ginnaer", answer: "earning" },
    { jumble: "ritp", answer: "trip" },
    { jumble: "rrufly", answer: "flurry" }
  ];
router.get("/:id/dashboard", middleware.loggedIn, (req,res) => {
	res.render("user/dashboard", {
		title: "Dashboard",
	});
});
router.get("/:id/profile", middleware.loggedIn, async(req, res) =>{
	res.render("user/profile", {
		title : 'Profile', 
	});
} )

router.get("/:id/game/:num", middleware.loggedIn, (req,res) =>{
    const {id, num} = req.params;
    if(num === '1'){ 
	    res.render('game/1', {
	    	title : 'Door 1',
	    	q
	    });
    }
    else if(num === '2'){
        res.render('game/2', {
            title : 'Door 2',
            jum
        });
    }
    else if(num === '3'){
        res.render('game/3', {
            title : 'Door 3',
        });
    }  
})
router.get("/:id/description/:num", middleware.loggedIn, (req,res) =>{
    const {id, num} = req.params;
    if(num === '1'){ 
	    res.render('description/1', {
	    	title : 'Door 1',
	    	q
	    });
    }
    else if(num === '2'){
        res.render('description/2', {
            title : 'Door 2',
            jum
        });
    }
    else if(num === '3'){
        res.render('description/3', {
            title : 'Door 3',
        });
    }  
})
router.post('/:id/add/data/game/:num', middleware.loggedIn, async (req, res) => {
    try {
        const formData = req.body;
        const { id,num } = req.params;
        const user = await User.findOne({ userName: id });

        if (user) {
            if (user.gameScore && user.gameScore.length > 0) {
                if(user.gameScore[num-1] !== null){
                    req.flash('error', 'Data already exists');
                }
                else {user.gameScore[num-1] = parseInt(formData.score);
                    await user.save();
                    req.flash('success', 'Game score updated');
                }
            }
        } else {
            req.flash('warning', 'User not found');
        }
        return res.redirect(`/${id}/game/${num}`);
    } catch (err) {
        console.log(err);
        req.flash('error', 'Server error');
    }
});

module.exports = router;