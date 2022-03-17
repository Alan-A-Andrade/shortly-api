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

export async function getShortenedUrl(req, res) {

  const { shortUrl } = req.params

  try {
    const { rows: urlData } = await connection.query(`
        SELECT id, "shortUrl", url
        FROM "shortenedUrls"
        WHERE "shortUrl" = $1
        `, [shortUrl])

    const [data] = urlData

    if (!data) {
      return res.sendStatus(404)
    }
    return res.send(data)

  } catch (error) {

    console.log(error)

    return res.sendStatus(500);

  }

}

export async function deleteShortenedUrl(req, res) {

  const { id } = req.params

  const { user } = res.locals

  try {

    const { rows: urlData } = await connection.query(`
    SELECT *
    FROM "shortenedUrls"
    WHERE id = $1
    `, [id])

    const [data] = urlData

    if (user.id !== data.users) {
      console.log("fui chamado")
      return res.sendStatus(401)
    }

    await connection.query(`
        DELETE FROM "shortenedUrls"
        WHERE id = $1
        `, [id])

    return res.sendStatus(204)

  } catch (error) {

    console.log(error)

    return res.sendStatus(500);

  }

}
