# === Makefile Helper ===

# Styles
YELLOW=$(shell echo "\033[00;33m")
RED=$(shell echo "\033[00;31m")
RESTORE=$(shell echo "\033[0m")

# Variables
NPM := npm
CADDY := caddy
CADDY_PID_FILE := caddy.dev.pid
CADDYFILE := Caddyfile
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
		
.PHONY: install
install: install-certificates ## Install dependencies
	@$(NPM) install
	
.PHONY: install-certificates
install-certificates: ## Install the certificates
	@$(MKCERT) -install
	@$(MKCERT) --cert-file domains.pem -key-file key.pem "contract.app.crystallize.com"

.PHONY: serve-https
serve-https: ## Serve the Frontend
	@$(CADDY) start --config $(CADDYFILE) --pidfile $(CADDY_PID_FILE)

.PHONY: serve-front
serve-front: ## Serve the Frontend
	@$(NPM) run dev

.PHONY: stop
stop: ## Stop all the local services you need
	-@$(CADDY) stop > /dev/null 2>&1 &
	-@if [ -f $(CADDY_PID_FILE) ]; then \
		kill -9 `cat $(CADDY_PID_FILE)`; \
		rm -f  $(CADDY_PID_FILE); \
	fi

.PHONY: serve 
serve: stop serve-https serve-front ## Run all the local services you need

.PHONY: codeclean
codeclean: ## Code Clean
	@$(NPM) run prettier:fix
