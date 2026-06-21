import Link from "next/link";
import {
  getFilmesPorStatus,
  formatarDuracao,
  rotuloClassificacao,
} from "@/lib/filmes";
import { CartaoFilme } from "@/components/cartao-filme";

export const dynamic = "force-static";

export default async function Home() {
  const emCartaz = await getFilmesPorStatus("em-cartaz");
  const emBreve = await getFilmesPorStatus("em-breve");
  const destaque = emCartaz.find((filme) => filme.destaque) ?? emCartaz[0];

  return (
    <main className="flex-1">
      {destaque && (
        <section
          className="border-b border-white/10"
          style={{
            backgroundImage: `linear-gradient(120deg, ${destaque.cor}, ${destaque.corSecundaria})`,
          }}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-16 text-white">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Destaque · Em Cartaz
            </span>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight">
              {destaque.titulo}
            </h1>
            <p className="text-sm text-white/80">
              {destaque.generos.join(" · ")} ·{" "}
              {formatarDuracao(destaque.duracao)} ·{" "}
              {rotuloClassificacao(destaque.classificacao)}
            </p>
            <p className="mt-2 max-w-2xl text-white/90">{destaque.sinopse}</p>
            <Link
              href={`/filmes/${destaque.slug}`}
              className="mt-4 inline-flex w-fit items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
            >
              Ver detalhes e horários
            </Link>
          </div>
        </section>
      )}

      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <Secao titulo="Em Cartaz">
          {emCartaz.map((filme) => (
            <CartaoFilme key={filme.slug} filme={filme} />
          ))}
        </Secao>

        <Secao titulo="Em Breve">
          {emBreve.map((filme) => (
            <CartaoFilme key={filme.slug} filme={filme} />
          ))}
        </Secao>
      </div>
    </main>
  );
}

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12 last:mb-0">
      <h2 className="mb-5 text-2xl font-semibold tracking-tight">{titulo}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {children}
      </div>
    </section>
  );
}
