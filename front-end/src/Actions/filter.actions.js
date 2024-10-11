const SET_SEARCH_VALUE= "SET_SEARCH_VALUE"
const SET_CATEGORY_VALUE= "SET_CATEGORY_VALUE"
const CLEAR= "CLEAR"

exports.setSearchValue = (value) =>{
    return{
        type:SET_SEARCH_VALUE,
        payload :value
    }
} 
exports.setCategoryValue = (value) =>{
    return{
        type:SET_CATEGORY_VALUE,
        payload :value
    }
} 

exports.Clear = () =>{
    return{
        type:CLEAR,
        payload :""
    }
} 