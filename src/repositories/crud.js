

class crudRepository {
    constructor(model) {
        this.model = model;
    }


    async create (date){
        return this.model.create(date);
    }

    async read (id) {
        return await this.model.findById(id);
    }

    async readAll (filter = {}) {
        return await this.model.find(filter);
    }

    async update(id,data) {
        return await this.model.findByIdAndUpdate(
            id,
            data,
            {
                new:true,
                runValidators: true
            }
        )
    }

    async delete (id){
        return await this.model.findByIdAndDelete(id);
    }
}

export default crudRepository;