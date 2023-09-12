import SEO from "@/components/SEO";
import UserCard from "@/components/UserCard";

export default function Custom404() {

  return (
    <>
      <SEO pageTitle={''} />
      <div className="flex flex-col items-center mb-4 rounded-md shadow-md bg-theme_light-bg-current text-theme_light-text-current py-32">
        <h2 className=" text-lg font-semibold tracking-widest mb-4">404 - Page Not Found</h2>
        <div className=" text-center text-sm tracking-wider leading-6">
          ページが見つかりませんでした。<br />
          URL等をお確かめの上、再度お試しください。
        </div>
      </div>
      <UserCard />
    </>
  ) 
}