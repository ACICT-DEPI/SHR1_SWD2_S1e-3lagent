const searchIntialState = {
    Search:"",
    Category:"",
    filterQuery:""
  
  }
  
  
  
  const filterReducer = (state =searchIntialState ,action) =>{
  
      switch(action.type)
      {
          case "SET_SEARCH_VALUE" :
              return {...state ,Search:action.payload}
          
          case "SET_CATEGORY_VALUE" :
              return {...state ,Category:action.payload}

         
              
          case "CLEAR" :
              return {Category:"",Search:"",filterQuery:""}
  
                  
              
          default :
          return state
      }
  }
  
  export  default filterReducer;
  
  