
# challenges/recommendations/README.md

## 2) Recomendação de campanhas → criadores

### Contexto

Dada uma **campanha** (briefing, orçamento, requisitos) e uma base de **criadores** (tags, métricas, histórico), retorne um **ranking** de criadores adequados com justificativas legíveis.

Tempo médio: 2 a 3 horas. 

### O que entregar (mínimo)

* **Uma forma de executar**: CLI **ou** HTTP (`POST /recommendations`).
* **Entrada**: JSON de campanha (exemplo abaixo).
* **Saída**: lista ordenada de até 10 criadores `{id, score, why}`.
* **Scoring determinístico e simples** (pesos fixos e documentados no README).


### Esquema de dados (*apenas sugestão)

```
creators(id, name, tags[], audience_age[], audience_location[], avg_views, ctr, cvr, price_min, price_max, reliability_score)
campaigns(id, brand, goal, tags_required[], audience_target[], budget_cents, deadline)
past_deals(id, creator_id, campaign_id, delivered_on_time, performance_score)
```

### Dataset de exemplo

* Gere 50 a 500 criadores fictícios (script/seed).
* Crie 5–10 campanhas exemplo (fintech, fitness app, D2C skincare, etc.).

### Endpoint

`POST /recommendations`

```json
{
  "campaign": {
    "goal": "installs",
    "tags_required": ["fintech", "investimentos"],
    "audience_target": { "country": "BR", "age_range": [20,34] },
    "budget_cents": 5000000,
    "deadline": "2025-10-30"
  },
  "top_k": 20,
  "diversity": true
}
```

Resposta (exemplo):

```json
{
  "recommendations": [
    {
      "creator_id": "c789",
      "score": 0.82,
      "fit_breakdown": {
        "tags": 0.35,
        "audience_overlap": 0.25,
        "performance": 0.15,
        "budget_fit": 0.07
      },
      "why": "Fala de fintech; 65% audiência BR 18–34; 9/10 no prazo"
    }
  ],
  "metadata": {
    "total_creators": 150,
    "scoring_version": "1.0"
  }
}
```

### Modelo de Scoring (Base)

* **Tags** (Jaccard/cosine simples sobre vetores/sets).
* **Aderência de audiência** (interseção idade/país).
* **Performance histórica** (avg_views, CTR, CVR normalizados).
* **Fit de budget** (preço médio dentro do orçamento).
* **Confiabilidade** (entregas no prazo).
* **Penalidades** por conflito (concorrentes recentes, saturação de nicho).

> **Explique no README_LOCAL os pesos e normalizações**.


### Critérios

* Clareza do modelo e justificativas.
* Qualidade dos seeds e testes.
* Desempenho e simplicidade.

# Exemplo chamada HTTP
curl -X POST http://localhost:8080/recommendations \
  -H "content-type: application/json" \
  -d '{"goal":"installs","tags_required":["fintech"],"country":"BR","budget_cents":500000}'

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