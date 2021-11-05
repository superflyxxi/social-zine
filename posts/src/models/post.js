import mongoose from 'mongoose';

const schema = mongoose.Schema({
	content: String,
});

export default mongoose.model('Post', schema);
