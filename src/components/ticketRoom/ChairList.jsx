import React from 'react'
import Chair from './Chair'

const ChairList = (props) => {

    const {chair} = props;
  return (
    <div className='px-1 lg:px-10 mx-auto lg:ml-5' >
            {chair?.map(item => {
                return <Chair key={item.maGhe} chairItem={item} />
            })}
    </div>
  )
}

export default ChairList