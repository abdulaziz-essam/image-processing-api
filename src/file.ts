import path from 'path';
import process from 'process';
// let image =path.resolve(__dirname,'./image.jpg')
const image =(fileName:string)=> {
return  path.join(process.cwd(), `images/${fileName}.jpg`);

}

export default image;
