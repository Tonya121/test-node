// test/db.ts
import mongoose from 'mongoose';
import { Cars } from './models/car';

describe('Quote API endpoints', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://tonya:2th3ZVFdLS9TEGsO@cinema.a1y8o.mongodb.net/test?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })
  
  test('GET | get all cars from database', async (done) => {
    const res = await request.get('/api/cars')

    expect(res.status).toBe(200)
  })

  test('POST | save car to database with user data', async (done) => {
    const res = await request
      .post('/api/car')
      .send({ name: 'test', color: 'red', version: 1 })

    expect(res.status).toBe(200)
    expect(res.body.color).toBe('red')
    expect(res.body.version).toBe(1)

    const savedCar = await Cars.findById(res.body.color)
    expect(savedCar.name).toBe(res.body.name)

    done()
  })
})