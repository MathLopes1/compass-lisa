const carService = require('../service/carService.js');
const pagination = require('../utils/paginate/carPaginate.js');

class CarController {
  async create(req, res) {
    try {
      const data = await carService.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async find(req, res) {
    try {
      const data = await carService.find(req.query);
      return res.status(200).json(pagination(data));
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await carService.delete({ _id: id });
      return res.status(204).json();
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedCar = await carService.update(id, data);
      res.status(200).json(updatedCar);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async updateAccessories(req, res) {
    const { id } = req.params;
    const idAccessories = req.params.id_accessories;
    const payload = req.body;
    try {
      const updatedAccessorie = await carService.updateAccessorie(id, idAccessories, payload);
      return res.status(200).json(updatedAccessorie);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async findId(req, res) {
    const { id } = req.params;
    try {
      const car = await carService.findId(id);
      return res.status(200).json({
        veiculos: car
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new CarController();
