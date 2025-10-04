# challenges/pix/README.md

## 1) Pagamentos em lote via “PIX” (simulado)

### Contexto

Pagamos muitos criadores todo mês. 
Crie um pequeno serviço que recebe uma **lista de pagamentos** e liquida cada item de forma **idempotente**.

Tempo médio: 2 a 3 horas. 

### O que entregar (mínimo)

* **Uma forma de executar**: CLI **ou** HTTP.
* **Entrada**: JSON com itens e `external_id` (exemplo abaixo).
* **Idempotência**: repetir a mesma entrada **não** duplica pagamentos (use `external_id`).
* **Saída**: um **relatório final** com contagem de pagos/falhos/duplicados.

### Exemplos

**Entrada (arquivo ou body):** `seeds/payouts_batch_example.json`

```json
{
  "batch_id": "2025-10-05-A",
  "items": [
    { "external_id": "u1-001", "user_id": "u1", "amount_cents": 35000, "pix_key": "u1@email.com" },
    { "external_id": "u2-002", "user_id": "u2", "amount_cents": 120000, "pix_key": "+55 11 91234-5678" }
  ]
}
```

**Saída (exemplo livre):**

```
Processados: 2 | Pagos: 2 | Falhos: 0 | Duplicados: 0
```

### Regras simples

* Pode **simular** a liquidação (ex.: `setTimeout`, `sleep`, retorno aleatório).
* Se fizer **HTTP**: `POST /payouts/batch` já é suficiente. Webhook é opcional.
* Persistência **opcional** (em memória ok). Bonus: chave única para `external_id`.

### Critérios

* Confiabilidade (idempotência) > beleza.
* Arquitetura e testes.
* Clareza de documentação.

# Exemplo de chamada HTTP: 
curl -X POST http://localhost:8080/payouts/batch \
  -H "content-type: application/json" \
  --data @seeds/payouts_batch_example.json
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