import Link from 'next/link';

export default ({ toc }: any) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-card md:mx-auto mb-3 w-full">
      <div className="flex flex-col items-start p-3">
        <h5 className='text-sm'>もくじ</h5>
        <ul className='list-inside'>
          {toc.map((data: any, index: any) => (
            <li key={index} className='flex list-disc text-sm font-bold bg-white mt-2 transition-all text-nicoblack hover:text-themepurple'>
              <a href={`#${data.id}`}>
                {data.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}