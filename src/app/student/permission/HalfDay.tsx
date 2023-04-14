import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

export default function HalfDay() {
  return (
    <div className="mt-5">
      <form>
        <div>
          <h4 className="text-lg text-[#525252] font-medium mt-5">Kategori</h4>

          <select className="w-full bg-white py-2 px-5 rounded">
            <option value="">Sakit</option>
            <option value="">Izin</option>
          </select>
        </div>

        <div>
          <h4 className="text-lg text-[#525252] font-medium mt-5">Alasan</h4>
          <textarea className="w-full h-20 rounded py-2 px-5 text-sm"></textarea>
        </div>

        <div>
          <h4 className="text-lg text-[#525252] font-medium mt-5">Upload Surat Izin</h4>

          <button type="button" className="bg-white flex gap-5 py-2 px-5 w-full rounded">
            <ArrowUpTrayIcon width={24} />
            <span>Tambah File</span>
          </button>
        </div>
      </form>
    </div>
  );
}
