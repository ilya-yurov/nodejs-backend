import { buildSchema } from 'graphql'

const schema = buildSchema(`
    # Опишем тип пользователя
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    
    # Опишем тип поста
    type Post {
        id: ID
        title: String
        content: String
    }
`);

export default schema;
