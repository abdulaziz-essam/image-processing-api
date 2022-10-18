import express from 'express';
import NodeCache from 'node-cache';
import image_path from '../file';
import fs from 'fs';
import resize_image from '../resizeImage';
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const myCache: NodeCache = new NodeCache({ stdTTL: 0, checkperiod: 0 });
const cache: object[] = [];
export { cache };
myCache.set('myKey', cache, 10000);
const router = express.Router();
export default router.get('/:height/:width/:filename', function (req:express.Request, res:express.Response): void {
  let outPath:string ;
  const image_id: string = uuidv4();
  const height = Number(req.params.height);
  const  width = Number(req.params.width);
  const filename:string=req.params.filename

  const value:any = myCache.get('myKey');
  let found=false ;
  const  path:string=image_path(filename)
  
if(Math.sign(height)==1 &&Math.sign(width)==1 ){


    if (fs.existsSync(path)) {
      console.log("file exist")
      
      //file exists

 
  // here i check if width and height in new request is not the same with previous one to generate new image
  for (let i = 0; i < cache.length; i++) {
    try {
   
      if (height == value[i].height && width == value[i].width && filename==value[i].filename) {
   
        res.sendFile(value[i].outputName, { root: '.' });
      
        found = true;
      }
    } catch (error) {
      console.log(error);
    }
  }


  if (found == false) {
    outPath ='./images/'+filename+ image_id+'.jpg';
resize_image(path,filename,height,width , outPath,res)
    // here we use sharp to generate image with new height and width
    cache.push({ filename: filename, height: height, width: width , outputName:outPath });
    myCache.set('myKey', cache, 10000);
    console.log(cache);
    // res.sendFile(outPath, { root: '.' });
}
}

else{
res.send("<h1> dont found this image in files </h1>")
  
}
}else{
  res.send("<h1>you can only enter postive number for width and height </h1>")
}
  // if image width and height is in the cache we will return available image without generate new one
});
