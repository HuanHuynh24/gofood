export default function MonAnList({ data, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="w-full table-auto">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Tên món ăn</th>
            <th className="p-2 border">Giá</th>
            <th className="p-2 border">SL đã bán</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.idMonan} className="hover:bg-gray-50">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{item.tenMonan}</td>
              <td className="p-2 border">{item.gia.toLocaleString()} đ</td>
              <td className="p-2 border">{item.soLuongDaBan}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.trangThai ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.trangThai ? "Đang bán" : "Ngừng bán"}
                </span>
              </td>
              <td className="p-2 border text-center space-x-2">
                <button onClick={() => onEdit(item)} className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded">Sửa</button>
                <button onClick={() => onDelete(item.idMonan)} className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Xoá</button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-400">Không có dữ liệu.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
