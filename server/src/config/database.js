import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
