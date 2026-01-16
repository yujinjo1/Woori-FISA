import { CATEGORY_ICON } from '../../constants/categoryIcon';


function ExpenseModal({ isOpen, onClose, date, expenses  }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-80 rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b font-semibold">
          {date}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
            {expenses.map(item => (
    <div
        key={item.id}
        className="flex justify-between items-center text-sm"
    >
        <div className="flex items-center gap-2">
        <span>{CATEGORY_ICON[item.title]}</span>
        <span>{item.title}</span>
        </div>

        <span className="text-red-500">
        -₩{item.price.toLocaleString()}
        </span>
    </div>
    ))}

        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-3 text-sm bg-gray-100"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default ExpenseModal;
