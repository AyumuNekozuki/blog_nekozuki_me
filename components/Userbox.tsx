import Link from 'next/link';
import { FaTwitter, FaGlobe, FaMastodon, FaGithub } from 'react-icons/fa';
import { SiNiconico } from 'react-icons/si';

export default function Userbox() {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-card md:mx-auto mb-3 w-full">
      <div className="flex flex-col items-center p-3">
        <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="/img/icon_500x500.png" alt="" />
        <h5 className="mb-2 text-xl font-medium text-nicoblack">猫月遥歩（ねこづきあゆむ）</h5>
        <span className="text-sm text-center text-gray-200">ニコ厨。動画投稿・生配信・大百科編集など、<br />ニコニコで幅広く活動するクリエイター。</span>
        <div className="flex mt-4 space-x-2 lg:mt-4">
          <a href="https://www.nekozuki.me" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center py-2 px-3 font-medium text-center text-nicoblack bg-blue-700 rounded-lg hover:bg-themepurple hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-purple-300"><FaGlobe /></a>
          <a href="https://twitter.com/nekozuki_2525" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center py-2 px-3 font-medium text-center text-nicoblack bg-blue-700 rounded-lg hover:bg-themepurple hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-purple -300"><FaTwitter /></a>
          <a href="https://mstdn.nekozuki.me/@ayumunekozuki" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center py-2 px-3 font-medium text-center text-nicoblack bg-blue-700 rounded-lg hover:bg-themepurple hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-purple -300"><FaMastodon /></a>
          <a href="https://www.nicovideo.jp/user/45048152" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center py-2 px-3 font-medium text-center text-nicoblack bg-blue-700 rounded-lg hover:bg-themepurple hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-purple-300"><SiNiconico /></a>
          <a href="https://github.com/AyumuNekozuki" target="_blank" rel="noopener noreferrer me" className="inline-flex items-center py-2 px-3 font-medium text-center text-nicoblack bg-blue-700 rounded-lg hover:bg-themepurple hover:text-white transition-all focus:ring-4 focus:outline-none focus:ring-purple -300"><FaGithub /></a>
        </div>
      </div>
    </div>
  );
}