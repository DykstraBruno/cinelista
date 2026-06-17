import { promises as fs } from "fs";
import path from "path";

export type StatusFilme = "em-cartaz" | "em-breve";

export interface Filme {
  slug: string;
  titulo: string;
  sinopse: string;
  generos: string[];
  duracao: number;
  classificacao: string;
  diretor: string;
  elenco: string[];
  dataEstreia: string;
  nota: number | null;
  status: StatusFilme;
  destaque: boolean;
  cor: string;
  corSecundaria: string;
}

const arquivoFilmes = path.join(process.cwd(), "data", "filmes.json");

async function carregarFilmes(): Promise<Filme[]> {
  const conteudo = await fs.readFile(arquivoFilmes, "utf-8");
  return JSON.parse(conteudo) as Filme[];
}

export async function getFilmes(): Promise<Filme[]> {
  const filmes = await carregarFilmes();
  return filmes.sort((a, b) => a.dataEstreia.localeCompare(b.dataEstreia));
}

export async function getFilmesPorStatus(
  status: StatusFilme,
): Promise<Filme[]> {
  const filmes = await getFilmes();
  return filmes.filter((filme) => filme.status === status);
}

export async function getFilme(slug: string): Promise<Filme | undefined> {
  const filmes = await carregarFilmes();
  return filmes.find((filme) => filme.slug === slug);
}

export function formatarDuracao(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  return horas > 0 ? `${horas}h ${resto}min` : `${resto}min`;
}

export function formatarData(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function rotuloClassificacao(classificacao: string): string {
  return classificacao === "L" ? "Livre" : `${classificacao} anos`;
}

export function corClassificacao(classificacao: string): string {
  const cores: Record<string, string> = {
    L: "#1b873f",
    "10": "#0e7490",
    "12": "#15803d",
    "14": "#b45309",
    "16": "#c2410c",
    "18": "#b91c1c",
  };
  return cores[classificacao] ?? "#4b5563";
}
