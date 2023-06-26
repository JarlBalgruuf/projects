const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const messageRouter = express.Router();

const Messages = require('../models/messages') 

messageRouter.use(bodyParser.json());
var fs = require('fs');

messageRouter.route('/')

.get((req, res, next) => {

    Messages.find({})
    .then((msg)=>{
        //console.log('Messages: ' + msg);
        //res.status = 200;
        //res.setHeader('Content-Type', 'application/json');
        //res.json(msg);
        //console.log(msg);
        res.render('messages', { title: 'Messages', result: msg});
    });
})


.post((req, res, next) => {
    // CReate message
    Messages.create(req.body)
    .then((msg)=>{
        console.log('Message created: ' + msg);
        res.status = 200;
        //res.setHeader('Content-Type', 'application/json');
        //res.json(msg);
        res.redirect('/messages');
    });
})

.delete((req, res, next) => {

    Messages.deleteMany({})
    .then(()=>{
        console.log('All messages deleted');
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end('Messages deleted');
    });
});

messageRouter.route('/new')

.get((req, res, next) => {
    res.render('createMessage', { title: 'Messages', session: req.user});
});

messageRouter.route('/newComment')

.get((req, res, next) => {
    res.render('createComment', { title: 'Messages'});
});


// -------------------------------------- MessageId ----------------------------------------
messageRouter.route('/:messageId')

.get((req, res, next) => {

    Messages.findById(req.params.messageId)
    .then((msg)=>{
        console.log('Message: ' + msg);
        /*
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(msg);
        */
        res.render('message', { title: 'Messages', result: msg, session: req.user });
    });
})

.post((req, res, next) => {

    Messages.findByIdAndRemove(req.params.messageId)
    .then((resp)=>{
        //console.log('Message deleted');
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        //res.json(resp);
        res.redirect('/messages')
    });
})

.put((req, res, next) => {
    Messages.findByIdAndUpdate(req.params.messageId, req.body)
    .then((resp)=>{
        console.log('Message: ' + resp);
        res.status = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    });
});





// -------------------------------------- MessageId/Comments ----------------------------------------
messageRouter.route('/:messageId/comments')

.get((req, res, next) => {

    Messages.findById(req.params.messageId)
    .then((msg)=>{
        if(msg != null){
            console.log('Message: ' + msg);
            res.status = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(msg.comments);
        }
        else{
            res.status = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('Message not found');
        }
    });
})

.post((req, res, next) => {

    Messages.findById(req.params.messageId)
    .then((msg)=>{
        if(msg != null){
            msg.comments.push(req.body);
            msg.save()
            .then((msg)=>{
                //res.status = 200;
                //res.setHeader('Content-Type', 'application/json');
                //res.json(msg);
                res.redirect('/messages/' + req.params.messageId)
            })
        }
        else{
            res.status = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('Message not found');
        }
    });
})

// -------------------------------------- MessageId/Comments/:CommentId ----------------------------------------
messageRouter.route('/:messageId/comments/:commentId')

.get((req, res, next) => {

    Messages.findById(req.params.messageId)
    .then((msg)=>{
        if(msg != null){
            msg.comments.forEach(element => {
                if(element._id == req.params.commentId){
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(element);
                }
            });
        }
        else{
            res.status = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('Comment not found');
        }
    });
})

// not working
.put((req, res, next) => {

    Messages.findById(req.params.messageId)
    .then((msg)=>{
        if(msg != null){
            msg.comments.forEach(element => {
                if(element._id == req.params.commentId){
                    element.push(req.body);
                    element.save()
                    .then((cmt)=>{
                        res.status = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(cmt);
                    })
                }
            });
        }
        else{
            res.status = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('Comment not found');
        }
    });
})

// Not working
.delete((req, res, next) => {

    Messages.findById(req.params.messageId)
    .then((msg)=>{
        if(msg != null){
            msg.comments.forEach(element => {
                if(element._id == req.params.commentId){
                    element.remove();
                    //element.save();
                    res.status = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(element);
                }
            });
        }
        else{
            res.status = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('Comment not found');
        }
    });
})


module.exports = messageRouter;