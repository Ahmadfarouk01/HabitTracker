import React from 'react';

const TodosProgress = ({ completed = 0, total = 0 }) => {
  const completedNum = Array.isArray(completed) ? completed.length : completed;
  const totalNum = Array.isArray(total) ? total.length : total;
  const percent = totalNum > 0 ? (completedNum / totalNum) * 100 : 0;

  return (
    <div className="mb-4">
      <p className="text-gray-700 mb-1">{`${completedNum} / ${totalNum} tasks completed`}</p>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-green-500 h-2 rounded transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};


export default TodosProgress;
