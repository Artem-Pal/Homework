module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const clientSchema = new Schema({
        fullname: {
            type: String,
            required: true},
        age: {
            type: Number,
            required: true},
        phone: {
            type: String,
            required: true},
        city: {
            type: String,
            required: true}
    });

    return mongoose.model('Client', clientSchema);
};