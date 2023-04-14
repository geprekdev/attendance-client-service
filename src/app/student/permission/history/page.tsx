import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function page() {
  return (
    <div className="max-w-[444px] min-h-screen mx-auto bg-[#EBEBFF] relative">
      <div className="bg-[#1F1F7A] w-full py-3 px-5 flex gap-3 items-center">
        <Link href="/student" className="p-2">
          <ArrowLeftIcon width={24} className="text-[#F5F5F5]" />
        </Link>
        <h2 className="text-[#F5F5F5] font-semibold">Riwayat Perizinan</h2>
      </div>

      <div className="mt-7 px-5">
        <div className="bg-[#FAFAFA] rounded-3xl p-5 mt-4">
          <p className="text-gray-500 font-light">7 Desember 2022</p>
          <div className="mt-1">
            <h3 className="font-semibold text-[#525252] text-xl">Sakit</h3>

            <div className="bg-white rounded-2xl p-2">
              <table>
                <tbody>
                  <tr>
                    <td className="text-gray-500 font-light w-1/2">Jenis Izin</td>
                    <td className="font-light text-gray-700">Full Day</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 font-light w-1/2">Status</td>
                    <td className="font-light text-gray-700">Blm. Dikonfirmasi</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="bg-[#FAFAFA] rounded-3xl p-5 mt-4">
          <p className="text-gray-500 font-light">8 Desember 2022</p>
          <div className="mt-1">
            <h3 className="font-semibold text-[#525252] text-xl">Keperluan Sekolah</h3>

            <div className="bg-white rounded-2xl p-2">
              <table>
                <tbody>
                  <tr>
                    <td className="text-gray-500 font-light w-1/3">Jenis Izin</td>
                    <td className="font-light text-gray-700 w-1/2">Half Day</td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 font-light w-1/3">Mapel Izin</td>
                    <td className="flex gap-3 flex-wrap w-full">
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>{' '}
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>{' '}
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>{' '}
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>{' '}
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>{' '}
                      <button disabled className="py-1 px-3 outline outline-gray-500 rounded-full">
                        PDS
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-gray-500 font-light w-1/3">Status</td>
                    <td className="font-light text-gray-700 w-1/2">Diterima</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
