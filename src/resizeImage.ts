import sharp from 'sharp'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import express from 'express'
const  resize_image=async (path: string ,filename:string,height: number,width: number ,outPath:string,res:any):Promise<void>=> {

    await sharp(path)
      .resize(height, width)
      .toBuffer()
      .then(data => {
      
        fs.appendFile(outPath, data, function (err) {
          if (err) throw err;
          console.log('Saved!');
res.sendFile( outPath, { root: '.' })
  
});

      })

      .catch((err) => console.log(err));

   
    }
  export default resize_image