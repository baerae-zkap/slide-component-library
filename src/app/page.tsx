'use client';

import { useRouter } from 'next/navigation';
import { CATEGORIES } from '@/lib/constants';
import { registry } from '@/lib/registry';
import { useComponentStore } from '@/store/component-store';
import { PPTXPreview } from '@/components/preview/PPTXPreview';

import '@/components/ir/data-metrics';
import '@/components/ir/cover-divider';
import '@/components/ir/flow-process';
import '@/components/ir/problem-solution';
import '@/components/ir/comparison';
import '@/components/ir/team';
import '@/components/ir/timeline';
import '@/components/ir/partnership';
import '@/components/ir/ecosystem';
import '@/components/ir/product-showcase';

export default function Home() {
  const router = useRouter();
  const { selectedCategory, selectCategory } = useComponentStore();

  const components = selectedCategory
    ? registry.getByCategory(selectedCategory)
    : registry.getAll();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold">IR 컴포넌트 라이브러리</h1>
      </header>

      <div className="flex">
        <aside className="w-56 bg-white border-r min-h-screen p-4">
          <button
            onClick={() => selectCategory(null)}
            className={`w-full text-left px-3 py-2 rounded text-sm mb-1 ${!selectedCategory ? 'bg-green-700 text-white' : 'hover:bg-gray-100'}`}
          >
            전체 보기
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => selectCategory(cat.slug)}
              className={`w-full text-left px-3 py-2 rounded text-sm mb-1 ${selectedCategory === cat.slug ? 'bg-green-700 text-white' : 'hover:bg-gray-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((comp) => {
              const result = comp.render(comp.meta.defaultProps);
              return (
                <div
                  key={comp.meta.id}
                  onClick={() => router.push(`/component/${comp.meta.id}`)}
                  className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-lg hover:border-green-600 transition-all"
                >
                  <div className="bg-gray-100 rounded mb-3 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <PPTXPreview elements={result.elements} className="w-full h-full" />
                  </div>
                  <h3 className="font-medium text-gray-900">{comp.meta.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{comp.meta.description}</p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
