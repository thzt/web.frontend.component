(function(global){

    global.DagDriver=DagDriver;

    function DagDriver(){
        var instance=this;

        instance.adjacentArray={};
    }

    DagDriver.prototype.edge=function(opt){
        var instance=this,
            adjacentArray=instance.adjacentArray,
            
            from=opt.from,
            to=opt.to,
            action=opt.action;

        if(adjacentArray[from]==null){
            adjacentArray[from]=[opt];
            return this;
        }
        
        adjacentArray[from].push(opt);
        return this;
    };

    DagDriver.prototype.drive=function(from,to){
        var instance=this,
            adjacentArray=instance.adjacentArray;

        if(to==null){
            adjacentArray[from].forEach(function(item){
                item.action();
            });

            return this;
        }

        adjacentArray[from].filter(function(item){
            return item.to===to;
        }).forEach(function(item){
            item.action();
        });

        return this;
    };

}(window));