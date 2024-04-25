import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
        <div>
            Upcoming deadlines
        </div>
        <div>
            <div>Gamification scores</div>
            <div>My Tasks</div>
        </div>
    </div>
  )
}

export default page