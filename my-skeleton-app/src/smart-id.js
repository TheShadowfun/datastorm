import fs from 'fs';
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
