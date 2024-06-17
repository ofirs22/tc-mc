const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();
const moment = require("moment");
const momenttz = require('moment-timezone');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8081; 
app.post('/current_daytime', (req, res) => {
    const { timezone, bot_language } = req.body;
    if (!timezone) {
        return res.status(400).json({ error: 'Timezone is required' });
      }
    
      // Extract the timezone and append '00'
      let tz = timezone.substring(3);
      bot_language ? moment.locale(bot_language): moment.locale('he');
      // Convert the timezone to a standard format (e.g., 'UTC+0200' to 'Etc/GMT-2')
      const sign = tz[0];
      const hours = parseInt(tz.substring(1, 3));
      const formattedTimezone = `Etc/GMT${sign === '+' ? '-' : '+'}${hours}`;
    
      console.log(formattedTimezone);
      // Set default server date & time to UTC
      const fecha = momenttz.tz(formattedTimezone);
    
      // Format info object
      const info = {
        military_time: fecha.format('HH:mm'),
        current_date: fecha.format('DD/MM/YYYY'),
        date_formatted: fecha.format('DD-MM-YYYY HH:mm'),
        yesterday_date: fecha.clone().subtract(1, 'days').format('DD/MM/YYYY'),
        current_day: fecha.format('dddd')
      };
  
    res.json({ info });
  });
app.listen(PORT, () => {
    console.log("Application is running on port " + PORT);
})