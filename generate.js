// generate many files
import { writeFileSync } from 'fs';
import { argv } from 'process';
import { join } from 'path';

const baseFolder=  argv[2]; 

const count=parseInt(process.argv[3]);

console.log(`creating ${count} files in ${baseFolder}`);

for (let i=0;i<count;i++){
    writeFileSync(join(baseFolder,  `module${i}.js`), `export default ${i};\n`,{encoding:'utf8'} );
}
 
