var Core = function (params) {
    this.configFile='config.json';
  
        console.debug = function () {
            if (params && params.debug) console.log.apply(this, arguments);
            else return;
            
        };
    
    
}

Core.prototype = {
    constructor:Core,
    installModules:function(callback){
    // Adding the script tag to the head as suggested before
    return new Promise(function(resolve){
        this.__loadJSON(function(response){
            this.config = JSON.parse(response);
            console.debug('Config loaded !');
            var promises = [];
            return resolve(this.__loadJs(this.config.scripts,callback));
        }.bind(this));
    }.bind(this))
    
    

    },
     insertAfter:function(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    },
    __loadJs:function(files, after) { 
        var _this=this; 
        _this.files = files;
        _this.js = [];
        _this.head = document.getElementsByTagName("head")[0];
        _this.after = after || function(){};
        _this.loadStyle = function(file) {
          var link = document.createElement("link");
          link.rel = "stylesheet";
          link.type = "text/css";
          link.href = file;
          _this.head.appendChild(link);
        };
        _this.loadScript = function(i) {
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = _this.js[i];
          var loadNextScript = function() { 
            if (++i < _this.js.length) _this.loadScript(i);  
            else {
                _this.after();
                return Promise.resolve(true);
            }  
            };  
          script.onload = function() { loadNextScript() };
          _this.head.appendChild(script);
          
        }  
        for (var i=0;i<_this.files.length;i++) {  
          if (/\.js$|\.js\?/.test(_this.files[i])) _this.js.push(_this.files[i])
          if (/\.css$|\.css\?/.test(_this.files[i])) _this.loadStyle(_this.files[i])
        }
        if (_this.js.length>0) _this.loadScript(0);  
        else _this.after();
      },
    
    __loadJSON(callback) {   
        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', this.configFile, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
     }
}