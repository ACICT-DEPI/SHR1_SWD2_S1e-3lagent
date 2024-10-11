const userIntialState = {
    loading:false,
    user:{ 
        Role:"user",
        image:"null"
    },
    error:{}

}


const userReducer = (state =userIntialState ,action) =>{
    console.log(action.payload,"payload")

    switch(action.type)
    {
        case "FETCHING_API" :
            return {...state ,loading:true}
        case "FETCHING_SUCCESS" :
            return {
                loading:false,
                user:action.payload,
                error:null

            }
         case "FETCHING_FAILED" :
                return {
                    loading:false,
                    user:null,
                    error:action.payload,
    
                }
        case " Update_User_Stored":
            return {
                loading:false,
                user:action.payload,
                error:null,

            }

        default :
        return state
    }
}

export  default userReducer;

