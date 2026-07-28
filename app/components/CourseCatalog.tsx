'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { courseCategories, formatRupiah, type Course } from '../lib/courses';

interface CourseCatalogProps {
  courses: Course[];
}

const ALL_LABEL = 'Semua Kelas';

export default function CourseCatalog({ courses }: CourseCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesCategory = activeCategory === ALL_LABEL || course.category === activeCategory;
      const matchesQuery =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.mentor.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [courses, activeCategory, search]);

  return (
    <div>
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1 w-full md:w-auto">
          {[ALL_LABEL, ...courseCategories].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? 'bg-[#0A1E3F] text-white'
                  : 'bg-gray-100 text-[#6B7280] hover:bg-[#F5821F]/10 hover:text-[#F5821F]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#0A1E3F] focus:border-[#0A1E3F] outline-none transition-all text-sm"
            placeholder="Cari materi belajar..."
            type="text"
          />
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-[#6B7280] mb-6">{filtered.length} kelas ditemukan</p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#6B7280]">
          Tidak ada kelas yang cocok dengan pencarian Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <Link
              key={course.slug}
              href={`/e-course/${course.slug}`}
              className="course-card group bg-white shadow-sm hover:shadow-xl rounded-2xl overflow-hidden flex flex-col border border-gray-100 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div
                className={`relative h-44 w-full flex items-center justify-center bg-gradient-to-br ${course.gradient}`}
              >
                <span className="text-6xl">{course.icon}</span>
                {course.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-xs uppercase tracking-wider shadow-sm ${
                        course.badge === 'Bestseller'
                          ? 'bg-[#F5821F] text-white'
                          : 'bg-[#0A1E3F] text-white'
                      }`}
                    >
                      {course.badge}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-bold text-lg text-[#0A1E3F] mb-2 leading-snug line-clamp-2 group-hover:text-[#F5821F] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-[#6B7280] mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#F5821F]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.5c-3.3 0-9.9 1.6-9.9 4.9v2.4h19.8v-2.4c0-3.3-6.6-4.9-9.9-4.9z" />
                  </svg>
                  Mentor: {course.mentor}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-5 text-sm text-[#6B7280]">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#F5821F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {course.durationHours} Jam
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-[#F5821F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                      />
                    </svg>
                    {course.level}
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                  <div className="flex flex-col">
                    <span className="text-gray-400 line-through text-xs">{formatRupiah(course.originalPrice)}</span>
                    <span className="text-[#0A1E3F] font-extrabold text-lg">{formatRupiah(course.price)}</span>
                  </div>
                  <span className="bg-[#0A1E3F] text-white px-4 py-2 rounded-lg font-semibold text-sm group-hover:bg-[#F5821F] transition-colors">
                    Lihat Detail
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
