import express from 'express';
import Wheel from '../models/wheel';

const wheelRoutes = express.Router();

wheelRoutes.post('/wheels',function(req, res){
  let wheel = new Wheel();
  // Changing your schema for the wheel will make it possible to set up below
  // with a nice loop - HAROLD
  wheel.date = req.body.date;
  wheel.segs = req.body.segs;
  wheel.owner = req.body.owner;
  wheel.save(function(err, wheel){
    if(err){
      res.send(err);
    } else {
      res.json(wheel);
    }
  });
});

wheelRoutes.get('/wheels/:owner_id', function(req, res, next){
  Wheel.find({owner: req.params.owner_id}).populate('owner').exec(function(err, wheels){
    if(err){
      next(err);
    } else {
      res.json(wheels);
    }
  });
});

wheelRoutes.delete('/wheels/:wheel_id', function(req, res){
  Wheel.remove({_id: req.params.wheel_id}, function(err, wheel){
    if(err){
      console.log(err);
    } else {
      res.json({title: 'Wheel was successfully deleted!'});
    }
  });
});

export default wheelRoutes;
