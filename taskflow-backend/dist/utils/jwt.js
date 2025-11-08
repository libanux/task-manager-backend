"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET not defined');
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '7d' });
};
exports.generateToken = generateToken;
/*notes:
header = {"alg":"HS256","typ":"JWT"}
payload = {"userId":"123","email":"john@test.com"}
secretKey = "my-secret-123"


Create Signature

// Signature = HMACSHA256(header + payload, secretKey)
signature = HMACSHA256(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6ImpvaG5AdGVzdC5jb20ifQ",
  "my-secret-123"

  Result of Signature:
signature = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

 Final Token:
token = header + "." + payload + "." + signature
      = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6ImpvaG5AdGVzdC5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
);


Key Point:
The signature is calculated FROM (header + payload + secret),
 but the final token contains (header + payload + signature) - NOT the secret!


 -The expiration is automatically added to the PAYLOAD of the token by
  the jwt.sign() function!:
  // jwt.sign() AUTOMATICALLY adds expiration to your payload
const actualPayload = {
  userId: "123",           // ← Your data
  email: "john@test.com",  // ← Your data
  iat: 1700000000,         // ← AUTO-ADDED: Issued at timestamp
  exp: 1700086400          // ← AUTO-ADDED: Expiration timestamp (24h from now)
};


Generated Token Breakdown:
text
HEADER:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
PAYLOAD: eyJ1c2VySWQiOiIxMjMiLCJlbWFpbCI6ImpvaG5AdGVzdC5jb20iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDA4NjQwMH0
         └──────────────────────────────────────────────────────────────────────────────────────────────────┘
         This contains YOUR data + AUTO-ADDED expiration!
SIGNATURE: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 */
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error('JWT_SECRET not defined');
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
/*

The jwt.verify() does THREE important checks automatically:

1. Check Signature (Tampering Detection)
javascript
// Extracts header + payload from token
const [header, payload] = token.split('.');

// Recalculates signature using your secret key
const expectedSignature = HMACSHA256(header + "." + payload, process.env.JWT_SECRET!);

// Compares with the signature in the token
if (expectedSignature !== receivedSignature) {
  throw new Error('Token tampered with!');
}

2. Check Expiration (Automatic)
javascript
// Extracts expiration from payload
const payload = decode(tokenPart2);
const currentTime = Date.now() / 1000;

if (payload.exp < currentTime) {
  throw new Error('Token expired!');
}
  
3. Check Validity (Structure)
Verifies it's a properly formatted JWT

Checks the algorithm matches

Ensures all required fields exist



--verifyToken() returns a JwtPayload object that looks like this:

typescript
{
  userId: "507f1f77bcf86cd799439011",
  email: "john@example.com"
}

 */ 
