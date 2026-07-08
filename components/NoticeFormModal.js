export default function NoticeFormModal({
  isOpen,
  onClose,
  editNoticeId,
  formData,
  formError,
  submitting,
  onInputChange,
  onSubmit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-none border border-zinc-200 w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden transform scale-100 transition-all duration-300">
        <div className="px-6 py-4 bg-white border-b border-zinc-200 flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 font-sans">
            {editNoticeId ? 'Edit Announcement' : 'Create New Notice'}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-950 p-1 transition-colors hover:bg-zinc-50 border border-transparent hover:border-zinc-200 rounded-none"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto font-sans">
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-none font-mono font-medium">
                Error: {formError}
              </div>
            )}

            <div>
              <label htmlFor="title" className="block text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                placeholder="Short summary of notice"
                className="w-full border border-zinc-300 bg-white rounded-none px-3.5 py-2 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-sans text-zinc-900"
                required
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Content / Body <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={onInputChange}
                rows="4"
                placeholder="Provide details about the notice here..."
                className="w-full border border-zinc-300 bg-white rounded-none px-3.5 py-2 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all whitespace-pre-wrap font-sans text-zinc-900"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={onInputChange}
                  className="w-full border border-zinc-300 rounded-none px-3 py-2 text-sm bg-white focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all cursor-pointer text-zinc-900"
                >
                  <option value="General">General</option>
                  <option value="Exam">Exam</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4 py-2">
                  <label className="flex items-center text-xs font-bold text-zinc-800 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="Normal"
                      checked={formData.priority === 'Normal'}
                      onChange={onInputChange}
                      className="w-4 h-4 accent-zinc-900 border-zinc-300 mr-2 cursor-pointer"
                    />
                    Normal
                  </label>
                  <label className="flex items-center text-xs font-bold text-red-600 cursor-pointer">
                    <input
                      type="radio"
                      name="priority"
                      value="Urgent"
                      checked={formData.priority === 'Urgent'}
                      onChange={onInputChange}
                      className="w-4 h-4 accent-red-650 border-zinc-300 mr-2 cursor-pointer"
                    />
                    Urgent
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="publishDate" className="block text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="publishDate"
                name="publishDate"
                value={formData.publishDate}
                onChange={onInputChange}
                className="w-full border border-zinc-300 bg-white rounded-none px-3.5 py-2 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all cursor-pointer text-zinc-900 font-sans"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Image URL <span className="text-[9px] text-zinc-400 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={onInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-zinc-300 bg-white rounded-none px-3.5 py-2 text-sm focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-sans text-zinc-900"
              />
            </div>
          </div>

          <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-bold uppercase border border-zinc-300 bg-white hover:bg-zinc-50 hover:border-zinc-400 text-zinc-700 rounded-none transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-mono font-bold uppercase bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-950 rounded-none transition-colors disabled:bg-zinc-400 flex items-center gap-1.5"
            >
              {submitting && (
                <div className="animate-spin rounded-full h-3 w-3 border-2 border-white border-t-transparent"></div>
              )}
              {editNoticeId ? 'Save Changes' : 'Post Announcement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
