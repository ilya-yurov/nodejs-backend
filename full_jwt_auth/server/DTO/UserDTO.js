// DTO - Data Transfer Object - это класс, который обладает некоторыми полями, которые мы отправляем на клиент
class UserDTO {
    email;
    id;
    isActivated;

    constructor(model) {
        this.email = model.email;
        // Mongo добавляет айдишники с _ чтобы показать приватность
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
}

export default UserDTO;
