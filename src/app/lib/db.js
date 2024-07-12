const { username, password } = process.env;

export const connectionStr =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@cluster0.ifkil0k.mongodb.net/DeliveryApp?retryWrites=true&w=majority&appName=Cluster0";
