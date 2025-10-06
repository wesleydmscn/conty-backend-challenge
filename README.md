# Conty – Desafio Técnico (Backend)

> Escolha **1 dos 2** desafios abaixo. Foque em **qualidade**, velocidade, clareza e confiabilidade. Exatamente nessa ordem.

---

## Como participar

1. Faça **fork** deste repositório (público).
2. Crie uma pasta **apenas sua**: `submissions/{seu-github}/{pix|reco}`.
3. Coloque seu código lá dentro e adicione um **README.md curto** explicando como rodar.
4. Abra um **Pull Request** para `main` com o título: `Desafio – {seu nome} – [PIX|RECO]`.

---

## O que avaliamos

* **Arquitetura & Projeto**: camadas bem separadas, coesão, baixo acoplamento, legibilidade.
* **Confiabilidade**: idempotência, tratamento de falhas, testes mínimos.
* **Clareza**: README, trade‑offs, limites, uso de exemplos.
* **Performance & Escala**: quando fizer sentido (fila, concorrência controlada).
* **DX/Operação**: Docker, Makefile, logs, `.env.example`.

---

## Dicas gerais

* Stack livre: **Go (preferido)**, **TypeScript/Node**, **Rust** ou **Python**. DB: **Postgres**.
* CLI **ou** API são aceitos (explique no README_LOCAL como usar).
* Use logs estruturados e `.env.example`.
* Pode usar IA e libs de terceiros **desde que declare** no README_LOCAL o que é seu vs. gerado/terceiros.
* Dados sensíveis reais: **não use**.

---

## Ranking TOP 5 – Melhores Soluções até agora

> ⚠️ O ranking abaixo **não está em ordem 100% definitiva**, mas representa os **5 candidatos que consideramos apresentar as melhores soluções** até agora.  

| Desenvolvedor | Stack | Desafio | Destaques | Link PR | GitHub |
|---------------|-------|---------|-----------|---------|--------|
| **ErickJ3** | Rust + Axum + Redis | PIX | Arquitetura distribuída sofisticada, idempotência robusta, documentação completa | [PR #2](https://github.com/Conty-App/conty-backend-challenge/pull/2) | [@ErickJ3](https://github.com/ErickJ3) |
| **Cezar Fuhr** | Python + FastAPI + PostgreSQL | PIX | Segurança enterprise, cobertura de testes ~90%, arquitetura limpa | [PR #12](https://github.com/Conty-App/conty-backend-challenge/pull/12) | [@cezarfuhr](https://github.com/cezarfuhr) |
| **Antonio Bet** | NestJS + Prisma | RECOMMENDATIONS | Algoritmos avançados, base matemática sólida, documentação detalhada | [PR #7](https://github.com/Conty-App/conty-backend-challenge/pull/7) | [@antoniobet](https://github.com/antoniobet) |
| **Hendel Santos** | Go + Clean Architecture | PIX | Arquitetura clara, concorrência com goroutines, configuração profissional | [PR #3](https://github.com/Conty-App/conty-backend-challenge/pull/3) | [@hendelsantos](https://github.com/hendelsantos) |
| **Matheus André** | Go + Clean Architecture (In-Memory) | PIX | Testes de concorrência, arquitetura hexagonal, documentação prática | [PR #8](https://github.com/Conty-App/conty-backend-challenge/pull/8) | [@matheusandre1](https://github.com/matheusandre1) |


---

# README_LOCAL.md (modelo para cada submissão)

```md
# Desafio Conty – {Seu Nome / @github}

> **Local da submissão:** `submissions/{github}/{pix|reco}`

## Como rodar
- Requisitos: Docker (ou Go/Node/Python + Postgres/SQLite)
- Comandos: `make dev` / `docker compose up` / scripts equivalentes **dentro desta pasta**
- Variáveis: ver `.env.example`

## Endpoints/CLI
- Liste endpoints/flags e exemplos de request/response (cURL/Postman)

## Arquitetura
- Desenho rápido das camadas
- Principais decisões e trade‑offs
- O que faria diferente com mais tempo

## Testes
- Como rodar e o que cobre

## IA/Libraries
- Onde usou IA
- O que é seu vs. de terceiros
```

Dúvidas? 
Entre em contato conosco. 
