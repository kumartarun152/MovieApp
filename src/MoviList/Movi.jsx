import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Movi() {


  let  [movieData,setMovieData]=useState([])
    

  let [title,setTitle]=useState('')
     
    let getMovieList=()=>{
       
      let apiUrl;
      if(title!==''){
        apiUrl=`http://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=${title}`;

      }
       else{
          apiUrl=`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
       }
      
      axios.get(apiUrl)
          .then((res)=>{
           return res.data 
          })
          .then((finalRes)=>{
            setMovieData(finalRes.results)
           })
    }
    let getValue=(event)=>{
      setTitle(event.target.value)
    }
    useEffect(()=>{
      getMovieList()
    },[title])

  return (
    <div className=' max-w-[100%]  bg-slate-400'>
    <div className='mx-auto'>
      
      <h1 className='text-[40px] font-bold text-teal-950 mb-4 text-center'>Movie APP</h1>  
        <div className='max-w-[1320px] mx-auto mb-5'>
          <input value={title} onChange={getValue} type="text" className=' border-1 border-b-gray-900 w-[100%] h-14 py-4' placeholder='Search By TiTle' />
        </div>
      <div className='max-w-[1320px] mx-auto grid grid-cols-4 gap-4 py-4'>
        {
        movieData.length>=1  ?
        movieData.map((items)=>{
           return(
            <MovieItem items={items}/>
           )
        })
         
         :
         <div>No Data Found</div>
        }
        
        
        
      </div>
    </div>
    </div>
  )
}
function MovieItem({items}){
  let imagePath=`https://image.tmdb.org/t/p/w1280`
  return (
    <div className='shadow-lg'>
    <img src={imagePath+items.poster_path} alt="" />
    <div className='p-3'>
      <h3>
        {items.original_title}
      </h3>
      <h4>
      {items.release_date}
      </h4>
    </div>
  </div>
  )
}
