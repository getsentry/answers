const fs = require('fs/promises');

const getDirs = async() => {
    //const directories = await fs.readdir('./answers/', {withFileTypes: true});
    //const directorynames = directories.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
    const dirnames = ["bash", "django", "cpp", "csharp", "flask", "git", "flutter", "go", "html", "javascript", "java", "native", "nextjs", "linux", "nodejs", "postgres", "python", "react", "sql", "swift", "windows", "sqlserver"];

    for(let i = 0; i<dirnames.length; i++) {
        dir = dirnames[i];
        const files = await fs.readdir(`./answers/${dir}/`, {withFileTypes: true});
        const mdx = files.filter(f => f.name.endsWith('.mdx'));
        await Promise.all(mdx.map( async f => { 
            const content = await fs.readFile(`./answers/${dir}/${f.name}`, {encoding:'utf8'});
            
            const pattern = new RegExp(/people:\n  - \w+ \w+/);
            const match = content.match(pattern);
            if(match){
                const author = match[0].substring(12);
                fs.appendFile('authors.txt', (author+'\n'), function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                });
            }
        }))
    }
}

getDirs();