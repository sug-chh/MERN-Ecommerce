import bcrypt from 'bcryptjs'

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: "Frodo Baggins",
    email: "frodo@email.com",
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: "Gandalf The Great",
    email: "gandalf@email.com",
    password: bcrypt.hashSync('123456', 10)
  },
];


export default users