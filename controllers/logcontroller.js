let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
let Log = require('../db').import('../models/log');

router.get('/practice', validateSession, function(req, res)
{
    res.send('This is a practice route')
});

router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    } 
    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json ({error: err}))
    });

    //Get all logs

    router.get("/", (req, res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }));
    });

    //Get all logs for single user

    router.get("/mine", validateSession, (req, res) => {
        let userid = req.user.id
        Log.findAll({
          where: {owner_id: userid}
        })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err}))
        });

    //Get single log for single user

    router.get("/:id", function(req, res) {
      let id = req.params.id;
      Log.findAll({where: {id: id}
      })
      .then(logs => res.status(200).json(logs))
      .catch(err => res.status(500).json({ error: err}))
      });

    //Update log

    router.put("/update/:entryId", validateSession, function (req, res) {
        const updateLogEntry = {
          definition: req.body.log.description,
          description: req.body.log.definition,
          result: req.body.log.result,
        };
      
      const query = {where: {id: req.params.entryId, owner_id: req.user.id}};
      
      Log.update(updateLogEntry, query)
      .then((logs) => res.status(200).json(logs))
      .catch((err) => res.status(500).json({error:err}));
      });

      //Delete log
      
      router.delete("/delete/:id", validateSession, function (req, res) {
        const query = {where: {id: req.params.id, owner_id: req.user.id}};
      
        Log.destroy(query)

        .then(() => res.status(200).json({message: "Log Entry Removed"}))
        .catch((err) => res.status(500).json({error:err}));
      });

module.exports=router;