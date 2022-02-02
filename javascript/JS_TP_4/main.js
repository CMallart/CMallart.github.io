if (window.Worker) {
    const worker = new Worker("worker.js");
  
    worker.addEventListener('message', function(e) {
    console.log('Worker said: ', e.data);
    }, false);

    worker.postMessage('Hello World'); 

    worker.addEventListener('message', function(e) {
        document.getElementById('result').textContent = e.data;
      }, false);
  
  } else {
    console.log('Your browser doesn\'t support web workers.');
  }