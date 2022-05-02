import {TypeState,TypeInfCardState} from './types'

interface TypeAction{

    type:string,
    data:TypeInfCardState[],
    message:string,
    id:number,
    next:boolean,
    show:boolean,
    showLiked:boolean
    
}

const intialState={

    page:1,
    infCards:[],
    error:"",
    maxpage:1,
    maxLikedPage:1,
    likedCards:[],
    showLiked:false,
   
}



const reducer=(state:TypeState=intialState,action:TypeAction)=>{
    switch(action.type){

        case "LOAD_DATA":
            { 
                    let array=action.data.map((item: any,index:number)=>{
                        let release:string;
                        
                        if(item.release.au!==null) release=item.release.au;
                        else  if(item.release.eu!==null) release=item.release.eu;
                        else  if(item.release.jp!==null) release=item.release.jp;
                        else  if(item.release.na!==null) release=item.release.na;
                        else release='нет данных';
 
                        return { 

                            amiiboSeries:item.amiiboSeries,
                            character: item.character,
                            gameSeries:item.gameSeries,
                            name:item.name,
                            image:item.image,
                            id:index,
                            release:release,
                            liked:false,
                            deleted:false

                        };

                });

                return {

                    ...state,
                     infCards:array,
                     error:"",
                    maxpage:Math.ceil(action.data.length/8)}

             }
           
        case "ERROR": {

                return {

                    ...state,
                    error:action.message

                }
            }

        case "TOGGLE_LIKE":{

            let likedArray:TypeInfCardState[]=[];
            let array=state.infCards.map((item:TypeInfCardState,index:number)=>{

                 if (index===action.id)
                {

                    if (item.liked===false)
                    
                    likedArray.push({...item,liked:!item.liked});
                   
                    return {

                    ...item,
                    liked:!item.liked

                    }
                        
                } else {

                    if ((item.liked===true)&&(item.deleted===false)){

                        likedArray.push(item);

                    }
                           
                    return item;}
 
            });

                let currentPage=state.page;
                    
                if ((currentPage!==1)&&(currentPage>Math.ceil(likedArray.length/8))
                &&( action.showLiked===true)) currentPage--;
 
                return {

                    ...state,infCards:array,
                    likedCards:likedArray,
                     page:currentPage,
                     maxLikedPage:Math.ceil(likedArray.length/8)

                }
        }
                
                case "DELETE_CARD":{

                    let newLength:number=0;
                    let likedArray:TypeInfCardState[]=[];
                    let array=state.infCards.map((item:TypeInfCardState,index:number)=>{
                        if (index===action.id){

                        return {

                            ...item,
                            deleted:true

                           }
                        } else {

                            if ((item.liked===true)&&(item.deleted===false))

                                likedArray.push(item);

                            if (item.deleted===false) newLength++;

                        return item;

                        }
     
                    });

                     
                     let currentPage=state.page;
                     
                     if ((currentPage!==1)&&(currentPage>Math.ceil(newLength/8))
                     &&( action.showLiked===false)) currentPage--;

                     if ((currentPage!==1)&&(currentPage>Math.ceil(likedArray.length/8))
                     &&( action.showLiked===true)) currentPage--;
                     
                     return {
                        ...state,
                        infCards:array,
                        likedCards:likedArray,
                        page:currentPage,
                        maxpage:Math.ceil(newLength/8),
                        maxLikedPage:Math.ceil(likedArray.length/8)
                    }
                }

                case "CHANGE_PAGE":{ 

                    if(action.next===true)
                    {
                        if(state.page<state.maxpage)

                            return{...state,page:state.page+1}

                         else return{...state}
                    } else {

                        if (state.page>1)
                            return{...state,page:state.page-1}
                        else return{...state}
                    }

                }

                case "LIKED_CARDS":{ 
                   
                    if (action.show===true)

                        return{

                            ...state,
                            showLiked:action.show,
                            page:1,

                        }

                    else return{

                        ...state,
                        showLiked:action.show,page:1

                    }

                }

            default:
            return state;

    }
}

export default reducer