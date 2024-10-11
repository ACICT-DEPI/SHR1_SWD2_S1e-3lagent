

class ApiFeatuer {
    constructor (query, queryBody)
    {
        this.query= query;
        this.queryBody = queryBody;
    }

    filter()
    {
          
       let  queryString = JSON.stringify(this.queryBody)
       queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

       const queryObj = JSON.parse(queryString);
     
       delete queryObj.sort
       delete queryObj.fields
       delete queryObj.page
       delete queryObj.limit
       delete queryObj.search
       
       this.query = this.query.find(queryObj)

        return this;
        
    }

    sort(){
        if(this.queryBody.sort)
        {
          
         
            // this.query = this.query.sort(this.queryBody.sort);
        }
        else{
            // this.query = this.query.sort({ createdAt: -1 })

        }
       
        return this;
    }
    search() {
        if (this.queryBody.search) {
            const searchTerm = this.queryBody.search;
    
           
            this.query = this.query.find({
                $or: [
                    { Name: { $regex: searchTerm, $options: "i" } } 
                   
                ]
            });
        }
        return this;
    }

    limitFields(){
        if(this.queryBody.fields)
        {
            const fields = this.queryBody.fields.split(",").join(" ")
            this.query = this.query.select(fields)
        }
        else{
            this.query = this.query.select("-__v")

        }
      
        return this
    }
    paginate(){
        const page = this.queryBody.page*1||1
        const limit = this.queryBody.limit*1||8
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}



module.exports = ApiFeatuer