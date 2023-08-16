
import CryptoJS from 'crypto-js';

const KEY = "AGENERALKEYFORALLPASSWORDS123456"

// const KEY = "AGENERALKEYFORALLPASSWORDS123456"
// const ALGORITHM = 'aes-256-cbc';
// const BLOCK_SIZE = 16;

export function DecryptPassword(password: string) {
    return CryptoJS.AES.decrypt(password, KEY).toString(); 
}