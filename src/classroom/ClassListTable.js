export default function ClassListTable({ name, status, absen }) {
  return (
    <tbody>
      <tr className="border-2">
        <td className="border-2 px-7 py-3 text-center font-bold text-gray-500">
          {absen}
        </td>
        <td className="border-2 px-7 py-3 text-lg uppercase text-gray-500">
          {name}
        </td>
        <td className="border-2 px-7 py-3 font-bold text-gray-500">{status}</td>
      </tr>
    </tbody>
  );
}
