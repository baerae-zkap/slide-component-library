import type { IRComponentMeta, CategorySlug, IRComponentRenderResult } from '@/types';

export type ComponentRenderer = (props: Record<string, unknown>) => IRComponentRenderResult;

interface RegisteredComponent {
  meta: IRComponentMeta;
  render: ComponentRenderer;
}

class ComponentRegistry {
  private components: Map<string, RegisteredComponent> = new Map();

  register(meta: IRComponentMeta, render: ComponentRenderer): void {
    this.components.set(meta.id, { meta, render });
  }

  get(id: string): RegisteredComponent | undefined {
    return this.components.get(id);
  }

  getByCategory(category: CategorySlug): RegisteredComponent[] {
    return Array.from(this.components.values()).filter(
      (c) => c.meta.category === category
    );
  }

  getAll(): RegisteredComponent[] {
    return Array.from(this.components.values());
  }

  getAllMeta(): IRComponentMeta[] {
    return Array.from(this.components.values()).map((c) => c.meta);
  }

  search(query: string): IRComponentMeta[] {
    const q = query.toLowerCase();
    return this.getAllMeta().filter(
      (meta) =>
        meta.name.toLowerCase().includes(q) ||
        meta.description.toLowerCase().includes(q)
    );
  }
}

export const registry = new ComponentRegistry();
export type { RegisteredComponent };
