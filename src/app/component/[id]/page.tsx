import { COMPONENT_IDS } from '@/lib/component-ids';
import ComponentDetailClient from './client';

export function generateStaticParams() {
  return COMPONENT_IDS.map((id) => ({ id }));
}

export default function ComponentDetailPage({ params }: { params: { id: string } }) {
  return <ComponentDetailClient id={params.id} />;
}
