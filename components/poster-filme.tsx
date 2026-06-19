import type { Filme } from "@/lib/filmes";
import { rotuloClassificacao, corClassificacao } from "@/lib/filmes";

interface PosterFilmeProps {
  filme: Filme;
  className?: string;
}

export function PosterFilme({ filme, className = "" }: PosterFilmeProps) {
  return (
    <div
      className={`relative flex aspect-[2/3] w-full flex-col justify-end overflow-hidden rounded-lg shadow-md ${className}`}
      style={{
        backgroundImage: `linear-gradient(150deg, ${filme.cor}, ${filme.corSecundaria})`,
      }}
    >
      <span
        className="absolute top-3 right-3 rounded px-2 py-0.5 text-xs font-bold text-white"
        style={{ backgroundColor: corClassificacao(filme.classificacao) }}
        title={`Classificação: ${rotuloClassificacao(filme.classificacao)}`}
      >
        {filme.classificacao}
      </span>
      <div className="bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
        <h3 className="text-base font-semibold leading-tight text-white">
          {filme.titulo}
        </h3>
        <p className="mt-1 text-xs text-white/80">
          {filme.generos.join(" · ")}
        </p>
      </div>
    </div>
  );
}
