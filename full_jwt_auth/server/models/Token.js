import { model, Schema } from 'mongoose';

// Схема для хранения рефреш-токена, сюда же можно добавить айпи, фингерпринт браузера и т.п.
const TokenSchema = new Schema({
    //Тип - айди юзера, ссылается на модель юзера
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true },
});

export default model('Token', TokenSchema);
