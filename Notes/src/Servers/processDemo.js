// argv
// console.log(process.argv)

// process.env
console.log(process.env)

// pid
console.log(process.pid)

// cwd
console.log(process.cwd())

// memoryUsage()
console.log(process.memoryUsage())

// uptime()
console.log(process.uptime())

process.on('exit', (code) => {
    console.log(`about to exit with code ${code}`)
})

// exit()
console.log(process.exit(0));

console.log('after exit')