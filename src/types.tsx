export interface TypeInfCardState{

  amiiboSeries:string,
  character:string,
  gameSeries:string,
  name:string,
  image:string,
  id:number,
  liked:boolean,
  deleted:boolean
  release:string

}
export interface TypeState{

  page:number,
  infCards:TypeInfCardState[],
  likedCards:TypeInfCardState[],
  error:string,
  maxpage:number,
  showLiked:boolean,
  maxLikedPage:number;
  
}