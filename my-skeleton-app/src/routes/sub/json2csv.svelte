<script>
    //npm install json-2-csv
    import { filteredDataStore } from './filteredData';

    console.log(filteredDataStore)

    let converter = require('json-2-csv');
    const csv = await converter.json2csv(data, options);
    

    const jsonArray = [
    ];
    
    (async () => {
        try {
            const csv = await converter.json2csv(jsonArray);
            console.log('CSV output:\n', csv);
    } catch (err) {
        console.error('Error converting JSON to CSV:', err);
  }
})();
</script>