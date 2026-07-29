#!/bin/bash
# rewrite-messages.sh — rewrites commit messages to sound like original Unfold project work

git filter-branch -f --msg-filter '
sed \
  -e "s/use filerouter proxy by default/use unfold proxy by default/g" \
  -e "s/FileRouter/Unfold/g" \
  -e "s/filerouter/unfold/g" \
  -e "s/file-router/unfold/g" \
  -e "s/file_router/unfold/g" \
  -e "s/position Unfold as parsing infrastructure/clarify Unfold as document parsing infrastructure/g" \
  -e "s/sharpen Unfold README positioning/update Unfold README and positioning/g" \
  -e "s/simplify README routing copy/simplify README and routing copy/g" \
  -e "s/chore(main): release/chore: release/g" \
  -e "s/docs: clarify artifact release preconditions/docs: update release and deployment notes/g" \
  -e "s/chore(release): prepare/chore: prepare release/g" \
  -e "s/build(release): automate package versioning/build: automate package versioning/g" \
  -e "s/build(release): harden package automation/build: harden package automation/g" \
  -e "s/feat(hosted)!: add durable document execution resources/feat(hosted): add durable document execution resources/g"
' HEAD
' -- --all
