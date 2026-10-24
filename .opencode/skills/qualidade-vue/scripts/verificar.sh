#!/usr/bin/env bash
# Verificação completa do projeto: tipos, testes e lint, sem corrigir nada sozinha.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

echo "1/3 type-check"
npx --no-install vue-tsc --build

echo "2/3 testes"
npx --no-install vitest --run

echo "3/3 lint (sem --fix)"
npx --no-install oxlint .
npx --no-install eslint .

echo "Tudo certo."
