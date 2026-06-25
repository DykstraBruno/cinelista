import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getFilme,
  getFilmes,
  formatarDuracao,
  formatarData,
  rotuloClassificacao,
  corClassificacao,
} from "@/lib/filmes";
import { PosterFilme } from "@/components/poster-filme";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const filmes = await getFilmes();
  return filmes.map((filme) => ({ slug: filme.slug }));
}

interface PaginaFilmeProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PaginaFilmeProps): Promise<Metadata> {
  const { slug } = await params;
  const filme = await getFilme(slug);

  if (!filme) {
    return {
      title: "Filme não encontrado",
      description: "O filme solicitado não está no catálogo da Cinelista.",
    };
  }

  const descricao = `${filme.sinopse.slice(0, 155)}…`;

  return {
    title: filme.titulo,
    description: descricao,
    openGraph: {
      type: "video.movie",
      title: filme.titulo,
      description: descricao,
      releaseDate: filme.dataEstreia,
    },
  };
}

export default async function PaginaFilme({ params }: PaginaFilmeProps) {
  const { slug } = await params;
  const filme = await getFilme(slug);

  if (!filme) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <Link href="/" className="text-sm text-zinc-500 hover:underline">
        ← Voltar ao catálogo
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr]">
        <div>
          <PosterFilme filme={filme} />
        </div>

        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight">
            {filme.titulo}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span
              className="rounded px-2 py-0.5 font-bold text-white"
              style={{ backgroundColor: corClassificacao(filme.classificacao) }}
            >
              {rotuloClassificacao(filme.classificacao)}
            </span>
            <span className="text-zinc-500">
              {formatarDuracao(filme.duracao)}
            </span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-500">{filme.generos.join(", ")}</span>
            {filme.nota !== null && (
              <>
                <span className="text-zinc-500">·</span>
                <span className="font-medium">★ {filme.nota.toFixed(1)}</span>
              </>
            )}
          </div>

          <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            {filme.sinopse}
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <Info rotulo="Direção" valor={filme.diretor} />
            <Info rotulo="Elenco" valor={filme.elenco.join(", ")} />
            <Info rotulo="Estreia" valor={formatarData(filme.dataEstreia)} />
            <Info
              rotulo="Status"
              valor={filme.status === "em-cartaz" ? "Em cartaz" : "Em breve"}
            />
          </dl>

          <div className="mt-8">
            {filme.status === "em-cartaz" ? (
              <button className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90">
                Comprar ingresso
              </button>
            ) : (
              <span className="inline-block rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-zinc-500 dark:border-white/15">
                Em breve nos cinemas
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <dt className="text-zinc-500">{rotulo}</dt>
      <dd className="font-medium">{valor}</dd>
    </div>
  );
}
