// ON VAJA npm install axios

const axios = require('axios');
var fs = require('fs');

// Dokobit API konfiguratsioon
const API_BASE_URL = 'https://developers.dokobit.com/api';
const API_KEY = 'TEIE_API_VÕTI'; // Asenda oma API-võtmega

// Allkirjastatava dokumendi tee
const DOCUMENT_PATH = './document.txt';

(async () => {
  try {
    // 1. Lae dokument
    console.log('Laen dokumenti...');
    const documentContent = fs.readFileSync(DOCUMENT_PATH);

    // 2. Algata allkirjastamine
    console.log('Allkirjastamise alustamine...');
    const initiateResponse = await axios.post(`${API_BASE_URL}/signature/json`, {
      key: API_KEY,
      type: 'bdoc', // Kasutame BDOC formaati
      signers: [
        {
          id_code: '60001019906', // Kasutaja isikukood
          country: 'EE',          // Riik
          phone: '+37200000766',  // Telefoninumber
        },
      ],
      file: {
        name: 'document.txt',
        content: documentContent.toString('base64'), // Edastame faili base64 formaadis
      },
    });

    const sessionToken = initiateResponse.data.token;
    console.log('Allkirjastamise sessioon algatatud, token:', sessionToken);

    // 3. Kontrolli allkirjastamise staatust
    console.log('Kontrollin allkirjastamise staatust...');
    let status = 'pending';
    while (status === 'pending') {
      const statusResponse = await axios.get(`${API_BASE_URL}/signature/${sessionToken}`, {
        params: { key: API_KEY },
      });
      status = statusResponse.data.status;
      console.log('Staatus:', status);
      if (status === 'pending') {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Oota 5 sekundit
      }
    }

    if (status !== 'completed') {
      // @ts-ignore
      throw new Error('Allkirjastamine ebaõnnestus, staatus:', status);
    }

    // 4. Lae allkirjastatud dokument alla
    console.log('Laen allkirjastatud dokumendi alla...');
    const downloadResponse = await axios.get(`${API_BASE_URL}/signature/${sessionToken}/download`, {
      params: { key: API_KEY },
      responseType: 'arraybuffer',
    });

    fs.writeFileSync('signed-document.bdoc', downloadResponse.data);
    console.log('Allkirjastatud dokument salvestatud: signed-document.bdoc');
  } catch (error) {
    // @ts-ignore
    console.error('Viga allkirjastamise protsessis:', error.message);
  }
})();




/*import fs from 'fs';
import crypto from 'crypto';
declare module 'undersign';
declare module 'undersign/lib/tsl';
declare module 'undersign/asic';
import Tsl from 'undersign/lib/tsl';
import Asic from 'undersign/asic';

// Konfiguratsioon
const TRUSTED_LIST_PATH = './ee.xml'; // Tee usaldusväärsete sertifikaatide loendile (Estonian Trusted List)
const DOCUMENT_PATH = './document.txt'; // Allkirjastatav dokument
const TIMESTAMP_URL = 'http://dd-at.ria.ee/tsa'; // Ajatempliteenus
const SMART_ID_PERSONAL_ID = '60001019906'; // Smart-ID kasutaja isikukood
const SMART_ID_COUNTRY_CODE = 'EE'; // Smart-ID kasutaja riigikood (nt EE Eesti jaoks)

(async () => {
  try {
    console.log('Usaldusväärsete sertifikaatide loendi laadimine...');
    // Usaldusväärsete sertifikaatide loendi laadimine
    const certificates = Tsl.parse(fs.readFileSync(TRUSTED_LIST_PATH)).certificates;

    console.log('Hades eksemplari loomine...');
    // Hades eksemplari loomine
    const hades = new Hades({
      certificates: certificates,
      timestampUrl: TIMESTAMP_URL,
    });

    console.log('Dokumendi laadimine allkirjastamiseks...');
    // Dokumendi laadimine
    const documentContent = fs.readFileSync(DOCUMENT_PATH);
    const documentHash = crypto.createHash('sha256').update(documentContent).digest();

    console.log('Smart-ID sertifikaadi päring...');
    // Smart-ID kasutaja sertifikaadi päring
    const certificate = await hades.smartIdCertificate(SMART_ID_PERSONAL_ID, SMART_ID_COUNTRY_CODE);
    console.log('Sertifikaat edukalt saadud.');

    console.log('XAdES allkirja loomine...');
    // XAdES allkirja loomine
    const xades = hades.new(certificate, [{
      path: 'document.txt',
      type: 'text/plain',
      hash: documentHash,
    }]);

    console.log('Allkirjastamise päring Smart-ID kaudu...');
    // Allkirjastamise päring Smart-ID kaudu
    const signature = await hades.smartIdSign(xades.signableHash, SMART_ID_PERSONAL_ID, SMART_ID_COUNTRY_CODE);
    console.log('Allkiri edukalt saadud.');

    // Allkirja seadmine
    xades.setSignature(signature);

    console.log('Ajatembli lisamine...');
    // Ajatembli lisamine
    await xades.setTimestamp(await hades.timestamp(xades));

    console.log('ASiC-E konteineri loomine...');
    // ASiC-E konteineri loomine
    const asic = new Asic();
    asic.pipe(fs.createWriteStream('signed-document.asice')); // Salvesta konteiner faili
    asic.addSignature(xades); // Lisa allkiri
    asic.add('document.txt', documentContent, 'text/plain'); // Lisa dokument
    asic.end();

    console.log('Dokument edukalt allkirjastatud ja salvestatud faili "signed-document.asice".');
  } catch (error) {
    console.error('Viga Smart-ID kaudu dokumendi allkirjastamisel:', error);
  }
})();
*/