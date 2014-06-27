#!/usr/bin/env node

if (process.argv[2] !== "I really understand") {
  console.log("Ooops, you made a mistake! Do you really understand?")
  console.log()
  console.log("Hint: `> verify \"I really understand\"`")
  console.log()
  process.exit(1)
} else {
  console.log("Ok, great, let's get started!")
}
