import express, { Request, Response } from 'express'
import { Cars } from '../../models/car'

const router = express.Router()

router.get('/api/cars', async (req: Request, res: Response) => {
  await Cars.find({}).then((car) => {
    return res.status(200).send(car)
  }).catch((err) => {
    return res.status(404).send('No data found')
  });
})

router.post('/api/car', async (req: Request, res: Response) => {
  const { name, color, version } = req.body;

  const car = Cars.build({ name, color, version })
  await car.save().then((car) => {
    return res.status(201).send(car)
  }).catch((err) => {
    return res.status(404).send('Someting went wrong')
  });
})

router.get('/api/car/name', async (req: Request, res: Response) => {
  await Cars.findOne({ "name": req.body.name }).then((car) => {
    return res.status(201).send(car)
  }).catch((err) => {
    return res.status(404).send('Car not exist')
  });
})

export { router as carRouter }