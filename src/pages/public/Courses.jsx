import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CourseCard from '../../components/CourseCard';
import { courses, categories } from '../../data/mockData';
import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Newest', 'Most Popular', 'Highest Rated', 'Price: Low to High', 'Price: High to Low'];

export default function Courses() {
    const [search, setSearch] = useState('');
    const [selectedCat, setSelectedCat] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const [sortBy, setSortBy] = useState('Newest');
    const [view, setView] = useState('grid');

    const published = courses.filter(c => c.isPublished);

    const filtered = published.filter(c => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.teacher.toLowerCase().includes(search.toLowerCase());
        const matchCat = selectedCat === 'All' || c.category === selectedCat;
        const matchLevel = selectedLevel === 'All Levels' || c.level === selectedLevel;
        return matchSearch && matchCat && matchLevel;
    }).sort((a, b) => {
        if (sortBy === 'Most Popular') return b.students - a.students;
        if (sortBy === 'Highest Rated') return b.rating - a.rating;
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <Navbar />

            {/* Hero */}
            <section style={{ padding: '7rem 1.5rem 3rem', textAlign: 'center', background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 50%)' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--primary-dark)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>Explore</p>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--text)', marginBottom: '1rem' }}>
                        All <span className="gradient-text">Courses</span>
                    </h1>
                    <p style={{ color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Discover {published.length} expert-led courses across multiple disciplines.
                    </p>
                    {/* Search */}
                    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
                        <FiSearch size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input className="form-input" style={{ paddingLeft: '2.75rem', fontSize: '1rem' }} placeholder="Search courses or instructors..."
                            value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
            </section>

            {/* Filters */}
            <section style={{ padding: '1.5rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)', position: 'sticky', top: '68px', zIndex: 100 }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <FiFilter size={16} style={{ color: 'var(--text-muted)', margin: 'auto 0' }} />
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCat(cat)} style={{
                                padding: '0.4rem 0.875rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600,
                                background: selectedCat === cat ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'var(--border)',
                                color: selectedCat === cat ? 'white' : 'var(--text-2)', transition: 'all 0.2s',
                            }}>{cat}</button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        <select className="form-input" style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
                            {levels.map(l => <option key={l}>{l}</option>)}
                        </select>
                        <select className="form-input" style={{ width: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            {sortOptions.map(s => <option key={s}>{s}</option>)}
                        </select>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                            {[['grid', FiGrid], ['list', FiList]].map(([v, Icon]) => (
                                <button key={v} onClick={() => setView(v)} style={{
                                    width: '36px', height: '36px', borderRadius: '0.375rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: view === v ? 'rgba(99,102,241,0.2)' : 'var(--border)', color: view === v ? 'var(--primary-dark)' : 'var(--text-muted)',
                                }}><Icon size={16} /></button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section style={{ padding: '3rem 1.5rem 5rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                        Showing <strong style={{ color: 'var(--primary-dark)' }}>{filtered.length}</strong> course{filtered.length !== 1 ? 's' : ''}
                        {selectedCat !== 'All' && ` in ${selectedCat}`}
                        {search && ` for "${search}"`}
                    </p>

                    {filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
                            <h3 style={{ color: 'var(--text-2)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>No courses found</h3>
                            <p>Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                            gap: '1.5rem',
                        }}>
                            {filtered.map(c => (
                                view === 'list' ? (
                                    <div key={c.id} style={{ background: 'var(--card)', borderRadius: '1rem', border: '1px solid var(--border)', padding: '1.25rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <img src={c.thumbnail} alt={c.title} style={{ width: '140px', height: '90px', objectFit: 'cover', borderRadius: '0.5rem', flexShrink: 0 }} />
                                        <div style={{ flex: 1 }}>
                                            <span style={{ color: 'var(--primary-dark)', fontSize: '0.75rem', fontWeight: 600, }}>{c.category}</span>
                                            <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '1rem', margin: '0.25rem 0', fontFamily: 'var(--font-display)' }}>{c.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>By {c.teacher} · {c.duration} · {c.level}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>₹{c.price.toLocaleString()}</div>
                                            <a href={`/courses/${c.id}`} className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', textDecoration: 'none' }}>View</a>
                                        </div>
                                    </div>
                                ) : <CourseCard key={c.id} course={c} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
