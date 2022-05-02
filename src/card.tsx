import React, {Component} from 'react';
import './card.css';
import { connect } from 'react-redux'
import { fetchData } from './actions'
import {AppDispatch} from './index'
import {TypeState,TypeInfCardState} from './types'

interface PropsCard{

    data:TypeInfCardState,
    like:(id:number,show:boolean)=>AppDispatch,
    delete:(id:number,show:boolean)=>AppDispatch,
    showLiked:boolean,

}


class Card extends React.Component<PropsCard> {


    render(){

        let date:Date=new Date(this.props.data.release);
        let dateMonth = String(date.getMonth() + 1).padStart(2, '0');
        let dateYear=String(date.getFullYear());

        switch(dateMonth){
            case '01':
                dateMonth="январь";
                break;
            case '02':
                dateMonth="февраль";
                break;
            case '03':
                dateMonth="март";
                break;
            case '04':
                dateMonth="апрель";
                break;
            case '05':
                dateMonth="май";
                break;
            case '06':
                dateMonth="июнь";
                break;
            case '07':
                dateMonth="июль";
                break;
            case '08':
                dateMonth="август";
                break;
            case '09':
                dateMonth="сентябрь";
                break;
            case '10':
                dateMonth="октябрь";
                break;
            case '11':
                dateMonth="ноябрь";
                break;
            case '12':
                dateMonth="декабрь";
                break;
            default:
                dateMonth="Ошибка";               
                
        };

        
        return(
            <div className='Card'>

                <div className='CardPicture'>

                    <img  src={this.props.data.image}></img>

                </div>

                <div className='PanelButton'>

                    <img   src={(this.props.data.liked===true)?
                    require('./buttonsIcons/like_selected.png')
                    : require('./buttonsIcons/like.png')}
                onClick={this.props.like.bind(this,this.props.data.id,this.props.showLiked)}
                style={{padding:'0px',height:'auto'}}>
                    </img>

            
                    <div style={{alignSelf:'center',marginLeft: 'auto',marginRight: 'auto'}}>
                        {this.props.data.character}
                    </div>

                    <img src={require('./buttonsIcons/delete.png')} 
                    onClick={this.props.delete.bind(this,this.props.data.id,this.props.showLiked)} 
                    style={{padding:'0px',height:'100%'}}>
                    </img>

                </div>

                <div className='PanelInform'>
                    <p>Серия амиибо:{this.props.data.amiiboSeries}</p>
                    <p>Дата выхода: {dateMonth} {dateYear}</p>
                </div>

            </div>
        )
    }
}

export default Card
