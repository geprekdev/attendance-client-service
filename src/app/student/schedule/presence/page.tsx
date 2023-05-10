import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="bg-[#1F1F7A] w-full py-3 px-5 flex gap-3 items-center">
        <Link href="/student/schedule" className="p-2">
          <ArrowLeftIcon width={24} className="text-[#F5F5F5]" />
        </Link>
        <h2 className="text-[#F5F5F5] font-semibold">Presence</h2>
      </div>

      <div className="px-5 pt-7">
        <div className="bg-white p-5 rounded-3xl">
          <div className="mx-auto h-72 w-fit">
            <Image src="/presence-illustrations.png" width={300} height={0} alt="Icon" />
          </div>
        </div>

        <form className="mt-10">
          <div className="mt-3">
            <select className="w-full bg-white py-2 px-5 rounded-lg">
              <option>PDS</option>
            </select>
          </div>
          <div className="mt-3">
            <input type="text" className="w-full bg-white py-2 px-5 rounded-lg" placeholder="Token Absen" />
          </div>
          <div className="mt-3">
            <textarea className="w-full h-32 bg-white py-2 px-5 rounded-lg" placeholder="Keterangan"></textarea>
          </div>

          <div className="mt-3">
            <button className="bg-[#1F1F7A] text-white font-semibold w-full py-4 block mx-auto rounded-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
