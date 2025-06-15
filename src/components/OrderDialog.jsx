"use client";
export default function OrderDialog({ cart, onClose, onConfirm }) {
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-[9999]">
            <div className="bg-white rounded-lg p-6 w-[500px] relative z-[10000] shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-lg font-bold"
                >
                    ×
                </button>
                <h2 className="text-center font-bold mb-4 text-xl">XÁC NHẬN ĐƠN HÀNG</h2>
                <table className="w-full text-sm mb-4">
                    <thead>
                        <tr className="text-left font-semibold border-b">
                            <th>Tên</th>
                            <th>Size</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.name}</td>
                                <td>{item.size}</td>
                                <td>{item.quantity}</td>
                                <td>{(item.price * item.quantity).toLocaleString()}Đ</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                        + Thêm khuyến mãi
                    </span>
                    <span className="font-semibold text-base">
                        Tổng tiền: {total.toLocaleString()}Đ
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                        onClick={onClose}
                        className="w-full py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Huỷ
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full py-2 bg-[#f1e7d3] hover:bg-[#e0d6c1] rounded font-semibold"
                    >
                        Xác nhận đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
}
