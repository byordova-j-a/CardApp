import React from 'react';
import './App.css';
import { connect } from 'react-redux'
import { fetchData,changePage,toggleLike,ShowLiked,deleteCard } from './actions'
import Card from './card'
import {TypeState,TypeInfCardState} from './types'


class App extends React.Component<any> {
  
    componentDidMount(){  
      this.props.onFetchData();
   
    }   
  
  ShowCards(array:TypeInfCardState[],param:boolean,maxpage:number){

    let num1=-1;
    let num2=-1;
    let backVisible:string=(this.props.page===1)?'none':'flex';

    let forwardVisible:string=((this.props.page===maxpage)||(maxpage===0))?'none':'flex';

    return(

      <React.Fragment>
        <div className='Header'>
 
          <div className='ToggleLiked'
            onClick={this.props.onShowLiked.bind(this,param)} 
            style={{float:'left',paddingLeft:'5px'}}>

            <img  style={{  width:"30%"}}  height={'100%'} 
            src={(param===true)? require('./buttonsIcons/like_selected.png'):
            require('./buttonsIcons/like.png')}/>

            <div style={{alignSelf: 'center', width:"50%",paddingLeft:'20px'}} >
              {(param===true)? 'Избранное':'Все карточки'}
            </div>

          </div>

          <div className='Navigate'>

            <div className='Back'
            style={{display:backVisible}}
            onClick={this.props.onChangePage.bind(this,false)}>
            {String.fromCharCode(5130)}
            </div>

            <div className='NumberPage'>
              {this.props.page}
            </div>

            <div className='Forward'
            style={{display:forwardVisible}} 
            onClick={this.props.onChangePage.bind(this,true)}>
                {String.fromCharCode(5125)}
            </div>

          </div>
        
          <div className='Title'> 
             Amiibo Super Mario Bros
          </div> 
        
        </div>

        <div className='CardsArea'>
        
          <div className='CardsRow'>
            {array.map((item:TypeInfCardState)=>{ 

              if (item.deleted===false){
              
                num1++;
                  if ((num1<this.props.page*8-4)
                  &&((this.props.page-1)*8<=num1)){

                      return (

                        <Card key={item.id} data={item} 
                        like={this.props.onToggleLike.bind(this)} 
                        showLiked={!param}
                        delete={this.props.onDeletedCard.bind(this)}/>
                        )
                  }
                }
              }
            )}

          </div>

          <div className='CardsRow'>
            {array.map((item:TypeInfCardState,index:number)=>{ 
                if (item.deleted===false){ 
                  num2++;
          
                  if ((num2<this.props.page*8)
                  &&((this.props.page)*8-4<=num2)){
                    
                    return(

                      <Card key={item.id} data={item} 
                      like={this.props.onToggleLike.bind(this)} 
                      showLiked={!param}
                      delete={this.props.onDeletedCard.bind(this)}/>
                    )
                  }
                }
              }
            )}

          </div>
        </div>
    </React.Fragment>
    )
  

  }





  render(){
    
    if( this.props.showLiked===false){
      
      return ( 
        <React.Fragment>
          {this.ShowCards.call(this,this.props.infCards,true,this.props.maxpage)}
        </React.Fragment>
      );
    }

    if( this.props.showLiked===true){
      
      return(
        <React.Fragment>
          {this.ShowCards.call(this,this.props.likedCards,false,this.props.maxLikedPage)}
          </React.Fragment>
      );
    }
    
  }

}

const mapStateToProps=(state:TypeState)=>{

  return{

    page:state.page, 
    infCards:state.infCards,
    error:state.error,
    maxpage:state.maxpage,
    likedCards:state.likedCards,
    showLiked:state.showLiked,
    maxLikedPage:state.maxLikedPage

  }

}

const mapDispatchprops = (dispatch:any) => {
  return { 

    onFetchData: () => dispatch(fetchData()),
    onChangePage: (next:boolean)=> dispatch(changePage(next)),
    onToggleLike: (id:number,showLiked:boolean)=>dispatch(toggleLike(id,showLiked)),
    onShowLiked:(show:boolean)=>dispatch(ShowLiked(show)),
    onDeletedCard: (id:number,showLiked:boolean)=>dispatch(deleteCard(id,showLiked))
    
  }
}

export default connect(mapStateToProps,mapDispatchprops)(App);
