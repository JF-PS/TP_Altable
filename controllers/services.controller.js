module.exports = (business) => ({
    async create(req, res) {
        const Service = require("../expositions/service");
        const { startDate, endDate } = req.body;
        await business
        .create(new Service(startDate, endDate))
        .then((service) => {
            if(service.response == "Start date can't be superior than end date")
                res.status(400).send(service.response);
            else 
                res.status(201).send(service.response);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
    },
});