import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Adsense: React.FC = () => {
  const { asPath } = useRouter()
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.log(err)
    }
  }, [asPath])

  return (
    <div className="w-full mb-3 bg-white rounded-lg  shadow-card md:mx-auto">
      <div className="flex flex-col items-start p-3">
        <h5 className='text-sm'>広告</h5>
          <ins className='block w-full adsbygoogle'
          data-ad-format='auto'
          data-ad-client='ca-pub-7271400990150352'
          data-ad-slot='4743939808'
          data-full-width-responsive='true'
        />
      </div>
    </div>
  )
}
export default Adsense