const fs = require('fs');


const dataSetter = () => {
  fs.readFile(__dirname+'/pastorsDB.json', (err, data) => {
    if(err) throw err;
    const churches = JSON.parse(data)
    console.log({churches})
    const churchesArray = churches.map((church) => {
      return ({
        ...church,
        pastor: church.pastor.split('+'),
        pastorPhone: church.pastorPhone?.replace(/ /g,'').split('+') || [],
        pastorEmail: church.pastorEmail?.split('/') || [],
        phone: church.phone?.replace(/ /g,'').split('/') || [],
        email: church.email?.split('/') || [],
      })
    })
    fs.writeFile(__dirname+'/src/seeder.json', JSON.stringify(churchesArray), (err) => {
      if(err) throw err;
    })
  });
}


dataSetter()