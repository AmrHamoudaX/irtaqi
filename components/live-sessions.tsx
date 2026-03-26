import Image from "next/image";
import emptyContent from "../public/empty_content.svg";

export function LiveSessions() {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-xl font-bold text-gray-800"> Live Sessions </h2>
      </div>
      <div className="bg-white rounded-xl p-8 md:p-12 flex flex-col items-center justify-center border border-gray-100 shadow-sm text-center w-full">
        <div className="size-35 md:size-45 rounded-full flex items-center justify-center mb-4">
          <Image src={emptyContent} alt="Empty Content" />
        </div>
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">
          You have no live sessions now
        </h3>
        <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md text-sm hover:bg-gray-50">
          View Sessions
        </button>
      </div>
    </section>
  );
}
