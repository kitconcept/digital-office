SHELL := /bin/bash
CURRENT_DIR:=$(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# We like colors
# From: https://coderwall.com/p/izxssa/colored-makefile-for-golang-projects
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`
YELLOW=`tput setaf 3`

.PHONY: all
all: build

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
.PHONY: help
help: ## This help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build:  ## Build
	@echo "Build"
	make build-frontend

.PHONY: build-frontend
build-frontend:  ## Build React Frontend
	@echo "Build Frontend"
	yarn
	yarn build

.PHONY: start-frontend
start-frontend:  ## Start React Frontend
	@echo "Start Frontend"
	yarn start

api/bin/pip:
	@echo "$(GREEN)==> Setup Virtual Env$(RESET)"
	(cd api && python3 -m venv .)
	(cd api && bin/pip install pip --upgrade)

.PHONY: clean
clean: ## Remove old virtualenv and creates a new one
	@echo "$(RED)==> Cleaning environment and build$(RESET)"
	rm -rf node_modules build
	(cd api && rm -rf bin lib include share develop-eggs .Python parts .installed.cfg .mr.developer.cfg)


.PHONY: deploy-staging
deploy-staging: ## Deploy staging
	@echo "$(GREEN)==> Deploy staging$(RESET)"
	cat deploy-staging.sh | ssh digitaloffice.kitconcept.io

