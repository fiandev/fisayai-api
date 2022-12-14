const log = (req: any) => {
    const time = new Date().toLocaleString()
    console.log(`[${time}] => ${ req?.originalUrl }`)
}

export = log