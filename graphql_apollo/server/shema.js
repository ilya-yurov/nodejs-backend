import { buildSchema } from 'graphql'

const schema = buildSchema(`
    # Опишем тип пользователя
    type User {
        id: ID
        username: String!
        age: Int!
        posts: [Post]
    }
    
    # Опишем тип поста
    type Post {
        id: ID
        title: String
        content: String
    }
    
    # Инпуты для мутаций описываются так, обязательные поля помечаем !
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }
    
    input PostInput {
        id: ID
        title: String
        content: String
    }
    
    # Описываем квери
    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    
    # Описываем мутации
    # Тут выполняется мутация и возвращается пользователь
    type Mutation {
        createUser(input: UserInput): User
    }
`);

export default schema;
