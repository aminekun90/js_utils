

module.exports =  {
    init:function()
    {
        Object.prototype.isEmpty = this.__isEmpty;
    },
    __isEmpty:function() {
        for(var key in this) {
            if(this.hasOwnProperty(key))
                return false;
        }
        return true;
    },
};