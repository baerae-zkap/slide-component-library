'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { registry } from '@/lib/registry';
import { useComponentStore } from '@/store/component-store';
import { PPTXPreview } from '@/components/preview/PPTXPreview';
import { exportSingleComponent } from '@/lib/export/pptx';
import { ArrowLeft, Download, Share2, Link2, Check } from 'lucide-react';

export default function ComponentDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getProps } = useComponentStore();

  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comp, setComp] = useState<ReturnType<typeof registry.get>>(undefined);

  useEffect(() => {
    const found = registry.get(id);
    setComp(found);
  }, [id]);

  if (!comp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">컴포넌트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const props = getProps(comp.meta.id, comp.meta.defaultProps);
  const result = comp.render(props);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportSingleComponent(result, comp.meta.name);
    } catch (error) {
      console.error('Export error:', error);
      alert('내보내기에 실패했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: comp.meta.name,
          text: comp.meta.description,
          url: url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>목록으로</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Link2 className="w-4 h-4" />}
              {copied ? '복사됨!' : '링크 복사'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Share2 className="w-4 h-4" />
              공유
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              {isExporting ? '내보내는 중...' : 'PPTX 다운로드'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-gray-100 rounded overflow-hidden flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                <PPTXPreview elements={result.elements} className="w-full h-full" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{comp.meta.name}</h1>
              <p className="text-gray-600 mb-4">{comp.meta.description}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">{comp.meta.category}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">사용 방법</h3>
              <ol className="text-sm text-gray-600 space-y-2">
                <li>1. PPTX 다운로드 버튼 클릭</li>
                <li>2. 다운로드된 .pptx 파일 열기</li>
                <li>3. Google Slides에서 열기 (또는 PowerPoint)</li>
                <li>4. 텍스트, 도형, 색상 자유롭게 편집</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
