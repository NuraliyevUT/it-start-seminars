const CustomTable = ({ headers = [], data = [], onEdit, onDelete, dataKeys = [], showDelete = true }) => {
    return (
      <div className="overflow-x-auto shadow-md rounded-2xl">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-600">
          <thead className="bg-gray-100 border-b">
            <tr>
              {headers?.map((header, index) => (
                <th key={index} className="px-4 py-3 text-gray-700 font-medium border-r last:border-r-0">
                  {header}
                </th>
              ))}
              <th className="px-4 py-3 text-gray-700 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                {dataKeys?.map((key, idx) => (
                  <td key={idx} className="px-4 py-2 border-r last:border-r-0 text-gray-700">
                    {key === "photo" ? (
                      <img
                        src={item[key]}
                        alt="Seminar"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      item[key] !== undefined ? item[key] : "N/A"
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 flex items-center space-x-2">
                  <button
                    className="px-2 py-1 text-green-600 border border-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  {showDelete && (
                    <button
                      className="px-2 py-1 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition"
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CustomTable;
  