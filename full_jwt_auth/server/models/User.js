import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    // Должно быть уникальным и обязательное
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    // TODO: По хорошему эти данные надо вынести в отдельную модель
    // Подтвердил пользователь почту или нет
    isActivated: { type: Boolean, default: false },
    // Ссылка на активацию
    activationLink: { type: String },
});

export default model('User', UserSchema);
