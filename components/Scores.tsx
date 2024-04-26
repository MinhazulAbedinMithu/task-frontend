import Image from 'next/image'
import scoreImg from '../assets/scores.png';

type Props = {}

const Scores = (props: Props) => {
  return (
    <div className='flex flex-col items-center justify-center bg-rose-500 rounded-xl p-10 text-white'>
        <Image src={scoreImg} alt='score image' />
        <h1 className='text-4xl font-bold mt-3'>100</h1>
        <p className='text-lg'>points</p>
    </div>
  )
}

export default Scores