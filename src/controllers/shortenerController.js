import { connection } from '../database.js';

export async function generateShortUrl(req, res) {

  const { url } = req.body

  const { user } = res.locals

  const urlShort = (Math.round(Date.now() / 1000)).toString(16)

  try {
    await connection.query(`
        INSERT INTO 
        "shortenedUrls"("shortUrl", url, "visitCount", users) 
        VALUES ($1, $2, $3, $4)
        `, [urlShort, url, 0, user.id])

    return res.send(201)

  } catch (error) {

    console.log(error)

    return res.sendStatus(500);

  }

}