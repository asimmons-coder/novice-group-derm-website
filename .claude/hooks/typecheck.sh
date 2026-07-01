#!/usr/bin/env bash
# PostToolUse hook: after Claude edits a .ts/.tsx file, run a project typecheck.
# This repo has no lint/test net, so `tsc --noEmit` is the fastest way to catch
# a type break the moment it happens instead of at `next build`.
#
# Exit 2 with output on stderr tells Claude Code the edit introduced errors, so
# it can fix them before moving on. Exit 0 stays silent (no errors, or non-TS file).
#
# To disable temporarily: comment out the PostToolUse hook in .claude/settings.json.

input=$(cat)

# Pull the edited file path out of the hook payload (node is always present here).
file=$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write(String(JSON.parse(s).tool_input?.file_path||""))}catch(e){process.stdout.write("")}})')

case "$file" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;  # not a TypeScript edit, nothing to check
esac

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0

tsc="./node_modules/.bin/tsc"
[ -x "$tsc" ] || tsc="npx --no-install tsc"

out=$($tsc --noEmit 2>&1)
status=$?

if [ "$status" -ne 0 ]; then
  {
    echo "Typecheck failed after editing ${file}:"
    printf '%s\n' "$out" | grep -E "error TS" | head -20
  } >&2
  exit 2
fi

exit 0
