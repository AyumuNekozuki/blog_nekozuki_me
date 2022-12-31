import Link from 'next/link';

export default function TableOfContents({ toc }: any) {
	console.log(toc)

  return (
    <div id='toc' className="w-full mb-3 bg-white rounded-lg shadow-card md:mx-auto">
      <div className="flex flex-col items-start p-3">
        <h5 className='text-sm'>もくじ</h5>
        <ul className='list-inside'>
          {toc.map((data: any, index: any) => (
            <li key={index} data-name={data.name} className='flex mt-2 text-sm font-bold list-disc transition-all bg-white text-nicoblack hover:text-themepurple'>
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