// Global Report Validator

// Need some glob here?
var scripts = ['add.test.report']; // Script names without file extension

// Testing add.test.report
// ------------
var fs = require('fs'); 
var exec = require('child_process').exec;
var d = require('path').resolve(__dirname);
var test = require('tape-catch');

var s = scripts.length;

while(s--) {
  var scriptPath = d+'/'+ scripts[s] + '.js';
  var reportPath = d+'/'+ scripts[s] + '.md';
  
  if (fs.existsSync( reportPath )) {
    fs.unlinkSync(reportPath);
  };

  test('test report generated by '+ scripts[0], function(t){
    exec('tape '+ scriptPath, function(err, stdout, stderr){
      // Just read the summary
      function reportValid( str ) {
        var regexp = /Summary[.\s\S]*fail: 0/g;
        return str.match(regexp) !== null; 
      };
      var report = fs.readFileSync(reportPath,'utf8')+'';
      t.equal(reportValid(report),true,'Summary report validates');
      t.equal(stderr,'','empty stderr');
      t.end();
    });
  });
};