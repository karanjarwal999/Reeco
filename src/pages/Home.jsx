import React, { useEffect } from 'react'
import ShowItems from '../components/ShowItems'
import DummyOrderUI from '../components/Dummy/DummyOrderUI'
import { getItems } from '../redux/dataFunctions'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
  const dispatch = useDispatch()
  const items = useSelector((store)=>store.items)
  console.log(items)

  useEffect(()=>{
    dispatch(getItems)
  },[])
  return (
    <div>
      <DummyOrderUI />
      <ShowItems />
    </div>
  )
}

export default Home
