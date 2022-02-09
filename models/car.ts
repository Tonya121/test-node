import mongoose from 'mongoose'

interface Car {
  name: string;
  color: string;
  version: number;
}

interface carModelInterface extends mongoose.Model<CarDoc> {
  build(attr: Car): CarDoc
}

interface CarDoc extends mongoose.Document {
  name: string;
  color: string;
  version: number;
}

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  color: {
    type: String, 
    enum: ['red', 'blue', 'yellow'],
    required: true
  },
  version: {
    type: Number,
    required: true,
    min: 1
  }
})

carSchema.statics.build = (attr: Car) => {
  return new Cars(attr)
}

const Cars = mongoose.model<CarDoc, carModelInterface>('Cars', carSchema)

Cars.build({
  name: 'some title',
  color: 'red',
  version: 2
})

export { Cars }