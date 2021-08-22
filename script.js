const fs = require('fs');
const moment = require('moment');

const dir = './src/pages/art-shows';

fs.readdirSync('./src/pages/art-shows')
  .filter((file) => file.endsWith('.markdown'))
  .map((file) => {
    const fileName = `${dir}/${file}`;
    return {
      file: fs.readFileSync(fileName).toString(),
      fileName
    }
  })
  .forEach(({ file, fileName }) => {
    const [line, date] = file.match(/end_date: (.+)/m);

    const oldDate = moment(date.trim(), 'X', true);

    if (oldDate.isValid()) {
      fs.writeFileSync(fileName, 
        file.replace(line.trim(), `end_date: ${oldDate.format('x')}`)
      );
    } else {
      console.log(date);
    }
  })

