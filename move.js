const fs = require('fs/promises');

const moveStuff = async() => {
    const files = await fs.readdir('./answers/', {withFileTypes: true});

    const mdx = files.filter(f => f.name.endsWith('.mdx'));

    await Promise.all(mdx.map( async f => { 
        const content = await fs.readFile(`./answers/${f.name}`, {encoding:'utf8'});
        
        const pattern = new RegExp(/- sentry.\w+/gm);
        const match = content.match(pattern);
        
        const platform = match[0].substring(9);

        //await fs.mkdir(`./answers/${platform}`);
        //await fs.copyFile(`./answers/${f.name}`, `./answers/${platform}/${f.name}`)
        await fs.rm(`./answers/${f.name}`)
    }))
}

moveStuff();