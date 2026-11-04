import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function CatalogPage() {
  useDocumentTitle("Catalog");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl md:text-4xl">Catalog</h1>
      <p className="text-ink-500 dark:text-ink-400">Products will appear here.</p>
    </div>
  );
}
