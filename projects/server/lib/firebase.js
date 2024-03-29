const { initializeApp, cert } = require("firebase-admin/app")
const { getAuth } = require("firebase-admin/auth")
// const firebaseConfig = require("../config/firebase.json")

const firebaseConfig = {
  type: "service_account",
  project_id: "nginepcom",
  private_key_id: "ba0b232001375d94470e143aa3b2f6e7cb92d5e8",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuwZtgNzjavVMO\nrqC/S6v9js2FcGZANZL66sIN0NhDnX5FkIh5HLN2L1aHHOYYqRhu/UmaU0pVc8hT\njjRkh5JXa8f17JjGnphXnQZ7F/IjR1Fi6Sra7BtbV3WeNS0YLn565wpir45JLtLH\nyZM944DSBasvbkl09MwtndXLyuRAUuDE8vp+SoYxblxBR1CstAQ3hBFFzB3/bPSp\nE0Bh7sgEZldO7Uuh3r/d5ysJFDa0RXPNlNrczW2N89hSr3Ul+IHYXbfQQWRD06z8\nev4r+Ov+qYRK0BZHFgUdW5RUMBPcEY9SD0r9b6aYYcTIosB9cOWGIjmlhv7UJy/A\nwO77gToPAgMBAAECggEADEUgvTEzZzxazBGbzMKp6UwxBvj83O5GCyMXi/PJc3nn\n50d+JY7L1PT+7M6tIzcgNY7IL7NAaV6PRrqZ2CMitcumBxDdKzjwdlpanaLxR+PW\nhYzcivF//DpYUkrmhyegjs2RD5vG8EF+4DM5iONj5JssSVDDjJgxi9RksgHlY9Sv\n3rXmZ4NrccGdQuMl3+O7oFc0qbF0mP88wl6QQuWlJ7O99L2CkpMoUeqV9TQcOga+\noQLv9Y0Ma4ZnaxrA8VTNxhA9UXt71dOPgju3rvu5R7HrY2V94SqcRJotLVxZwvGL\nLz3xoUfSFFjog4qCiYP6RrOT1ohyEo9WeVZhiN3/MQKBgQDznOd+kMK+FnLLRQ8S\nT0BLHmr2hNbbIjxqOUf9EJ08S2RZAIeug575GNUJzhCB2aCWAkatq2lpP6Xh6JQo\no7Wr4iCqE8av9kW3ArInmNT9T/XHqDKoTSnCBTZLYvUag/jr7N+ZTIH61pGaQGjS\nnHmzCsvfDfKU04tfksoOTKVv8QKBgQC3pGZT/MiuXWgNPmbEVGfRBD6hJLQKu1+Q\nqWmzj77Ao59KMSnDDkwT0Z8dCrho4NIr8hs+xiC6pG+Rk8t2Hk0Cz27aSk0tkWDS\nr/kwVEBRoc/MsiS+eEvRMxp59C1rmZ28Tax9BWI0Rg5RLDvtfOgwBh/izk7PXgXu\n6FiwfXtJ/wKBgGFEea2wMQFixyzgAveFix8zIvQQ8BSIo+SpwFOLqawkUgmzS3lj\ndjrxLkZ+71pZQWQDvqKi+TCbyCjeCyH605OwcuhVgxRI2WcL/YQP4qLNpU21m5xV\nSuH74MTS2xheLypL5q83vAIiX/pd0zycW38gRWxnDj9cA58CZgi1k6yRAoGADbdi\nyT0lRBjH781MYbeoNW1qvCCArhiGr8hnk7jV14+hEyqO4vnLZuOOTd4CHhtEt3GS\n5WJpCWfEyYvPc5gZym7x6a4JC7FDGRl5tElmsHI0kiZwJiXYC90USi2ZwuKrbGgk\nzQW86wicgyWZqEhfE08xzH/6VPTB3rFOBoioz8MCgYBCJCWL3GTF+h1ZdhisSYsD\n7m8G0MKVdJ9QHukNccVtRzR1mlZMsGMXSCq2k7RbBeO90xJBQzUOQiC3rIBzOTyr\nM88UP1RVIH8ebPCDs7ea768urgFIWXtKtdgkkd2an1FY9w5tItkVabkIoV/iei6/\nF5IP6S3Q9LJOOcYG0zvzdw==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-zbhuj@nginepcom.iam.gserviceaccount.com",
  client_id: "115454352736059689397",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zbhuj%40nginepcom.iam.gserviceaccount.com",
}

initializeApp({
  credential: cert(firebaseConfig),
})

const verifyGoogleToken = async (token) => {
  return await getAuth().verifyIdToken(token)
}

module.exports = {
  verifyGoogleToken,
}
