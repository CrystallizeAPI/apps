# === Makefile Helper ===

# Styles
YELLOW=$(shell echo "\033[00;33m")
RED=$(shell echo "\033[00;31m")
RESTORE=$(shell echo "\033[0m")

# Variables
NPM := npm
DOCKER_COMPOSE = docker-compose
MKCERT = mkcert

.DEFAULT_GOAL := list

.PHONY: list
list:
	@echo "******************************"
	@echo "${YELLOW}Available targets${RESTORE}:"
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf " ${YELLOW}%-15s${RESTORE} > %s\n", $$1, $$2}'
	@echo "${RED}==============================${RESTORE}"

.PHONY: clean
clean: stop ## Clean non-essential files
	@rm -rf node_modules

.PHONY: install-certificates
install-certificates: ## Install the certificates
	@$(MKCERT) --cert-file ./caddy/certs/cert.pem -key-file ./caddy/certs/key.pem "import.app.crystallize.com"

.PHONY: stop
stop: ## Stop all the local services you need
	-@$(DOCKER_COMPOSE) down

.PHONY: serve
serve:
	-@$(DOCKER_COMPOSE) up -d

.PHONY: codeclean
codeclean: ## Code Clean
	@$(NPM) run prettier:fix
