module.exports = function(server, db){
  var io = require('socket.io')(server);
  var InfoCollection = db.collection('projectInfo');
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });

    socket.on('projectList', function(cb){
      console.log('requesting project list');
      InfoCollection.find({}).map(function (doc) {
        return doc.project;
      }, function(err, list){
        console.log(err, list);
        cb(list);
      });
    });

    socket.on('projectInfo', function(projectName, cb){
      console.log('requesting project list');
      InfoCollection.findOne({projectName:projectName}, function(doc) {
        cb(doc);
      });
    });

    socket.on('dataDates', function(projectName, cb){
      var collectName = 'project_data_' + projectName;
      console.log(projectName, collectName);
      db.collection(collectName).distinct('date', {}, function(err, dataDates){
        cb(dataDates);
      });
    });

    socket.on('getData', function(dataSelectParams, cb){
      var collectName = 'project_data_' + dataSelectParams.projectName;
      var query = {
        date: dataSelectParams.date
      };
      if(dataSelectParams.startTime){
        query.time = query.time || {};
        query.time['$gt']= dataSelectParams.startTime;
      }
      if(dataSelectParams.endTime){
        query.time = query.time || {};
        query.time['$lt'] = dataSelectParams.endTime;
      }
      console.log(query);
      db.collection(collectName).find(query, function(err, docs){
        cb(docs);
      });
    });

    socket.on('dataRequest', function(timestamp){
      console.log(timestamp);
    });






  });
};
