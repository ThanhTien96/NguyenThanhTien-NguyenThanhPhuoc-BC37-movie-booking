import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Carousel from '../../components/home/Carousel'
import Cinema from '../../components/home/cinema/Cinema'
import MoviesList from '../../components/home/MoviesList'
import { fetchApiMoviesSchedule, getBannerApi, getMoviesApi } from '../../redux/reducers/booking/bookingSlice'
import AppFeature from './appFeature/AppFeature'
import News from './news/News'


const Home = (props) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBannerApi);
    dispatch(getMoviesApi);
    dispatch(fetchApiMoviesSchedule);
  },[])


  return (
    <div>
        <Carousel/>
        <MoviesList/>
        <Cinema />
        <News/>
        <AppFeature/>
    </div>
  )
}

export default Home