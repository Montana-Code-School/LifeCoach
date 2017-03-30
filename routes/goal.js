import express from 'express';
import Goal from '../models/goal';

const goalRoutes = express.Router();

goalRoutes.post('/goals',function(req, res){
  let goal = new Goal();
  goal.value = req.body.value;
  goal.lifeGoal = req.body.lifeGoal;
  goal.owner= req.body.owner;
  goal.save(function(err, goal){
    if(err){
      res.send(err);
    } else {
      res.json(goal);
    }
  });
});

goalRoutes.get('/goals/:owner_id', function(req, res, next){
  Goal.find({owner: req.params.owner_id}).populate('owner').exec(function(err, goals){
    if(err){
      next(err);
    } else {
      res.json(goals);
    }
  });
});

goalRoutes.delete('/goals/:goal_id', function(req, res){
  Goal.remove({_id: req.params.goal_id}, function(err, goal){
    // recommend you use the same error approach as your
    // goalRoutes.get above, not a console.log -Harold
    if(err){
      console.log(err);
    } else {
      res.json({title: 'Congrats you completed that goal! its gone forever!'});
    }
  });
});

export default goalRoutes;
