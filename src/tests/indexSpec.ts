// import myFunc from '../index';
import app from '../index';
import supertest from 'supertest';
import { cache } from '../routes/imageRoute';
import resize_image from '../resizeImage';
import image from '../file';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const image_id: string = uuidv4();
const outputPath='./images/'+'image'+ image_id+'.jpg'

const request = supertest(app);
it('expect cache  to be defind', () => {
  expect(cache).toBeDefined;
});

describe('200 ', () => {
  it('gets the api endpoint', async done => {
    const response = await request.get('/88/99/image');
    expect(response.status).toBe(200);
done()
  });
});

describe( 'sharp', (): void => {
  it('for testing sharp', async (done): Promise<void> => {
    const response: supertest.Response = await request.get('/100/100/image')
  
      
    expect(function () { resize_image(image('image'),"image",100,100 , outputPath,response) }).not.toThrow()
      done()
    });

   
  });


// describe( 'sharpppppppp', (): void => {
//   it('for testing sharp', async (done): Promise<void> => {

//       expect(resize_image(image('image'),image,100,100 , outputPath)).not.toThrow();
//       done()
//     });
  
   
//   });

describe('make sure input file is exist', (): void => {
  it('file exist', async (): Promise<void> => {
    expect(fs.existsSync(image("image"))).toBe(true);
  });
});

// describe('POST /user', function() {
//   it('user.name should be an case-insensitive match for "john"', function(done) {
//     request
//       .get('/55/66')
//       .send('height=70') // x-www-form-urlencoded upload
//       .set('Accept', 'application/json')
//       .expect(function(res) {
//         res.body.id = 'some fixed id';
//         res.body.name = res.body.name.toLowerCase();
//       })
//       .expect(200, {
//         id: 'some fixed id',
//         name: 'john'
//       }, done);
//   });
// });
