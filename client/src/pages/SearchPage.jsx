import { useEffect, useState } from 'react';
import axios from 'axios';
import TopSearchesBanner from '../components/TopSearchesBanner';
import MultiSelectGrid from '../components/MultiSelectGrid';
import HistoryList from '../components/HistoryList';
import LogoutButton from '../components/LogoutButton';
import gsap from 'gsap';

export default function SearchPage({ user }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [top, setTop] = useState([]);

  useEffect(() => {
    fetchTop();
    fetchHistory();
    gsap.fromTo(document.querySelector(".userName"), {
      opacity: 0, y: 20
    }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.inOut" }

    )
    
  }, []);

  const fetchTop = async () => {
    try {
      const r = await axios.get('/api/top-searches');
      setTop(r.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHistory = async () => {
    try {
      const r = await axios.get('/api/history');
      setHistory(r.data);
    } catch (e) {
      console.error(e);
    }
  };

  const doSearch = async (e) => {
    e?.preventDefault();
    if (!term) return;
    try {
      const r = await axios.post('/api/search', { term, per_page: 24 }, { withCredentials: true });
      setResults(r.data.results);
      setTotal(r.data.total);
      setSelected(new Set());
      fetchHistory();
      fetchTop();
    } catch (err) {
      console.error(err);
      alert('Search failed');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between py-[2vw] px-[1vw]
      ">

        <h3 className="text-xl font-semibold tracking-tight text-gray-800">
          Welcome, <span className="text-blue-600 userName">{user.displayName}</span>
        </h3>
        <div id="logout">
          <LogoutButton />
        </div>
      </div>

      <TopSearchesBanner items={top} />

      <form
        onSubmit={doSearch}
        className="flex items-center gap-3 mb-5 bg-white shadow-sm rounded-lg px-4 py-2"
      >
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search images..."
          className="flex-1 w-3/5 px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {term && (
        <p className="text-gray-600 mb-3">
          <span className="font-medium">{total}</span> results for "
          <span className="text-blue-600">{term}</span>"
        </p>
      )}

      <div className="text-sm text-gray-700 mb-4">
        Selected: <span className="font-semibold">{selected.size}</span> images
      </div>

      <MultiSelectGrid
        results={results}
        selected={selected}
        setSelected={setSelected}
      />

      <h4 className="mt-8 mb-3 text-lg font-semibold text-gray-800">
        Recent Searches
      </h4>
      <HistoryList items={history} />
    </div>
  );
}
