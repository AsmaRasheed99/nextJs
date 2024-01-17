import Link from 'next/link'
import Image from 'next/image';
export default function NotFound() {
  return (
    <div className='flex flex-col items-center h-screen '>
      <Image
      className='lg:my-32'
        src="/images/404.png" // Path to your image inside the public directory
        alt="Sample Image"
        width={500}
        height={300}
      />

      <p className='text-xl'>Could not find requested resource</p>
      <Link className='text-blue-600 font-bold' href="/">Return Home</Link>
    </div>
  )
}
