export const fetchData=()=>{

    return (dispatch:any)=>{

        return fetch("https://amiiboapi.com/api/amiibo/?gameseries=Super%20Mario")
        .then((data)=>data.json())
        .then((json)=>dispatch({type:"LOAD_DATA", data:json.amiibo, message:""}))
        .catch((error:any)=>
        {
            dispatch({type:"ERROR",data:[], message:"No data"})
        })
      
    }
}

export const toggleLike=(id:number,showLiked:boolean)=>{

    return{

        type: "TOGGLE_LIKE",
        id:id,
        showLiked:showLiked

    }
}

    export const deleteCard=(id:number,showLiked:boolean)=>{

        return{

            type: "DELETE_CARD",
            id:id,
            showLiked:showLiked

        }
    }

    export const changePage=(next:boolean)=>{

        return{

            type: "CHANGE_PAGE",
            next:next

        }
    }

    export const ShowLiked=(show:boolean)=>{

        return{
            
            type: "LIKED_CARDS",
            show:show
           
        }
    }


