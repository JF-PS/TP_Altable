const Service = require("../models").Services;

module.exports = class ServicesRepository {
    async create(service) {
        return await new Promise((resolve, reject) => {
            Service.create(service)
            .then((newService) => {
                resolve(newService);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}