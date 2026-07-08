export default function NoticeCard({ notice, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div 
      className={`rounded-none border p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-sm ${
        notice.priority === 'Urgent' 
          ? 'bg-red-50/30 border-red-200 border-l-4 border-l-red-600 hover:border-red-400' 
          : 'bg-white border-zinc-200 hover:border-zinc-400 border-t-2 ' + (
              notice.category === 'Exam' ? 'border-t-purple-600' : 
              notice.category === 'Event' ? 'border-t-emerald-600' : 
              'border-t-zinc-900'
            )
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
          <span className={`px-1.5 py-0.5 border text-[9px] ${
            notice.category === 'Exam' ? 'bg-purple-50 text-purple-700 border-purple-200' :
            notice.category === 'Event' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            'bg-zinc-50 text-zinc-600 border-zinc-200'
          }`}>
            {notice.category}
          </span>
          <span>{formatDate(notice.publishDate)}</span>
        </div>

        <div className="flex gap-4 items-start justify-between min-h-[90px]">
          <div className="flex-1">
            <h3 className="text-sm font-bold text-zinc-900 leading-snug tracking-tight mb-1.5 line-clamp-2">
              {notice.title}
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed line-clamp-4">
              {notice.body}
            </p>
          </div>

          {notice.image && (
            <div className="w-20 h-20 shrink-0 border border-zinc-200 bg-zinc-50 overflow-hidden rounded-none">
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
        </div>
      </div>


      <div className="pt-3 border-t border-dashed border-zinc-200 flex items-center justify-between mt-4">
        <div>
          {notice.priority === 'Urgent' ? (
            <span className="bg-red-600 text-white border border-red-200 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-none uppercase tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
              Urgent Notice
            </span>
          ) : (
            <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Standard Release
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(notice)}
            className="text-zinc-400 hover:text-zinc-900 p-1.5 border border-transparent hover:border-zinc-200 hover:bg-zinc-50 rounded-none transition-colors"
            title="Edit Notice"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
          </button>
          <button 
            onClick={() => onDelete(notice.id)}
            className="text-zinc-400 hover:text-red-600 p-1.5 border border-transparent hover:border-zinc-200 hover:bg-zinc-50 rounded-none transition-colors"
            title="Delete Notice"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
