/*onmessage = function() {
    x = Math.floor(Math.random() * max);
    y = Math.floor(Math.random() * max);
    myWorker.postMessage({x, y});
    }
  }*/

self.addEventListener('message', function(e) {
self.postMessage(e.data);
}, false);