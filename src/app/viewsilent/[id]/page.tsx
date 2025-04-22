"use server";

import ViewCards from "@/components/ViewCards";

export default async function Page(params: { params: { id: string } }) {
  const { id } = await params.params;
  // const data = await res.json();

  return (
    <div className="bg-[url(/asset/background.jpg)] bg-fixed bg-cover bg-no-repeat bg-center" tabIndex={-1}>
      <div className="flex flex-col items-center justify-center px-4 py-16 backdrop-blur-md backdrop-brightness-50">
        <h1 className="text-4xl font-bold mt-16 mb-8">谷聲回響</h1>
        <p className="text-lg mb-8">讓彼此的回聲在此共鳴。</p>
        <div className="my-8 w-full md:w-3/4">
          <ViewCards cardType="silent" id={parseInt(id, 10)} isReply/>
        </div>
      </div>
    </div>
  );
}