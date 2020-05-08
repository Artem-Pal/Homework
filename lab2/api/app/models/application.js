module.exports = (mongoose) => {
    const Schema = mongoose.Schema;
    const applicationSchema = new Schema({
        client: {
            type: Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        },
        service: [{
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        }],
    });

    return mongoose.model('Application', applicationSchema);
};