import bcrypt from 'bcrypt';
import { connection } from '../database.js';

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = await connection.query('SELECT * FROM users WHERE email=$1', [user.email])
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await connection.query(`
      INSERT INTO 
        users(name, email, password) 
      VALUES ($1, $2, $3)
    `, [user.name, user.email, passwordHash])

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  const { user } = res.locals;

  try {
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserStatus(req, res) {

  const { id } = req.params

  try {
    const { rows: userData } = await connection.query(`
        SELECT *, s.id as "shortUrlId"
        FROM "users" u
        JOIN "shortenedUrls" s ON s.users = u.id
        WHERE u.id = $1
        `, [id])

    if (userData.length === 0) {
      return res.sendStatus(404)
    }

    const obj = { id: userData[0].id, name: userData[0].name }

    const shortenedUrls = userData.map((el) => { return { id: el.shortUrlId, shortUrl: el.shortUrl, url: el.url, visitCount: el.visitCount } })

    obj.shortenedUrls = shortenedUrls

    return res.send(obj)

  } catch (error) {

    console.log(error)

    return res.sendStatus(500);

  }

}