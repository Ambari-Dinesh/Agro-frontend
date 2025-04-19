const OrderCard = ({ data, onCancel }) => {
    const {
        id,
        address,
        buyer_name,
        contact,
        product_name,
        product_price,
        quantity,
        status,
        image_url,
    } = data;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl p-4 bg-white rounded-xl shadow-md flex items-center space-x-6 my-4">
                <img
                    src={image_url}
                    alt={product_name}
                    className="h-28 w-28 object-cover rounded-md border"
                />

                <div className="flex flex-col space-y-1 flex-grow">
                    <h2 className="text-xl font-semibold">{product_name}</h2>
                    <p className="text-sm text-gray-700"><span className="font-medium">Buyer:</span> {buyer_name}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium">Contact:</span> {contact}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium">Address:</span> {address}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium">Quantity:</span> {quantity}</p>
                    <p className="text-sm text-gray-700"><span className="font-medium">Price:</span> ₹{product_price}</p>
                    <p className={`text-sm font-medium ${status === "Delivered" ? "text-green-600" : "text-yellow-600"}`}>
                        Status: {status}
                    </p>

                    {status !== "Delivered" && (
                        <button
                            className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 w-fit"
                            onClick={() => onCancel(id)}
                        >
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
