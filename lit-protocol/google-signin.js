const lit = require('lit-js-sdk');



// Generate a new PKP
const pkp = lit.generatePKP();

// Use the PKP for signing or verification
// Example: Sign some data
const data = 'Hello, Lit Protocol!';
const signature = pkp.sign(data);

// Verify the signature
const isVerified = lit.verifySignature(pkp.publicKey, signature, data);

console.log('Signature verification:', isVerified);
