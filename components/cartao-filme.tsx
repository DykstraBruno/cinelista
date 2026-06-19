import Link from "next/link";
import type { Filme } from "@/lib/filmes";
import { PosterFilme } from "@/components/poster-filme";

interface CartaoFilmeProps {
  filme: Filme;
}

export function CartaoFilme({ filme }: CartaoFilmeProps) {
  return (
    <Link href={`/filmes/${filme.slug}`} className="group block">
      <PosterFilme
        filme={filme}
        className="transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-xl"
      />
    </Link>
  );
}
