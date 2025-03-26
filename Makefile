# Variables
PROJECT := forestrymapagent

# To pass extra arguments, call with: make install ARGS="arg1 arg2 ..."
install:
	@echo "Installing dependencies"
	@pnpm install 

client-add:
	@echo "Adding package to chat client"
	@pnpm --filter client add $(ARGS)

client-dev:
	@echo "Running dev client"
	@pnpm run --filter client dev

server-add:
	@echo "Adding package to server"
	@pnpm --filter server add $(ARGS)

server-dev:
	@echo "Running dev server"
	@pnpm run --filter server dev

git-push:
	git add .
	git commit -m $(ARGS)
	git push -u origin main