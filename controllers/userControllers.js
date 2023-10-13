// const prisma = require("../prisma/index");
// const cookieToken = require("../utils/cookieToken");
// const bcrypt = require("bcrypt");

// exports.signup = async (req, res, next) => {
//   try {
//     const { name, email, password, phoneNumber,middleName,firstName,lastName,referrer,falconId,kycID,verifiedEmail,verifiedPhone,panDocNo,bankId,bankAccountNumber,bankIFSC,productId,vpan,instrumentId,inProfile,isMinor,parentId,
//   } = req.body;

//     if (!name || !email || !password || !phoneNumber) {
//       return res.status(400).json({ error: "Please provide all details" });
//     }

//     // Hash the password before storing it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name:name,
//         middleName:middleName,
//         email:email,
//         password:hashedPassword,
//         phoneNumber:phoneNumber,
//         firstName  :firstName,      
//         lastName   :   lastName,   
//         referrer    :referrer,     
//         kycID       :kycID,     
//         falconId   :falconId,          
//         verifiedEmail:verifiedEmail,    
//         verifiedPhone:verifiedPhone,    
//         panDocNo:panDocNo,         
//         bankId:bankId,           
//         bankAccountNumber :bankAccountNumber,
//         bankIFSC:bankIFSC,         
//         productId:productId,        
//         vpan:vpan,             
//         instrumentId  :instrumentId,   
//         inProfile:inProfile,        
//         isMinor:isMinor,          
//         parentId:parentId,                
//       },
//     });

//     // Send user token
//     cookieToken(user, res);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password, phoneNumber } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Please provide email and password" });
//     }

//     // Find a user based on email and phoneNumber
//     const user = await prisma.user.findUnique({
//       where: {
//         OR: [
//           {
//             email,
//           },
//           {
//             phoneNumber, // Include phoneNumber in the search
//           },
//         ],
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Compare the hashed password using bcrypt
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: "Incorrect password" });
//     }

//     // User is authenticated, send token
//     cookieToken(user, res);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Logout user
// exports.logout = async (req, res, next) => {
//   try {
//     res.clearCookie("token");
//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };




const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken");
const bcrypt = require("bcrypt");

// Sign up a user
exports.signup = async (req, res, next) => {
  try {
    const {
      email,
      password,
      phoneNumber,
      middleName,
      firstName,
      lastName,
      referrer,
      falconId,
      kycID,
      verifiedEmail,
      verifiedPhone,
      panDocNo,
      bankId,
      bankAccountNumber,
      bankIFSC,
      productId,
      vpan,
      instrumentId,
      inProfile,
      isMinor,
      parentId,
    } = req.body;

    // Check for required fields
    if (!email || !password || !phoneNumber) {
      return res.status(400).json({ error: "Please provide all required details" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        middleName,
        email,
        password: hashedPassword,
        phoneNumber,
        firstName,
        lastName,
        referrer,
        falconId,
        kycID,
        verifiedEmail,
        verifiedPhone,
        panDocNo,
        bankId,
        bankAccountNumber,
        bankIFSC,
        productId,
        vpan,
        instrumentId,
        inProfile,
        isMinor,
        parentId,
      },
    });

    // Send user token
    cookieToken(user, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Log in a user
exports.login = async (req, res, next) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    // Find a user based on email or phoneNumber
    const user = await prisma.user.findUnique({
      where: {
        OR: [
          {
            email:email
          },
          {
            phoneNumber:phoneNumber, // Include phoneNumber in the search
          },
        ],
      },
    });


    // const user = await prisma.user.findUnique({
    //   where: {
    //     email: email, // or phoneNumber: phoneNumber
    //   },
    // });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the hashed password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // User is authenticated, send token
    cookieToken(user, res);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Log out a user
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};