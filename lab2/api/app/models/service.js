
module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const serviceSchema = new Schema({
        name: {
            type: String,
            required: true},
        price: {
            type: Number,
            required: true}
    });

    return mongoose.model('Service', serviceSchema);
};