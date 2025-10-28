import React, { useMemo, useState } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const mockUsers = Array.from({ length: 56 }).map((_, i) => {
  const roles = ['Owner', 'Admin', 'Manager', 'Sales'];
  const statuses = ['Active', 'Invited', 'Suspended'];
  const names = [
    'Ava Collins', 'Noah Garcia', 'Mia Turner', 'Liam Nguyen', 'Emma Brooks', 'Oliver Patel', 'Sophia Rivera', 'Ethan Chen', 'Isabella Rossi', 'Lucas Kim',
  ];
  const name = names[i % names.length];
  const role = roles[i % roles.length];
  const status = statuses[i % statuses.length];
  const email = name.toLowerCase().replace(/\s/g, '.') + '@acme.co';
  const created = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
  return { id: i + 1, name, email, role, status, created };
});

const Badge = ({ children, tone = 'slate' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs border ${
    tone === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
    tone === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200' :
    tone === 'rose' ? 'bg-rose-50 text-rose-700 border-rose-200' :
    'bg-slate-50 text-slate-700 border-slate-200'
  }`}>{children}</span>
);

const UsersTable = () => {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All');
  const [status, setStatus] = useState('All');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let data = mockUsers;
    if (query) {
      const q = query.toLowerCase();
      data = data.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    if (role !== 'All') data = data.filter((u) => u.role === role);
    if (status !== 'All') data = data.filter((u) => u.status === status);
    return data;
  }, [query, role, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const statusTone = (s) => (s === 'Active' ? 'emerald' : s === 'Invited' ? 'amber' : 'rose');

  return (
    <section className="max-w-6xl mx-auto px-6 mt-10 mb-16">
      <div className="rounded-3xl border border-black/5 bg-white/80 backdrop-blur shadow-sm">
        <div className="p-4 md:p-5 border-b border-slate-100/80">
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-slate-700">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Quick filters</span>
            </div>
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  placeholder="Search users..."
                  className="w-full md:w-64 rounded-xl border border-slate-200 bg-white/70 pl-9 pr-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                />
              </div>
              <select
                value={role}
                onChange={(e) => { setRole(e.target.value); setPage(1); }}
                className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-800 shadow-sm"
              >
                {['All', 'Owner', 'Admin', 'Manager', 'Sales'].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <div className="flex items-center gap-2">
                {['All', 'Active', 'Invited', 'Suspended'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatus(s); setPage(1); }}
                    className={`text-xs rounded-full px-3 py-1 border transition ${status === s ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((u) => (
                <tr key={u.id} className="border-t border-slate-100/80 text-slate-700">
                  <td className="px-4 py-3 font-medium text-slate-800">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">
                    <Badge>{u.role}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(u.status)}>{u.status}</Badge>
                  </td>
                  <td className="px-4 py-3">{u.created}</td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-slate-500">No users match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 md:p-5 border-t border-slate-100/80 text-sm text-slate-600">
          <div>
            Showing <span className="font-medium text-slate-800">{paged.length}</span> of <span className="font-medium text-slate-800">{filtered.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <div className="px-2">Page <span className="font-medium text-slate-800">{currentPage}</span> of <span className="font-medium text-slate-800">{totalPages}</span></div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 disabled:opacity-50 hover:bg-slate-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersTable;
