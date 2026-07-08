import { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import NoticeCard from "../components/NoticeCard";
import NoticeFormModal from "../components/NoticeFormModal";
import Footer from "../components/Footer";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editNoticeId, setEditNoticeId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    category: 'General',
    priority: 'Normal',
    publishDate: '',
    image: ''
  });
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notices');
      if (!res.ok) throw new Error('Failed to fetch notices');
      const data = await res.json();
      setNotices(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load notices. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleOpenAddModal = () => {
    setEditNoticeId(null);
    setFormData({
      title: '',
      body: '',
      category: 'General',
      priority: 'Normal',
      publishDate: new Date().toISOString().split('T')[0],
      image: ''
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (notice) => {
    setEditNoticeId(notice.id);
    setFormData({
      title: notice.title,
      body: notice.body,
      category: notice.category,
      priority: notice.priority,
      publishDate: new Date(notice.publishDate).toISOString().split('T')[0],
      image: notice.image || ''
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    
    if (!formData.title.trim()) return setFormError('Title is required.');
    if (!formData.body.trim()) return setFormError('Body content is required.');
    if (!formData.publishDate) return setFormError('Publish date is required.');

    try {
      setSubmitting(true);
      
      const isEditing = editNoticeId !== null;
      const url = isEditing ? `/api/notices/${editNoticeId}` : '/api/notices';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }

      setShowModal(false);
      fetchNotices();
    } catch (err) {
      console.error(err);
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNotice = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/notices/${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete the notice.');
      }

      fetchNotices();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "All" || notice.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalNoticesCount = notices.length;
  const urgentCount = notices.filter(n => n.priority === 'Urgent').length;
  const examCount = notices.filter(n => n.category === 'Exam').length;
  const eventCount = notices.filter(n => n.category === 'Event').length;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 font-sans">
      <Head>
        <title>Reno Notice Board</title>
        <meta name="description" content="Keep up with the latest announcements, exams, and events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header onAddClick={handleOpenAddModal} />

      <main className="max-w-6xl mx-auto px-6 py-8 flex-grow w-full">
        
        {!loading && !error && notices.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-zinc-200 p-4 rounded-none">
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">Total Notices</p>
              <p className="text-xl font-bold mt-1 text-zinc-900">{totalNoticesCount}</p>
            </div>
            <div className="bg-white border border-zinc-200 p-4 rounded-none">
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">Urgent Alerts</p>
              <p className="text-xl font-bold mt-1 text-red-650">{urgentCount}</p>
            </div>
            <div className="bg-white border border-zinc-200 p-4 rounded-none">
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">Exams Listed</p>
              <p className="text-xl font-bold mt-1 text-purple-700">{examCount}</p>
            </div>
            <div className="bg-white border border-zinc-200 p-4 rounded-none">
              <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-wider">Events Scheduled</p>
              <p className="text-xl font-bold mt-1 text-emerald-700">{eventCount}</p>
            </div>
          </div>
        )}

        {!loading && !error && notices.length > 0 && (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex bg-zinc-200/50 p-1 border border-zinc-200 rounded-none self-start">
              {["All", "General", "Exam", "Event"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all rounded-none ${
                    selectedCategory === cat
                      ? "bg-white text-zinc-950 shadow-sm border border-zinc-200"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search announcements..."
                className="w-full border border-zinc-300 bg-white rounded-none px-3.5 py-2 text-xs font-sans focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all font-medium text-zinc-900"
              />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="border border-zinc-200 bg-white rounded-none px-5 py-3 font-mono text-xs font-bold uppercase flex items-center gap-2.5 shadow-sm text-zinc-600">
              <div className="animate-spin rounded-full h-3.5 w-3.5 border border-zinc-900 border-t-transparent"></div>
              Fetching Board...
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="bg-white border border-red-200 text-zinc-900 p-6 rounded-none max-w-md mx-auto my-12 shadow-sm">
            <p className="font-mono text-xs font-bold uppercase text-red-600 mb-2">Notice Board Error</p>
            <p className="text-sm font-semibold">{error}</p>
            <button
              onClick={fetchNotices}
              className="mt-4 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold uppercase py-2 px-4 rounded-none transition-colors border border-zinc-950"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && notices.length === 0 && (
          <div className="text-center py-20 max-w-md mx-auto bg-white rounded-none border border-zinc-200 shadow-sm p-8 mt-10">
            <div className="w-12 h-12 border border-zinc-200 text-zinc-400 rounded-none flex items-center justify-center mx-auto mb-4 bg-zinc-50">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">No announcements posted</h3>
            <p className="text-zinc-500 font-mono text-[10px] mt-1.5 leading-relaxed uppercase tracking-wider font-semibold">
              The board is currently clear.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="mt-6 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase font-bold py-2 px-4 rounded-none border border-zinc-950 transition-colors"
            >
              Post Notice
            </button>
          </div>
        )}

        {!loading && !error && notices.length > 0 && (
          <>
            {filteredNotices.length === 0 ? (
              <div className="text-center py-12 max-w-sm mx-auto border border-dashed border-zinc-300 p-6 bg-white shadow-sm">
                <p className="font-mono text-xs text-zinc-400 uppercase font-bold">No results found</p>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  No announcements match your search criteria. Try a different query or select a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotices.map((notice) => (
                  <NoticeCard
                    key={notice.id}
                    notice={notice}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteNotice}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <NoticeFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        editNoticeId={editNoticeId}
        formData={formData}
        formError={formError}
        submitting={submitting}
        onInputChange={handleInputChange}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
