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
---

# README_LOCAL.md (modelo para cada submissão)

```md
# Desafio Conty – {Seu Nome / @github}

> **Local da submissão:** `submissions/{github-username}/{pix|recommendations}`

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
