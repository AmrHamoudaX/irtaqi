#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SUPABASE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
ENV_FILE="${SUPABASE_DIR}/.env"

if [ -f "${ENV_FILE}" ]; then
  set -a
  source "${ENV_FILE}"
  set +a
fi

if [ -z "${DOCKER_HOST:-}" ]; then
  SOCKET_PATH="$(podman machine inspect --format '{{.ConnectionInfo.PodmanSocket.Path}}')"
  export DOCKER_HOST="unix://${SOCKET_PATH}"
fi

case "${1:-}" in
  start) supabase start ;;
  stop) supabase stop ;;
  reset) supabase db reset ;;
  status) supabase status ;;
  *) echo "Usage: $(basename "$0") {start|stop|reset|status}" ; exit 1 ;;
esac
