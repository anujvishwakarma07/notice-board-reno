export default function NoticeCard({ notice, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className={`bg-white rounded-none border flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
        notice.priority === 'Urgent' 
          ? 'border-red-200 border-l-4 border-l-red-600 hover:border-red-400 bg-red-50/10' 
          : 'border-zinc-200 hover:border-zinc-400'
      }`}
    >
      {notice.image && (
        <div className="h-44 w-full relative overflow-hidden bg-zinc-50 border-b border-zinc-200">
          <img 
            src={notice.image} 
            alt={notice.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="p-5 flex-grow">
        <div className="flex items-center gap-2 mb-3.5 flex-wrap">
          {notice.priority === 'Urgent' && (
            <span className="bg-red-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-none uppercase tracking-wide">
              Urgent
            </span>
          )}

          <span className={`border text-[9px] font-mono font-bold px-2 py-0.5 rounded-none uppercase ${
            notice.category === 'Exam' ? 'bg-purple-50 text-purple-700 border-purple-200' :
            notice.category === 'Event' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            'bg-zinc-50 text-zinc-600 border-zinc-200'
          }`}>
            {notice.category}
          </span>
        </div>

        <h3 className="text-base font-bold text-zinc-950 leading-snug tracking-tight">
          {notice.title}
        </h3>

        <p className="text-zinc-650 mt-2 text-sm leading-relaxed whitespace-pre-line line-clamp-4">
          {notice.body}
        </p>
      </div>

      <div className="px-5 py-3 bg-zinc-50/50 border-t border-zinc-200 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px] uppercase font-semibold">
          <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          {formatDate(notice.publishDate)}
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => onEdit(notice)}
            className="text-zinc-400 hover:text-zinc-950 p-1.5 rounded-none border border-transparent hover:border-zinc-200 hover:bg-white transition-colors duration-150"
            title="Edit Notice"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(notice.id)}
            className="text-zinc-400 hover:text-red-600 p-1.5 rounded-none border border-transparent hover:border-zinc-200 hover:bg-white transition-colors duration-150"
            title="Delete Notice"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
