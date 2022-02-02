self.addEventListener('message', function(e) {
    //setTimeout(() => {
                    console.log(e);
                    x = Math.floor(Math.random() * e.data[0]);
                      y = Math.floor(Math.random() * e.data[1]);
                      self.postMessage({x, y}) 
                //20000);
  }, false);

  /*
  onmessage = function() {
            setTimeout(() => {x = Math.floor(Math.random() * 500);
                      y = Math.floor(Math.random() * 500);
                      self.postMessage({x, y}) } ,
                Math.random() * 20000);
            }
  */