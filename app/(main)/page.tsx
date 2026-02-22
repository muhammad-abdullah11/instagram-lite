import AsideBar from "@/Components/AsideBar";
import Posts from "@/Components/Posts";
import Stories from "@/Components/Stories";

export default function Home() {
  return (
    <div className=" flex w-full h-full md:gap-4 overflow-hidden">
      <section className="w-full md:w-2/3 ">
      <Stories/>
      <Posts/>
      </section>
      <section className="hidden md:flex w-1/3 border-l border-l-zinc-700">
        <AsideBar/>
      </section>
    </div>
  );
}
