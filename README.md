# Cinelista

Catálogo de filmes em cartaz no estilo dos sites oficiais de cinema,
construído com **Next.js (App Router)**. Exibe os filmes em cartaz e as
próximas estreias em uma grade de pôsteres e gera uma página de detalhe
para cada filme, com renderização estática (SSG) e SEO dinâmico.

## Funcionalidades

- **App Router** com página inicial (`app/page.tsx`) e rota dinâmica por
  filme (`app/filmes/[slug]/page.tsx`).
- **Data fetching** em Server Components assíncronos, lendo o catálogo
  local em `data/filmes.json` através da camada `lib/filmes.ts`.
- **SSG** via `generateStaticParams` + `force-static`: cada filme é
  pré-renderizado em tempo de build.
- **SEO dinâmico** com `generateMetadata`, definindo `title` e
  `description` próprios por filme, além de metadados Open Graph.
- Grade de pôsteres com destaque, seções **Em Cartaz** / **Em Breve**,
  classificação indicativa, duração, gênero, sinopse, direção e elenco.

## Estrutura

```
app/
  layout.tsx               layout raiz (cabeçalho, rodapé, metadados base)
  page.tsx                 catálogo: destaque + grades Em Cartaz / Em Breve
  filmes/[slug]/page.tsx   página do filme + generateMetadata + SSG
components/
  poster-filme.tsx         pôster do filme (gera capa a partir das cores)
  cartao-filme.tsx         cartão clicável usado nas grades
data/
  filmes.json              catálogo de filmes
lib/
  filmes.ts                acesso aos dados e formatadores
```

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para gerar o build de produção:

```bash
npm run build
npm start
```

## Deploy

O projeto está publicado na [Vercel](https://vercel.com). Para implantar,
conecte este repositório na Vercel — o build padrão (`next build`) já
gera as páginas estáticas de cada filme automaticamente.
