import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IR 컴포넌트 라이브러리',
  description: 'Google Slides용 IR 프레젠테이션 컴포넌트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
